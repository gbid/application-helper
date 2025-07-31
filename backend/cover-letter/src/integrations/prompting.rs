use crate::core::error::*;
use crate::credentials;
use crate::utils::api_utils::ApiUtils;
use async_openai::types::ChatCompletionRequestAssistantMessageContent;
use async_openai::types::ChatCompletionRequestUserMessageContentPart;
use async_openai::types::Role;
use async_openai::types::{
    ChatChoice, ChatCompletionRequestAssistantMessage, ChatCompletionRequestMessage,
    ChatCompletionRequestSystemMessage, ChatCompletionRequestUserMessage,
    ChatCompletionRequestUserMessageContent, ChatCompletionResponseMessage,
    CreateChatCompletionRequestArgs, FinishReason,
};
use async_openai::types::{
    ChatCompletionRequestMessageContentPartImage, ChatCompletionRequestMessageContentPartText,
    ChatCompletionRequestSystemMessageContent, ChatCompletionStreamResponseDelta,
    CreateChatCompletionResponse, CreateChatCompletionStreamResponse,
};
use base64::engine::general_purpose::STANDARD;
use base64::Engine;
use futures::Stream;
use once_cell::sync::Lazy;
use regex::Regex;
use reqwest::StatusCode;
use reqwest_eventsource::{Event, EventSource, RequestBuilderExt};
use scopeguard::guard;
use serde::de::DeserializeOwned;
use std::collections::{btree_map, hash_map, BTreeMap};
use std::fmt::Display;
use std::hash::Hasher;
use std::io::{stderr, Write};
use std::iter::once;
use std::mem::swap;
use std::path::PathBuf;
use std::pin::Pin;
use std::str::FromStr;
use std::sync::Mutex;
use std::time::Duration;
use strum::IntoEnumIterator;
use tokio::sync::mpsc;
use tokio::sync::mpsc::{UnboundedReceiver, UnboundedSender};
use tokio::time::timeout;
use tokio_stream::StreamExt as _;

use crate::core::model::{ChatLog, ChatLogEntry, ChatRole, ImageUrl};

fn request_message(
    role: ChatRole,
    message: String,
    image: Option<ImageUrl>,
) -> ChatCompletionRequestMessage {
    match role {
        ChatRole::System => ChatCompletionRequestSystemMessage {
            content: ChatCompletionRequestSystemMessageContent::Text(message),
            name: None,
        }
        .into(),
        ChatRole::User => {
            let text_content = ChatCompletionRequestMessageContentPartText { text: message };
            let text_content = ChatCompletionRequestUserMessageContentPart::Text(text_content);
            let image_content = image.map(|image| ChatCompletionRequestMessageContentPartImage {
                image_url: image.into(),
            });
            let image_content = image_content.map(|image_content| {
                ChatCompletionRequestUserMessageContentPart::ImageUrl(image_content)
            });
            let content = ChatCompletionRequestUserMessageContent::Array(
                vec![Some(text_content), image_content]
                    .into_iter()
                    .filter_map(|x| x)
                    .collect(),
            );

            ChatCompletionRequestUserMessage {
                content,
                name: None,
            }
            .into()
        }
        #[allow(deprecated)]
        ChatRole::Assistant => ChatCompletionRequestAssistantMessage {
            content: Some(ChatCompletionRequestAssistantMessageContent::Text(
                message.to_string(),
            )),
            tool_calls: None,
            function_call: None,
            name: None,
            refusal: None,
        }
        .into(),
        ChatRole::Tool | ChatRole::Function => panic!("Unsupported role"),
    }
}

#[cfg(not(feature = "admin"))]
const CACHE_DIR_PATH: &'static str = "/tmp/openai-cache";
#[cfg(feature = "admin")]
const CACHE_DIR_PATH: &'static str = "/tmp/openai-cache-production-copy/openai-cache";

const MAX_SIMULTANEOUS_REQUESTS: usize = 100;
static API_UTILS: Lazy<ApiUtils> = Lazy::new(|| {
    ApiUtils::new(
        PathBuf::from(CACHE_DIR_PATH),
        MAX_SIMULTANEOUS_REQUESTS,
        Duration::from_secs(60),
    )
});

async fn fetch_response<'a>(request_body: &str) -> Result<(reqwest::StatusCode, String), Error> {
    let http_client = reqwest::ClientBuilder::new()
        // TODO: This timeout is too much for responses where we expect a small response (e.g. the
        // title for a job advert), but a timeout of e.g. 10 is not enough for things like scraping
        // a json resume. The best approach would be to measure for each kind of prompt how long it
        // typically takes to get a response and set the timeout accordingly.
        .timeout(Duration::from_secs(60))
        .build()
        .log_and_transient()?;
    let api_key = credentials::OPENAI_API_KEY;
    let resp = http_client
        .post("https://api.openai.com/v1/chat/completions")
        .header("Authorization", format!("Bearer {api_key}"))
        .header("Content-Type", "application/json")
        .body(request_body.to_string())
        .send()
        .await
        .log_and_transient()?;

    let status = resp.status();
    if status != StatusCode::OK {
        writeln!(&mut stderr(), "Received status from openai api: {status}").unwrap();
        return Err(match status {
            StatusCode::REQUEST_TIMEOUT
            | StatusCode::TOO_MANY_REQUESTS
            | StatusCode::PAYMENT_REQUIRED => Error::Transient,
            _ => Error::Fatal,
        });
    }

    let body = resp.text().await.log_and_transient()?;
    Ok((status, body))
}

async fn fetch_response_streaming<'a>(request_body: &str) -> Result<EventSource, Error> {
    let http_client = reqwest::ClientBuilder::new()
        .timeout(Duration::from_secs(360))
        .build()
        .log_and_transient()?;
    let api_key = credentials::OPENAI_API_KEY;
    let event_source = http_client
        .post("https://api.openai.com/v1/chat/completions")
        .header("Authorization", format!("Bearer {api_key}"))
        .header("Content-Type", "application/json")
        .body(request_body.to_string())
        .eventsource()
        .log_and_transient()?;

    Ok(event_source)
}

fn extract_assistant_message(response_json: CreateChatCompletionResponse) -> Result<String, Error> {
    let choices_len = response_json.choices.len();
    if choices_len != 1 {
        eprintln!("Expected 1 response choice, got {choices_len}");
        return Err(Error::Fatal);
    }
    let choice = response_json.choices.into_iter().next().unwrap();

    let ChatChoice {
        index: _,
        message,
        finish_reason,
        logprobs: _,
    } = choice;

    match finish_reason {
        Some(finish_reason) => match finish_reason {
            FinishReason::Stop => (),
            FinishReason::Length => {
                eprintln!("Finish reason: Length");
            }
            FinishReason::ContentFilter => {
                eprintln!("Finish reason: Content filter");
            }
            FinishReason::ToolCalls | FinishReason::FunctionCall => {
                eprintln!("Unexpected tool or function call");
            }
        },
        None => {}
    }

    #[allow(deprecated)]
    let ChatCompletionResponseMessage {
        tool_calls: _,
        role,
        content,
        function_call: _,
        refusal: _,
    } = message;

    if role != Role::Assistant {
        eprintln!("Unexpected response role: {role:?}");
        return Err(Error::Fatal);
    }

    let assistant_message = match content {
        Some(msg) => msg,
        None => {
            eprintln!("No response message");
            String::new()
        }
    };

    Ok(assistant_message)
}

/// Send a user message to the chat bot and return its response.
///
/// `chat` is the chat history onto which this function appends both the user message and the chat
/// bot response on success.
pub async fn send_message<'a>(
    user_message: String,
    png_image: Option<&[u8]>,
    chat: &'a mut ChatLog,
) -> Result<&'a str, Error> {
    let mut messages: Vec<ChatCompletionRequestMessage> = chat
        .chat_log
        .iter()
        .map(|entry| {
            request_message(
                entry.role.clone(),
                entry.content.clone(),
                entry.image_url.clone(),
            )
        })
        .collect();

    let image_url: Option<ImageUrl> = png_image.map(|png_image| {
        let image_url: String = format!("data:image/png;base64,{}", STANDARD.encode(png_image));
        ImageUrl { url: image_url }
    });

    if image_url.is_some() || !user_message.is_empty() {
        let user_message_with_image =
            request_message(ChatRole::User, user_message.clone(), image_url.clone());
        messages.push(user_message_with_image);
    }

    #[cfg(not(feature = "cheap"))]
    let model = "gpt-4o-2024-08-06";
    #[cfg(feature = "cheap")]
    let model = "gpt-4o-mini-2024-07-18";
    let request_json = CreateChatCompletionRequestArgs::default()
        .seed(348934092)
        .model(model)
        .messages(messages)
        .build()
        .expect("building the request should always succeed");
    let request_body = serde_json::to_string_pretty(&request_json)
        .expect("Serializing the request should always succeed");

    let response_body = match API_UTILS.get_cached(&[request_body.as_bytes()]).await {
        Some(response_body) => response_body,
        None => {
            let _permit = API_UTILS.acquire_permit().await;
            let existing_rate_limit = API_UTILS.sleep_if_rate_limited().await;

            let (status, response_body) = fetch_response(&request_body).await?;
            if status == StatusCode::OK {
                API_UTILS.record_no_rate_limit();
                API_UTILS
                    .put_cached(&[request_body.as_bytes()], response_body.as_bytes())
                    .await;
            } else {
                // TODO: Shouldn't we check the status code here instead of just assuming all
                // statuses that are not OK must be due to rate limiting?
                // TODO: Shouldn't we sleep and retry the fetch here once the rate limit has been
                // reset? I think currenly we're just continuing with parsing the response, which
                // will fail because the response body is probably empty and in particular not the
                // JSON we expect.
                eprintln!("Error: Rate limited");
                API_UTILS.record_rate_limit(existing_rate_limit);
                return Err(Error::Transient);
            }
            response_body
        }
    };

    let response_json: CreateChatCompletionResponse =
        serde_json::from_str(&response_body).log_and_fatal()?;
    let assistant_message = extract_assistant_message(response_json)?;

    chat.chat_log.push(ChatLogEntry {
        role: ChatRole::User,
        content: user_message,
        image_url,
    });
    // TODO: Should we use the actual `role` returned here instead? That would mean that we have to
    // deal with other roles in other places as well though.
    // TODO: Support that the assistant can send images as well, when we need that.
    chat.chat_log.push(ChatLogEntry {
        role: ChatRole::Assistant,
        content: assistant_message.clone(),
        image_url: None,
    });

    let ChatLogEntry {
        role: _,
        content: assistant_message,
        image_url: _,
    } = chat.chat_log.last().unwrap();

    Ok(assistant_message.as_str())
}

// A lazy static protected by a mutex that represents ongoing streams.
// - The key of the map is the file path where the response body will be stored once it has fully
//   arrived.
// - The value is the sender end of the channel that the response body will be sent through.

static ONGOING_STREAMS: Lazy<Mutex<BTreeMap<PathBuf, UnboundedReceiver<Result<String, Error>>>>> =
    Lazy::new(|| Mutex::new(BTreeMap::new()));

async fn forward_openai_event_stream(
    event_source: &mut EventSource,
    tx0: UnboundedSender<Result<String, Error>>,
    tx1: UnboundedSender<Result<String, Error>>,
) -> Result<String, Error> {
    let send = move |item: Result<String, Error>| {
        tx0.send(item.clone()).ok();
        tx1.send(item).ok();
    };

    let mut full_content = String::new();

    loop {
        let timeout_result = timeout(Duration::from_secs(10), event_source.next()).await;
        let ev: Option<Result<Event, _>> = match timeout_result {
            Ok(ev) => ev,
            Err(timeout_err) => {
                eprintln!("Openai streaming result timed out: {timeout_err}");
                send(Err(Error::Transient));
                return Err(Error::Transient);
            }
        };
        let ev: Result<Event, _> = match ev {
            None => return Ok(full_content),
            Some(ev) => ev,
        };

        let message = match ev {
            Err(e) => {
                eprintln!("Error while receiving streaming openai server-sent event: {e}");
                send(Err(Error::Transient));
                return Err(Error::Transient);
            }
            Ok(event) => match event {
                Event::Open => {
                    eprintln!("Unexpected repeated open event");
                    send(Err(Error::Fatal));
                    return Err(Error::Fatal);
                }
                Event::Message(message) => message,
            },
        };

        if message.data == "[DONE]" {
            return Ok(full_content);
        }

        let response: CreateChatCompletionStreamResponse =
            match serde_json::from_str(message.data.as_str()) {
                Ok(response) => response,
                Err(e) => {
                    eprintln!("Failed to deserialize streaming chat completion response: {e}");
                    send(Err(Error::Fatal));
                    return Err(Error::Fatal);
                }
            };

        if response.choices.len() != 1 {
            let choice_len = response.choices.len();
            eprintln!("Expected 1 response choice, got {choice_len}");
            send(Err(Error::Fatal));
            return Err(Error::Fatal);
        }

        let choice = response.choices.into_iter().next().unwrap();
        let ChatCompletionStreamResponseDelta { role, content, .. } = choice.delta;
        match role {
            None | Some(Role::Assistant) => {}
            _ => {
                eprintln!("Unexpected role: {role:?}");
            }
        };

        let content = match content {
            Some(content) => content,
            None => {
                // No content was sent with this event, we can safely ignore it.
                continue;
            }
        };

        if content.is_empty() {
            // No content was sent with this event, we can safely ignore it.
            continue;
        }

        full_content.push_str(content.as_str());
        send(Ok(content));
    }
}

fn i64_seed(s: Option<&str>) -> i64 {
    let s = match s {
        Some(s) => s,
        None => {
            // Some fixed default seed.
            return 348934092;
        }
    };

    let mut hasher = hash_map::DefaultHasher::new();
    hasher.write(s.as_bytes());
    let hash: u64 = hasher.finish();

    // We don't care about the individual bits, not what number it represents. So this conversion
    // is fine:
    hash as i64
}

/// Send a user message to the chat bot and return its response.
///
/// `chat` is the chat history onto which this function appends both the user message and the chat
/// bot response on success.
pub async fn send_message_streaming<'a>(
    user_message: String,
    chat: ChatLog,
    seed: Option<&'a str>,
) -> Result<Pin<Box<dyn Stream<Item = Result<String, Error>> + Send>>, Error> {
    let mut messages: Vec<ChatCompletionRequestMessage> = chat
        .chat_log
        .iter()
        .map(|entry| {
            request_message(
                entry.role.clone(),
                entry.content.clone(),
                entry.image_url.clone(),
            )
        })
        .collect();
    messages.push(request_message(ChatRole::User, user_message.clone(), None));

    #[cfg(not(feature = "cheap"))]
    let model = "gpt-4o-2024-08-06";
    #[cfg(feature = "cheap")]
    let model = "gpt-4o-mini-2024-07-18";
    let seed = i64_seed(seed);
    let request_json = CreateChatCompletionRequestArgs::default()
        .seed(seed)
        .model(model)
        .stream(true)
        .messages(messages)
        .build()
        .expect("building the request should always succeed");
    let request_body = serde_json::to_string_pretty(&request_json)
        .expect("Serializing the request should always succeed");

    if let Some(response_body) = API_UTILS.get_cached(&[request_body.as_bytes()]).await {
        let response_json: CreateChatCompletionResponse =
            serde_json::from_str(&response_body).log_and_fatal()?;
        let assistant_message = extract_assistant_message(response_json)?;
        return Ok(Box::pin(tokio_stream::iter(once(Ok(assistant_message)))));
    }

    let cache_path = API_UTILS.cache_path_for_request(&[request_body.as_bytes()]);
    let (tx0, tx1, rx): (
        UnboundedSender<Result<String, Error>>,
        UnboundedSender<Result<String, Error>>,
        UnboundedReceiver<Result<String, Error>>,
    ) = {
        let mut ongoing_streams = ONGOING_STREAMS.lock().unwrap();
        match ongoing_streams.entry(cache_path.clone()) {
            btree_map::Entry::Vacant(vacant) => {
                let (tx0, rx0) = mpsc::unbounded_channel();
                vacant.insert(rx0);
                let (tx1, rx1) = mpsc::unbounded_channel();
                (tx0, tx1, rx1)
            }
            btree_map::Entry::Occupied(mut occupied) => {
                let (tx0, mut rx0) = mpsc::unbounded_channel();
                let (tx1, rx1) = mpsc::unbounded_channel();
                swap(occupied.get_mut(), &mut rx0);

                tokio::spawn(async move {
                    while let Some(item) = rx0.recv().await {
                        tx0.send(item.clone()).ok();
                        tx1.send(item).ok();
                    }
                });

                return Ok(Box::pin(
                    tokio_stream::wrappers::UnboundedReceiverStream::new(rx1),
                ));
            }
        }
    };

    let ongoing_streams_guard = guard((), move |()| {
        ONGOING_STREAMS.lock().unwrap().remove(cache_path.as_path());
    });

    let permit = API_UTILS.acquire_permit().await;
    let _ = API_UTILS.sleep_if_rate_limited().await;
    // TODO: We should check whether the fetch here returns a status code that indicates rate
    // limiting. Unfortunately, it appears that the event source library does not expose the HTTP
    // status code. So we might have to fork upstream to do this properly, or otherwise come up
    // with some hack to detect rate limiting.
    let mut event_source = match fetch_response_streaming(request_body.as_str()).await {
        Ok(event_source) => event_source,
        Err(err) => {
            eprintln!("Error while opening stream: {err}");
            return Err(Error::Fatal);
        }
    };

    match timeout(Duration::from_secs(10), event_source.next()).await {
        Err(timeout_err) => {
            eprintln!("Timeout while waiting for first event: {timeout_err}");
            return Err(Error::Transient);
        }
        Ok(None) => {
            eprintln!("No event received");
            return Err(Error::Transient);
        }
        Ok(Some(Err(e))) => {
            eprintln!("Error while receiving first event: {e}");
            return Err(Error::Transient);
        }
        Ok(Some(Ok(Event::Open))) => (),
        Ok(Some(Ok(Event::Message(message)))) => {
            eprintln!("Unexpected message event before open event: {message:?}");
            return Err(Error::Fatal);
        }
    };

    tokio::spawn(async move {
        // This will move the guard responsible for removing the entry from the ongoing streams map
        // here so that it is dropped at the end of this block.
        // Note that we don't want to drop this before the response stream has been written out to
        // the cache, so it lives until the very end of this async move block.
        let _ongoing_streams_guard = ongoing_streams_guard;

        let result = {
            // Make sure `permit` is moved into this block and dropped at the end of it. We only
            // need to hold onto the permit while the stream to openai is open, so e.g. writing to
            // cache can be done without the permit.
            let _permit = permit;
            let result = forward_openai_event_stream(&mut event_source, tx0, tx1).await;
            event_source.close();
            result
        };

        // We're only putting successful responses into the cache as it makes sense to retry for
        // transient errors.
        // TODO: A fatal error should be cached though.
        match result {
            Err(err) => {
                eprintln!("Error while forwarding openai event stream: {err}");
            }
            Ok(full_content) => {
                // Some fields in ChatCompletionResponseMessage are deprecated but still there, so we need
                // to set them to the values they always assume until upstream removes them.
                #[allow(deprecated)]
                let synthesized_message = ChatCompletionResponseMessage {
                    content: Some(full_content),
                    // TODO: I had to add this for going to version 0.24.1. of async-openai.
                    // We should set this properly once we have time.
                    refusal: None,
                    tool_calls: Some(Vec::new()),
                    role: Role::Assistant,
                    function_call: None,
                };
                let synthesized_choice = ChatChoice {
                    index: 0,
                    message: synthesized_message,
                    finish_reason: None,
                    logprobs: None,
                };
                let synthesized_response = CreateChatCompletionResponse {
                    id: "TODO: Synthesized".to_owned(),
                    choices: vec![synthesized_choice],
                    created: 0,
                    model: "TODO: Synthesized".to_owned(),
                    system_fingerprint: None,
                    object: "TODO: Synthesized".to_owned(),
                    usage: None,
                    service_tier: None,
                };

                let synthesized_response_json = serde_json::to_string_pretty(&synthesized_response)
                    .expect("Serializing the synthesized response should always succeed");
                API_UTILS
                    .put_cached(
                        &[request_body.as_bytes()],
                        synthesized_response_json.as_bytes(),
                    )
                    .await;
            }
        }
    });

    // Turn receiver into a stream.
    Ok(Box::pin(
        tokio_stream::wrappers::UnboundedReceiverStream::new(rx),
    ))
}

#[derive(Debug, thiserror::Error)]
enum ExtractJsonError {
    #[error("No JSON block found\nHint: JSON values should be demarcated by code fences:\n```json\n  <value>\n```")]
    NoJsonBlock,
    #[error("More than one JSON block found\nHint: Remove all but one JSON block.")]
    MoreThanOneJsonBlock,
    #[error(
        "Unterminated JSON block found\nHint: Add a code fence (```) to the end of the JSON block."
    )]
    UnterminatedJsonBlock,
    #[error("Failed to parse JSON")]
    JsonError(#[from] serde_json::Error),
}

fn scrape_json<'a, T: DeserializeOwned>(message: &'a str) -> Result<T, ExtractJsonError> {
    static CODEBLOCK_JSON: Lazy<Regex> = Lazy::new(|| Regex::new(r"```json").unwrap());
    static CODEBLOCK: Lazy<Regex> = Lazy::new(|| Regex::new(r"```").unwrap());

    let json_start: usize = match CODEBLOCK_JSON
        .find_iter(message)
        .collect::<Vec<_>>()
        .as_slice()
    {
        [] => {
            return Err(ExtractJsonError::NoJsonBlock);
        }
        [json_start_match] => json_start_match.end(),
        [_, _, ..] => {
            return Err(ExtractJsonError::MoreThanOneJsonBlock);
        }
    };

    let json_message_suffix = &message[json_start..];

    let json_end = match CODEBLOCK.find_iter(json_message_suffix).next() {
        None => {
            return Err(ExtractJsonError::UnterminatedJsonBlock);
        }
        Some(json_end_match) => json_end_match.start(),
    };

    let json_string = &json_message_suffix[..json_end];
    let json_str_stripped = json_comments::StripComments::new(json_string.as_bytes());
    let value = serde_json::from_reader(json_str_stripped)?;

    Ok(value)
}

pub async fn parse_or_fix_json_response<'a, T: DeserializeOwned>(
    mut response: String,
    chat_log: &mut ChatLog,
) -> Result<T, Error> {
    let mut last_error: Option<(ExtractJsonError, String)> = None;

    const MAX_ATTEMPT_NUM: usize = 3;
    for _ in 0..MAX_ATTEMPT_NUM {
        match scrape_json(response.as_str()) {
            Ok(value) => {
                return Ok(value);
            }
            Err(err) => {
                // Only the Debug instance prints what the error is, the Display instance only
                // prints that it failed, so we need to use the Debug instance for converting to a
                // String.
                let error_message: String = format!("{err:?}");
                eprintln!("Failed to parse JSON: {error_message}");
                if last_error
                    .as_ref()
                    .map(|(_, last_error_message)| last_error_message.as_str())
                    == Some(error_message.as_str())
                {
                    eprintln!("Encountered same JSON error message twice, giving up");
                    return Err(Error::Fatal);
                }

                last_error = Some((err, error_message.clone()));

                response = send_message(error_message, None, chat_log)
                    .await?
                    .to_owned();
            }
        }
    }

    eprintln!("Encountered too many JSON errors, giving up");
    Err(Error::Fatal)
}

pub async fn request_json_answer<'a, T: DeserializeOwned>(
    user_message: String,
    chat_log: &'a mut ChatLog,
) -> Result<T, Error> {
    let response = send_message(user_message, None, chat_log).await?.to_owned();
    parse_or_fix_json_response::<T>(response, chat_log).await
}

pub async fn classify_image<T>(image: &[u8], chat: &mut ChatLog) -> Result<Option<T>, Error>
where
    T: FromStr + Display + IntoEnumIterator,
{
    let variants: Vec<String> = T::iter().map(|v| v.to_string()).collect();
    let prompt = format!(
        "Classify the image as one of the following categories: {}. If none of these categories fit, respond with 'None'. Only respond with the category name or 'None', nothing else. Only classify the image into a category if the image contains nothing else. Do not classify the image into a category if the image contains mostly other things",
        variants.join(", ")
    );

    let response = send_message(prompt, Some(image), chat).await?;

    if response == "None" {
        Ok(None)
    } else {
        T::from_str(response).map(Some).map_err(|_| Error::Fatal)
    }
}
