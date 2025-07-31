use axum::{
    extract::{ConnectInfo, Path, State},
    routing::get,
    Router,
};
use futures::stream::{BoxStream, StreamExt};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use ts_rs::TS;
use uuid::Uuid;

use crate::core::model::ChatLog;
use crate::core::model::{RevisionId, UserId, UserType};
use crate::{
    core::app_state::AppState,
    integrations::prompting::send_message_streaming,
    services::cover_letter_generation,
    web::server_sent_event::{create_sse_response, ServerSentEvent, SseResponse},
    web::session::AnonymousSession,
};

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(tag = "kind")]
#[serde(rename_all = "camelCase")]
enum CoverLetterError {
    NotFound,
    TooManyAnonymousRequests,
    GenerationFailed,
    NeitherJobAdvertNorResumeSpecified,
}

pub async fn get_cover_letter(
    State(state): State<AppState>,
    AnonymousSession {
        user_id, user_type, ..
    }: AnonymousSession,
    Path(revision_id): Path<Uuid>,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
) -> SseResponse {
    let stream = create_cover_letter_stream(state, user_id, user_type, revision_id, addr).await;
    create_sse_response(stream)
}

async fn create_cover_letter_stream(
    state: AppState,
    user_id: UserId,
    user_type: UserType,
    revision_id: Uuid,
    addr: SocketAddr,
) -> BoxStream<'static, ServerSentEvent<String, CoverLetterError>> {
    use futures::stream::once;
    let revision_id = RevisionId { revision_id };
    let input_data = match crate::cover_letter_generation::get_cover_letter_input_data(
        &state.db,
        &user_id,
        &revision_id,
    )
    .await
    {
        Some(input_data) => {
            if input_data.job_advert.is_none() && input_data.resume_text.is_none() {
                let stream = once(async {
                    ServerSentEvent::Err {
                        error: CoverLetterError::NeitherJobAdvertNorResumeSpecified,
                    }
                });
                return Box::pin(stream);
            }
            input_data
        }
        None => {
            let stream = once(async {
                ServerSentEvent::Err {
                    error: CoverLetterError::NotFound,
                }
            });
            return Box::pin(stream);
        }
    };

    let mut rate_limited = false;

    let streaming_response = match input_data.cover_letter_text {
        Some(text) => {
            let stream = once(async { Ok(text) });
            Box::pin(stream)
        }
        None => {
            rate_limited = match user_type {
                UserType::Anonymous => {
                    let ip = addr.ip().to_string();
                    state.rate_limiter.is_ip_rate_limited(&ip)
                }
                UserType::Standard => state.rate_limiter.is_user_rate_limited(&user_id),
                UserType::Subscribed => false,
            };
            let random_seed = input_data.cover_letter_random_seed.clone();

            send_message_streaming(
                cover_letter_generation::build_prompt(input_data),
                ChatLog::new(),
                random_seed.as_deref(),
            )
            .await
            .unwrap()
        }
    };

    let char_limit = if rate_limited { 350 } else { usize::MAX };

    let stream = streaming_response
        .scan(0usize, move |char_count, chunk_result| {
            let result = match chunk_result {
                Ok(chunk) => {
                    let new_count = *char_count + chunk.chars().count();
                    if new_count <= char_limit {
                        *char_count = new_count;
                        Some(ServerSentEvent::Ok { data: chunk })
                    } else if *char_count < char_limit {
                        let truncated = chunk
                            .chars()
                            .take(char_limit - *char_count)
                            .collect::<String>();
                        *char_count = char_limit;
                        Some(ServerSentEvent::Ok { data: truncated })
                    } else {
                        None
                    }
                }
                Err(_) => Some(ServerSentEvent::Err {
                    error: CoverLetterError::GenerationFailed,
                }),
            };
            futures::future::ready(result)
        })
        .chain(futures::stream::once(async move {
            if rate_limited {
                ServerSentEvent::Err {
                    error: CoverLetterError::TooManyAnonymousRequests,
                }
            } else {
                ServerSentEvent::End
            }
        }));

    Box::pin(stream)
}

pub fn cover_letter_router() -> Router<AppState> {
    Router::new().route("/:revision_id", get(get_cover_letter))
}
