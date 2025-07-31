use crate::core::app_state::*;

use crate::web::session::*;

use axum::routing::any;

use axum::http::StatusCode;
use axum::Router;

async fn session(_session: AnonymousSession) -> StatusCode {
    StatusCode::OK
}

pub fn session_router() -> Router<AppState> {
    Router::new().route("/", any(session))
}
