use axum::extract::State;
use axum::response::IntoResponse;
use axum::response::{self, Redirect, Response};
use axum::Router;

use crate::core::app_state::AppState;
use crate::core::error::LogErrAndFatal;
use crate::db::queries::insert_anonymous_user;
use crate::web::session::begin_new_session;

#[axum_macros::debug_handler]
async fn start_anonymous_session(State(state): State<AppState>) -> response::Result<Response> {
    let user_id = insert_anonymous_user(&state.db).await.log_and_fatal()?;

    let mut response = Redirect::to("/").into_response();

    begin_new_session(user_id, &mut response, &state).await;
    Ok(response)
}

pub fn anonymous_session_router() -> Router<AppState> {
    Router::new().route("/start", axum::routing::post(start_anonymous_session))
}
/*
pub fn application_router() -> Router<AppState> {
    Router::new()
        .route("/new", axum::routing::post(post_handler_new_application))
        .route("/get", axum::routing::get(get_handler_get_application))
}
*/
