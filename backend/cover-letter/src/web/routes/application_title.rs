use crate::core::app_state::AppState;

use crate::core::error::Error;
use crate::core::model::ChatLog;
use crate::core::model::{ApplicationParameters, RevisionId, UserId};
use crate::db::queries::{self};
use crate::integrations::prompting::request_json_answer;
use crate::web::session::AnonymousSession;

use axum::extract::{Path, State};

use axum::routing::get;
use axum::{response, Json, Router};

use indoc::formatdoc;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
struct JobTitle {
    title: String,
}

pub async fn make_title(
    state: &AppState,
    user_id: UserId,
    revision_id: RevisionId,
) -> Result<Option<String>, Error> {
    let ApplicationParameters { job_advert, .. } =
        match queries::get_parameters(&state.db, user_id, revision_id).await? {
            None => {
                eprintln!("Revision not found");
                return Err(Error::Fatal);
            }
            Some(parameters) => parameters,
        };

    let job_advert = match job_advert {
        Some(job_advert) => job_advert,
        None => {
            return Ok(None);
        }
    };

    let prompt = formatdoc! {r#"
        You are a professional career and job application coach.
        Your client is applying for the following job:
        ```
        {job_advert}
        ```
        For the front page of the clients application, you need to come up with a descriptive and professional title for the job application.
        A descriptive title usually includes:

        - title or role of the job
        - company or team (if present)

        However you must leave out information that cannot be inferred from the job posting.
        In particular, the title should at most be 100 characters long.
        The job title should be in the same language as the job posting.

        Your answer should be given in JSON format, for example like so:
        ```json
            {{
                "title": "Bewerbung als Spezialist Ankauf bei der BMW AG",
            }}
        ```
    "#};

    let JobTitle { title } = request_json_answer(prompt, &mut ChatLog::new()).await?;

    Ok(Some(title))
}

async fn get_application_title(
    state: State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    Path(revision_id): Path<Uuid>,
) -> response::Result<Json<Option<String>>> {
    let revision_id = RevisionId { revision_id };

    let title = make_title(&state, user_id, revision_id).await?;

    Ok(Json(title))
}

pub fn application_title_router() -> Router<AppState> {
    Router::new().route("/:revision_id", get(get_application_title))
}
