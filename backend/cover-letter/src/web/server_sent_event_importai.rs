use axum::response::{sse, IntoResponse, Response, Sse};
use futures::stream::{self, BoxStream, Stream};
use futures::StreamExt;
use hyper::HeaderMap;
use std::convert::Infallible;
use std::marker::Send;

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

pub fn sse_stream_response<S, T>(stream: S) -> Response
where
    S: Stream<Item = T> + Send + 'static,
    T: serde::Serialize + Send + 'static,
{
    let headers = get_sse_response_headers();
    let event_stream = stream
        .map(Option::Some)
        .chain(stream::once(async { None }))
        .map(|item| Ok(sse::Event::default().data(serde_json::to_string(&item).unwrap())));

    let sse =
        Sse::new(Box::pin(event_stream) as BoxStream<'static, Result<sse::Event, Infallible>>)
            .keep_alive(axum::response::sse::KeepAlive::new());

    (headers, sse).into_response()
}
