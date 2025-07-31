use crate::core::app_state::AppState;
use crate::core::error::Error;
use crate::core::model::RevisionId;
use crate::services::resume_image_extraction::extract_signature;
use crate::web::session::AnonymousSession;

use axum::body::Body;
use axum::extract::{Path, State};
use axum::http::{header, StatusCode};
use axum::response::{IntoResponse, Response};
use axum::routing::get;
use axum::{response, Router};
use bytes::Bytes;

use uuid::Uuid;

async fn get_signature(
    state: State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    Path(revision_id): Path<Uuid>,
) -> response::Result<impl IntoResponse> {
    let revision_id = RevisionId { revision_id };

    let Some(signature) = extract_signature(&state.db, user_id, revision_id).await? else {
        return Ok(Response::builder()
            .status(StatusCode::NO_CONTENT)
            .body(Body::empty())
            .map_err(|e| {
                eprintln!("Failed to build response: {}", e);
                Error::Fatal
            })?);
    };

    let image_data = Bytes::from(signature.image_data);

    let response = Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "image/jpeg")
        .body(Body::from(image_data))
        .map_err(|e| {
            eprintln!("Failed to build response: {}", e);
            Error::Fatal
        })?;

    Ok(response)
}

pub fn signature_router() -> Router<AppState> {
    Router::new().route("/:revision_id", get(get_signature))
}
