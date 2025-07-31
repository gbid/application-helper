use crate::core::app_state::AppState;
use crate::core::error::LogErrAndFatal;
// use crate::interview::create_initial_interview_questions;
use crate::core::model::{
    Application, ApplicationId, ApplicationIdAndTitle, ApplicationParameters, Revision, RevisionId,
};
use crate::services::application::process_application_parameters;
use serde::{Deserialize, Serialize};

use crate::db::queries::{self, get_latest_revision};

use crate::web::session::AnonymousSession;

use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response;
use axum::routing::{get, post};
use axum::Json;
use axum::Router;
use uuid::Uuid;

use super::make_title;

async fn post_application(
    State(state): State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
) -> response::Result<Json<ApplicationId>> {
    let application_id = queries::create_application(&state.db, &user_id)
        .await
        .log_and_fatal()?;
    Ok(Json(application_id))
}

#[derive(Debug, Copy, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct ApplicationQuery {
    revision_id: Option<Uuid>,
}

async fn get_application(
    State(state): State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    Path(application_id): Path<Uuid>,
    Query(ApplicationQuery { revision_id }): Query<ApplicationQuery>,
) -> response::Result<Json<Application>> {
    let application_id = ApplicationId { application_id };
    let revision_id = revision_id.map(RevisionId::from);
    let application: Application =
        queries::get_application(&state.db, &user_id, &application_id, &revision_id)
            .await
            .log_and_fatal()?
            .ok_or((StatusCode::NOT_FOUND, "Application not found"))?;

    Ok(Json(application))
}

pub async fn get_applications(
    State(state): State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
) -> response::Result<Json<Vec<ApplicationIdAndTitle>>> {
    let latest_revisions: Vec<(ApplicationId, RevisionId)> =
        queries::get_latest_revisions(&state.db, user_id)
            .await
            .log_and_fatal()?;

    let mut application_titles: Vec<ApplicationIdAndTitle> = Vec::new();
    for (application_id, revision_id) in latest_revisions {
        let title: Option<String> = make_title(&state, user_id, revision_id)
            .await
            .map_err(|err| {
                eprintln!("Failed to make application title: {:?}", err);
            })
            .ok()
            .flatten();
        application_titles.push(ApplicationIdAndTitle {
            application_id,
            title,
        });
    }

    Ok(Json(application_titles))
}

pub async fn post_application_parameters(
    State(state): State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    Path(application_id): Path<Uuid>,
    Json(application_parameters): Json<ApplicationParameters>,
) -> response::Result<Json<Option<RevisionId>>> {
    let application_id = ApplicationId { application_id };
    let new_revision_id =
        process_application_parameters(&state.db, user_id, application_id, application_parameters)
            .await
            .log_and_fatal()?;

    Ok(Json(new_revision_id))
}

pub async fn get_application_parameters(
    State(state): State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    Path(application_id): Path<Uuid>,
) -> response::Result<Json<Revision>> {
    let application_id = ApplicationId { application_id };
    let revision: Option<Revision> =
        get_latest_revision(&state.db, user_id, application_id).await?;
    let revision: Revision = match revision {
        None => {
            return Err((StatusCode::NOT_FOUND, "Application not found").into());
        }
        Some(revision) => revision,
    };

    Ok(Json(revision))
}

async fn get_application_parameters_for_revision(
    State(state): State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    Path((application_id, revision_id)): Path<(Uuid, Uuid)>,
) -> response::Result<Json<ApplicationParameters>> {
    let _application_id = ApplicationId { application_id };
    let revision_id = RevisionId { revision_id };
    let application_parameters: ApplicationParameters =
        queries::get_parameters(&state.db, user_id, revision_id)
            .await
            .log_and_fatal()?
            .ok_or((StatusCode::NOT_FOUND, "Revision not found"))?;

    Ok(Json(application_parameters))
}

pub fn application_router() -> Router<AppState> {
    Router::new()
        .route("/", post(post_application))
        .route("/", get(get_applications))
        .route(
            "/:application_id/parameters",
            post(post_application_parameters),
        )
        .route(
            "/:application_id/parameters",
            get(get_application_parameters),
        )
        .route(
            "/:application_id/parameters/revision/:revision_id",
            get(get_application_parameters_for_revision),
        )
        .route("/get", get(get_application))
}
