use std::path::PathBuf;

use crate::core::app_state::AppState;
use crate::core::error::LogErrAndFatal;
use crate::core::model::{NewResume, ResumeId};
use crate::db::queries::{self, save_or_get_resume};
use crate::web::session::AnonymousSession;
use axum::body::Body;
use axum::extract::{Multipart, Path, Query, State};
use axum::http::{HeaderValue, StatusCode};
use axum::response::{IntoResponse, Response};
use axum::routing::{get, post};
use axum::{response, Json, Router};
use hyper::HeaderMap;
use uuid::Uuid;

async fn get_resume_info_handler(
    state: State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
) -> response::Result<impl IntoResponse> {
    match queries::get_latest_resume_info(&user_id, &state.db).await {
        Ok(Some(resume_info)) => Ok(response::Json(resume_info).into_response()),
        Ok(None) => Ok(Response::builder()
            .status(StatusCode::NO_CONTENT)
            .body("No content".into())
            .unwrap()),
        Err(e) => {
            eprintln!("Failed to get resume info: {:?}", e);
            Err((
                StatusCode::INTERNAL_SERVER_ERROR,
                "Failed to get resume info",
            )
                .into())
        }
    }
}

async fn get_resume_content_handler(
    state: State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    Query(resume_id): Query<ResumeId>,
) -> response::Result<Response<Body>> {
    let (info, content) = queries::get_resume(&user_id, &resume_id, &state.db)
        .await
        .log_and_fatal()?
        .ok_or_else(|| (StatusCode::NOT_FOUND, "Resume not found"))?;
    let response_body = Body::from(content);
    let response = Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/pdf")
        .header(
            "Content-Disposition",
            format!("attachment; filename=\"{}\"", info.file_path.display()),
        )
        .body(response_body)
        .log_and_fatal()?;
    Ok(response)
}

async fn post_resume(
    state: State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    mut multipart: Multipart,
) -> response::Result<Json<ResumeId>> {
    let first_part = multipart
        .next_field()
        .await?
        .ok_or_else(|| (StatusCode::BAD_REQUEST, "No file provided"))?;

    let file_name = PathBuf::from(
        first_part
            .file_name()
            .ok_or_else(|| (StatusCode::BAD_REQUEST, "No filename provided"))?,
    );
    let byte_content = first_part.bytes().await?;

    if let Some(_) = multipart.next_field().await? {
        return Err((StatusCode::BAD_REQUEST, "More than one file is not allowed").into());
    }

    let new_resume = NewResume {
        byte_content: byte_content.to_vec(),
        size: byte_content.len() as i32,
        file_path: file_name,
    };

    let resume_id = save_or_get_resume(&state.db, &user_id, &new_resume)
        .await
        .log_and_fatal()?;

    Ok(Json(resume_id))
}

async fn get_resume(
    state: State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    Path(resume_id): Path<Uuid>,
) -> response::Result<(StatusCode, HeaderMap, Vec<u8>)> {
    let resume_id = ResumeId { resume_id };
    let (resume_info, byte_content) = queries::get_resume(&user_id, &resume_id, &state.db)
        .await
        .log_and_fatal()?
        .ok_or_else(|| (StatusCode::NOT_FOUND, "Resume not found"))?;

    let mut headers = HeaderMap::new();
    headers.insert(
        "Content-Disposition",
        HeaderValue::from_str(&format!(
            "attachment; filename=\"{}\"",
            resume_info.file_path.display()
        ))
        .unwrap(),
    );
    headers.insert(
        "Last-Modified",
        HeaderValue::from_str(resume_info.created_at.to_rfc2822().as_str()).unwrap(),
    );

    Ok((StatusCode::OK, headers, byte_content))
}

pub fn resume_router() -> Router<AppState> {
    Router::new()
        // The post route accepts files, so we need to set a higher body limit. The default
        // axum one, which is of the order of 1MB OTOH, is too low for many resumes.
        .route(
            "/",
            post(post_resume).layer(axum::extract::DefaultBodyLimit::max(20 * 1024 * 1024)),
        )
        .route("/:resume_id", get(get_resume))
        .route("/latest", get(get_resume_info_handler))
        .route("/content", get(get_resume_content_handler))
}
