use axum::extract::State;
use axum::Router;

use axum::response::IntoResponse;
use axum::response::{self, Response};
use axum::routing::post;

use crate::core::app_state::*;
use crate::db::queries::*;

use crate::web::session::*;

pub async fn post_signout(
    session: Option<Session>,
    State(state): State<AppState>,
) -> response::Result<Response> {
    if let Some(session) = session {
        delete_session(&session.token_hash, &state.db).await;
    }

    let mut response = axum::http::StatusCode::OK.into_response();
    unset_session(&mut response);
    Ok(response)
}

pub fn signout_router() -> Router<AppState> {
    Router::new().route("/", post(post_signout))
}
