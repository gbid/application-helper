use crate::core::app_state::AppState;

use crate::core::model::{ApplicantAddress, RevisionId};

use crate::web::session::AnonymousSession;

use axum::extract::{Path, State};

use axum::routing::get;
use axum::{response, Json, Router};

use uuid::Uuid;

async fn get_applicant_address(
    state: State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    Path(revision_id): Path<Uuid>,
) -> response::Result<Json<ApplicantAddress>> {
    let revision_id = RevisionId { revision_id };
    let applicant_address =
        crate::services::address::get_applicant_address(revision_id, user_id, &state).await?;
    Ok(Json(applicant_address))
}

pub fn applicant_address_router() -> Router<AppState> {
    Router::new().route("/:revision_id", get(get_applicant_address))
}
