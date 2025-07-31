use crate::core::app_state::AppState;
use crate::core::error::Error;
use crate::core::model::ChatLog;
use crate::core::model::TemplateCoverLetter;
use crate::db::queries;
use crate::integrations::prompting::send_message;
use crate::web::session::AnonymousSession;
use axum::extract::{Json, State};
use axum::http::StatusCode;
use axum::response;
use axum::routing;
use axum::Router;
use indoc::indoc;

#[derive(serde::Deserialize, Debug)]
struct TemplateCoverLetterContent {
    content: String,
}

#[axum_macros::debug_handler]
async fn post_handler_template_cover_letter(
    state: State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    template_cover_letter_content: Json<TemplateCoverLetterContent>,
) -> response::Result<(StatusCode, Json<TemplateCoverLetter>)> {
    // TODO: handle string reference properly
    let template_cover_letter_content = &template_cover_letter_content.content;
    let existing_template_cover_letter = queries::get_template_cover_letter_by_content(
        &user_id,
        &template_cover_letter_content,
        &state.db,
    )
    .await
    .map_err(|e| {
        eprintln!("Failed to get template cover letter by content: {:?}", e);
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            "Failed to get template cover letter by content",
        )
    })?;
    if let Some(template_cover_letter) = existing_template_cover_letter {
        return Ok((StatusCode::OK, Json(template_cover_letter)));
        // return Ok(response::Response::builder()
        //     .status(StatusCode::OK)
        //     .body(Json(template_cover_letter).into_response())
        //     .unwrap());
    }
    let template_cover_letter_title =
        create_template_cover_letter_title(&template_cover_letter_content)
            .await
            .map_err(|e| {
                eprintln!("Failed to create template cover letter title: {:?}", e);
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "Failed to create template cover letter title",
                )
            })?;
    let new_template_cover_letter = queries::NewTemplateCoverLetter {
        template_cover_letter_title,
        text_content: template_cover_letter_content.clone(),
    };

    let template_cover_letter_id =
        // queries::save_or_get_template_cover_letter(&user_id, &new_template_cover_letter, &state.db)
        queries::save_template_cover_letter(&user_id, &new_template_cover_letter, &state.db)
            .await
            .map_err(|e| {
                eprintln!("Failed to save template cover letter: {:?}", e);
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "Failed to save template cover letter",
                )
            })?
        .expect("get_template_cover_letter_by_content returned None");
    let template_cover_letter: TemplateCoverLetter =
        queries::get_template_cover_letter_by_id(&user_id, &template_cover_letter_id, &state.db)
            .await
            .map_err(|e| {
                eprintln!("Failed to get template cover letter by id: {:?}", e);
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "Failed to get template cover letter by id",
                )
            })?;

    // return CREATED status code if the template cover letter was created
    Ok((StatusCode::CREATED, Json(template_cover_letter)))
}

async fn get_handler_latest_template_cover_letter(
    state: State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
) -> response::Result<Json<Option<TemplateCoverLetter>>> {
    let template_cover_letter: Option<TemplateCoverLetter> =
        queries::get_latest_template_cover_letter(&user_id, &state.db)
            .await
            .map_err(|e| {
                eprintln!("Failed to get latest template cover letter: {:?}", e);
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "Failed to get latest template cover letter",
                )
            })?;
    Ok(Json(template_cover_letter))
}

async fn create_template_cover_letter_title(
    template_cover_letter_description: &str,
) -> Result<String, Error> {
    const PROMPT: &'static str = indoc! { r#"
        Come up with a short and descriptive title for the following cover letter uploaded by one of my users.
        The title should be easy to recognize and allow the user to discern between different cover letters based on the title.
        The length of the title should be at most 5 words and match the language of the cover letter.
        If the template_cover_letter description already contains a sufficiently descriptive title, just answer verbatim with this title and without any modifications.
        Only answer with the title, do not include any other information.
        Here is the cover letter:
        "#
    };
    // TODO: handle errors /retries properly
    let prompt = format!("{}\n\n{}", PROMPT, template_cover_letter_description);
    let display_title = send_message(prompt, None, &mut ChatLog::new())
        .await?
        .to_owned();
    Ok(display_title)
}

pub fn template_cover_letter_router() -> Router<AppState> {
    Router::new()
        .route(
            "/",
            routing::post(post_handler_template_cover_letter)
                .layer(axum::extract::DefaultBodyLimit::max(20 * 1024 * 1024)), // 20MB
        )
        .route(
            "/latest",
            routing::get(get_handler_latest_template_cover_letter),
        )
}
