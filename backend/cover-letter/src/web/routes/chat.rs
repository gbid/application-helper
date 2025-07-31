use axum::response;
use axum::{
    extract::{Path, State},
    routing, Json, Router,
};
use uuid::Uuid;

use crate::core::model::{ApplicationId, ChatLogEntry, ChatRole, RevisionId, UserId};
use crate::db::queries;
use crate::services::chat::create_chat_response_stream;
use crate::web::server_sent_event::{create_sse_response, SseResponse};
use crate::{
    core::app_state::AppState, core::error::LogErrAndFatal as _, web::session::AnonymousSession,
};

pub async fn get_chat_response(
    state: AppState,
    user_id: UserId,
    application_id: ApplicationId,
    revision_id: Option<RevisionId>,
) -> SseResponse {
    let stream = create_chat_response_stream(state, user_id, application_id, revision_id).await;
    create_sse_response(stream)
}

pub async fn get_chat_response_for_revision(
    State(state): State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    Path((application_id, revision_id)): Path<(Uuid, Uuid)>,
) -> SseResponse {
    let application_id = ApplicationId { application_id };
    let revision_id = RevisionId { revision_id };
    get_chat_response(state, user_id, application_id, Some(revision_id)).await
}

pub async fn get_chat_response_without_revision(
    State(state): State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    Path(application_id): Path<Uuid>,
) -> SseResponse {
    let application_id = ApplicationId { application_id };
    get_chat_response(state, user_id, application_id, None).await
}

pub async fn post_user_message(
    State(state): State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    Path(application_id): Path<Uuid>,
    Json(user_message): Json<String>,
) -> response::Result<()> {
    let application_id = ApplicationId { application_id };

    let chat_log_entry = ChatLogEntry {
        role: ChatRole::User,
        content: user_message,
        image_url: None,
    };
    queries::push_chat_log_entry(
        &mut *state.db.acquire().await.unwrap(),
        &user_id,
        &application_id,
        chat_log_entry,
    )
    .await
    .log_and_fatal()?;
    Ok(())
}

pub fn chat_response_router() -> Router<AppState> {
    Router::new()
        .route(
            "/:application_id",
            routing::post(post_user_message).get(get_chat_response_without_revision),
        )
        .route(
            "/:application_id/:revision_id",
            routing::get(get_chat_response_for_revision),
        )
}
