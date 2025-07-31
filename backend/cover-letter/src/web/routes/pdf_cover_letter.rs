use std::fs;
use std::path::PathBuf;

use axum::http::{HeaderMap, HeaderValue, StatusCode};
use axum::{
    extract::{Path, State},
    response::{self},
    routing::get,
    Router,
};
use tokio::process::Command;
use uuid::Uuid;

use crate::core::model::{RevisionId, UserId};
use crate::db::queries::get_parameters;
use crate::services::resume::{applicant_name, get_json_resume};
use crate::ROOT_URL;
use crate::{
    core::app_state::AppState,
    web::session::{begin_new_internal_session, AnonymousSession},
};

async fn make_applicant_filename_part(
    state: &AppState,
    user_id: UserId,
    revision_id: RevisionId,
) -> Option<String> {
    let json_resume = get_json_resume(state, user_id, revision_id).await?;
    applicant_name(&json_resume.basics)
}

async fn get_pdf_cover_letter(
    State(state): State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    Path(revision_id): Path<Uuid>,
) -> response::Result<(StatusCode, HeaderMap, Vec<u8>)> {
    // This is to ensure that the revision id is valid:
    let _parameters = match get_parameters(&state.db, user_id, RevisionId { revision_id }).await {
        Ok(parameters) => parameters,
        Err(_) => return Err(StatusCode::NOT_FOUND.into()),
    };

    let applicant_filename_part =
        make_applicant_filename_part(&state, user_id, RevisionId { revision_id }).await;
    let filename = match applicant_filename_part {
        Some(applicant_name_part) => format!("{applicant_name_part} Bewerbungsschreiben.pdf"),
        None => format!("Bewerbungsschreiben.pdf"),
    };

    let session_token = begin_new_internal_session(user_id, &state).await;

    let session_token: &str = session_token.0.as_ref();
    let internal_print_url =
        format!("{ROOT_URL}/internal-print/cover-letter/{session_token}/{revision_id}");

    let output_file_path = tempfile::Builder::new()
        .prefix("pdf-cover-letter-")
        .suffix(".pdf")
        .tempfile()
        .unwrap()
        .into_temp_path();

    let status = Command::new("chromium")
        .arg("--headless")
        .arg("--no-pdf-header-footer")
        .arg("--virtual-time-budget=10000")
        .arg(format!("--print-to-pdf={}", output_file_path.display()))
        .arg(internal_print_url)
        .stdout(std::process::Stdio::null())
        .stderr(std::process::Stdio::null())
        .status()
        .await
        .unwrap();

    let pdf_bytes = if status.success() {
        fs::read(&output_file_path).expect("io should work")
    } else {
        eprintln!("chromium failed to render html as pdf");
        return Err(StatusCode::INTERNAL_SERVER_ERROR.into());
    };

    let log_filepath = PathBuf::from(format!(
        "/tmp/bewerbungshelfer-downloaded-files/{revision_id}--{}--{}",
        user_id.user_id,
        filename.replace(" ", "-")
    ));

    if let Some(parent) = log_filepath.parent() {
        fs::create_dir_all(parent).unwrap();
    }

    fs::write(&log_filepath, &pdf_bytes).unwrap();

    let mut headers = HeaderMap::new();
    headers.insert(
        "Content-Disposition",
        HeaderValue::from_str(&format!("attachment; filename=\"{filename}\"",)).unwrap(),
    );

    Ok((StatusCode::OK, headers, pdf_bytes))
}

pub fn pdf_cover_letter_router() -> Router<AppState> {
    Router::new().route("/:revision_id", get(get_pdf_cover_letter))
}
