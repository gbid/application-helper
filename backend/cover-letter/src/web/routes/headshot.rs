use crate::core::app_state::AppState;
use crate::core::error::Error;
use crate::core::model::Headshot;
use crate::core::model::HeadshotContentType;
use crate::core::model::HeadshotId;
use crate::core::model::RevisionId;
use crate::db::queries;
use crate::services::resume_image_extraction::extract_headshot;
use crate::web::session::AnonymousSession;
use axum::body::Body;
use axum::extract::Multipart;
use axum::extract::Path;
use axum::extract::State;
use axum::http::header;
use axum::http::Response;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::routing::get;
use axum::routing::post;
use axum::Json;
use axum::Router;
use bytes::Bytes;
use uuid::Uuid;

async fn post_headshot(
    state: State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    mut multipart: Multipart,
) -> axum::response::Result<Json<HeadshotId>> {
    let Some(field) = multipart.next_field().await.map_err(|e| {
        eprintln!("Failed to get field from multipart: {}", e);
        (StatusCode::BAD_REQUEST, "Invalid form data")
    })?
    else {
        return Err((StatusCode::BAD_REQUEST, "No file provided").into());
    };

    let content_type = field
        .content_type()
        .ok_or((StatusCode::BAD_REQUEST, "Missing content type"))?
        .to_string();

    let content_type = match HeadshotContentType::from_str(&content_type) {
        Some(content_type) => content_type,
        None => return Err((StatusCode::BAD_REQUEST, "Unsupported image format").into()),
    };

    let byte_content = field.bytes().await.map_err(|e| {
        eprintln!("Failed to read file content: {}", e);
        (StatusCode::INTERNAL_SERVER_ERROR, "Failed to read file")
    })?;

    let headshot = Headshot {
        image_data: byte_content.to_vec(),
        content_type,
    };

    let headshot_id = queries::save_headshot(&state.db, user_id, headshot).await;

    Ok(Json(headshot_id))
}

async fn get_headshot(
    state: State<AppState>,
    AnonymousSession { user_id, .. }: AnonymousSession,
    Path(revision_id): Path<Uuid>,
) -> axum::response::Result<impl IntoResponse> {
    if let Some(Headshot {
        image_data,
        content_type,
    }) = queries::get_headshot(&state.db, revision_id).await
    {
        return Ok(Response::builder()
            .status(StatusCode::OK)
            .header(
                header::CONTENT_TYPE,
                HeadshotContentType::to_str(&content_type),
            )
            .body(Body::from(image_data))
            .map_err(|e| {
                eprintln!("Failed to build response: {}", e);
                Error::Fatal
            })?);
    }

    let revision_id = RevisionId { revision_id };
    let Some(headshot) = extract_headshot(&state.db, user_id, revision_id).await? else {
        return Ok(Response::builder()
            .status(StatusCode::NO_CONTENT)
            .body(Body::empty())
            .map_err(|e| {
                eprintln!("Failed to build response: {}", e);
                Error::Fatal
            })?);
    };

    let image_data = Bytes::from(headshot.image_data);

    Ok(Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "image/jpeg")
        .body(Body::from(image_data))
        .map_err(|e| {
            eprintln!("Failed to build response: {}", e);
            Error::Fatal
        })?)
}

pub fn headshot_router() -> Router<AppState> {
    Router::new()
        .route("/:revision_id", get(get_headshot))
        .route("/", post(post_headshot))
}
