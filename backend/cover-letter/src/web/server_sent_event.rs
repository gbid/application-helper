use axum::response::{sse, Sse};
use futures::stream::{BoxStream, Stream};
use futures::StreamExt;
use hyper::HeaderMap;
use serde::{Deserialize, Serialize};
use std::convert::Infallible;
use std::marker::Send;
use ts_rs::TS;

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(tag = "kind")]
#[serde(rename_all = "camelCase")]
pub enum ServerSentEvent<T, E> {
    Ok { data: T },
    Err { error: E },
    End,
}

impl<T, E> Into<sse::Event> for ServerSentEvent<T, E>
where
    T: Serialize,
    E: Serialize,
{
    fn into(self) -> sse::Event {
        sse::Event::default().data(serde_json::to_string(&self).unwrap())
    }
}

impl<T, E> Into<Result<sse::Event, Infallible>> for ServerSentEvent<T, E>
where
    T: Serialize,
    E: Serialize,
{
    fn into(self) -> Result<sse::Event, Infallible> {
        Ok(self.into())
    }
}

pub fn get_sse_response_headers() -> HeaderMap {
    let mut headers = HeaderMap::new();
    // set Cache-Control: no-transform
    // to fix client-side caching issues
    // caused by proxy settings in frontends package.json
    // set Cache-Control: no-cache
    // to get it working in production behind nginx
    headers.insert("Cache-Control", "no-cache, no-transform".parse().unwrap());
    headers.insert("Content-Type", "text/event-stream".parse().unwrap());
    // Specifically for disabling proxy buffering
    headers.insert("X-Accel-Buffering", "no".parse().unwrap());
    headers
}

pub type SseResponse = (
    HeaderMap,
    Sse<BoxStream<'static, Result<sse::Event, Infallible>>>,
);

pub fn create_sse_response<S, T, E>(
    stream: S,
) -> (
    HeaderMap,
    Sse<BoxStream<'static, Result<sse::Event, Infallible>>>,
)
where
    S: Stream<Item = ServerSentEvent<T, E>> + Send + 'static,
    T: serde::Serialize,
    E: serde::Serialize,
{
    let headers = get_sse_response_headers();
    let mapped_stream = stream.map(|event| Ok(event.into()));
    let sse =
        Sse::new(Box::pin(mapped_stream) as BoxStream<'static, Result<sse::Event, Infallible>>)
            .keep_alive(axum::response::sse::KeepAlive::new());

    (headers, sse)
}
