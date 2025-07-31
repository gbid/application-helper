use crate::core::app_state::AppState;

use crate::web::session::AnonymousSession;

use axum::extract::{Path, State};

use axum::routing;
use axum::{response, Json, Router};

use crate::core::model::{JsonResume, RevisionId};
use uuid::Uuid;

async fn get_json_resume(
    state: State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    Path(revision_id): Path<Uuid>,
) -> response::Result<Json<Option<JsonResume>>> {
    let revision_id = RevisionId { revision_id };
    let json_resume = crate::services::resume::get_json_resume(&state, user_id, revision_id).await;
    Ok(Json(json_resume))
}

pub fn json_resume_router() -> Router<AppState> {
    Router::new().route("/:revision_id", routing::get(get_json_resume))
}
