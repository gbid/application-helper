use crate::core::app_state::*;

use crate::web::session::SubscribedSession;

use axum::http::StatusCode;
use axum::routing;
use axum::Router;

async fn subscribed_only(session: SubscribedSession) -> StatusCode {
    println!(
        "The following user passed the SubscribedSession extractor: {:?}",
        session.user_id
    );
    StatusCode::OK
}

pub fn dummy_router() -> Router<AppState> {
    Router::new().route("/", routing::get(subscribed_only))
}
