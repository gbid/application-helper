use crate::app_state::AppState;
use crate::queries;
use crate::session::Session;
use axum::extract::{Json, State};
use axum::http::StatusCode;
use axum::response;
use axum::response::IntoResponse;
use axum::routing::post;
use axum::Router;
// use axum_macros::debug_handler;

#[derive(serde::Deserialize, Debug)]
struct Feedback {
    feedback: String,
}

async fn feedback_handler(
    state: State<AppState>,
    Session { user_id, .. }: Session,
    feedback: Json<Feedback>,
) -> response::Result<impl IntoResponse> {
    queries::insert_feedback(&user_id, &feedback.feedback, &state.db)
        .await
        .map_err(|e| {
            eprintln!("Failed to save feedback: {:?}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, "Failed to save feedback")
        })?;
    Ok((StatusCode::NO_CONTENT, ""))
}

pub fn feedback_router() -> Router<AppState> {
    Router::new().route("/", post(feedback_handler))
}
