use crate::app_state::AppState;

use crate::model::{CompanyAddress, RevisionId};

use crate::session::AnonymousSession;

use axum::extract::{Path, State};

use axum::routing::get;
use axum::{response, Json, Router};

use uuid::Uuid;

async fn get_company_address(
    state: State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    Path(revision_id): Path<Uuid>,
) -> response::Result<Json<CompanyAddress>> {
    let revision_id = RevisionId { revision_id };
    Ok(Json(
        crate::address::get_company_address(revision_id, user_id, &state).await?,
    ))
}

pub fn company_address_router() -> Router<AppState> {
    Router::new().route("/:revision_id", get(get_company_address))
}
