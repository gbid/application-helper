use crate::core::app_state::AppState;
use crate::web::session::AnonymousSession;
use axum::extract::State;
use axum::{
    http::{header, HeaderMap, StatusCode},
    response::{Html, IntoResponse},
    routing::get,
    Router,
};
use tokio::fs::File;
use tokio::io::AsyncReadExt;

async fn get_resume_html(
    State(_state): State<AppState>,
    AnonymousSession { .. }: AnonymousSession,
) -> impl IntoResponse {
    // TODO: load resume html content for user_id from db
    match read_utf8_file("resume.html").await {
        Ok(html) => Html(html),
        Err(_) => Html("Error reading HTML file".to_string()),
    }
}

async fn get_avatar(
    State(_state): State<AppState>,
    AnonymousSession { .. }: AnonymousSession,
) -> impl IntoResponse {
    // For now, read the avatar.jpg file and return it
    match read_raw_file("avatar.jpg").await {
        Ok(image) => {
            let mut headers = HeaderMap::new();
            headers.insert(
                header::CONTENT_TYPE,
                header::HeaderValue::from_static("image/jpeg"),
            );
            (headers, image).into_response()
        }
        Err(_) => {
            // Return 404 Not Found
            eprintln!("avatar.jpg not found");
            (StatusCode::NOT_FOUND, "Image not found").into_response()
        }
    }
}

async fn read_utf8_file(file_path: &str) -> Result<String, std::io::Error> {
    let mut file = File::open(file_path).await?;
    let mut contents = String::new();
    file.read_to_string(&mut contents).await?;
    Ok(contents)
}

async fn read_raw_file(file_path: &str) -> Result<Vec<u8>, std::io::Error> {
    let mut file = File::open(file_path).await?;
    let mut contents = Vec::new();
    file.read_to_end(&mut contents).await?;
    Ok(contents)
}

pub fn resume_html_router() -> Router<AppState> {
    Router::new()
        .route("/", get(get_resume_html))
        .route("/avatar", get(get_avatar))
}
