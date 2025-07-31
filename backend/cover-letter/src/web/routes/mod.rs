mod health;
mod resume;
mod resume_html;
mod session;
mod signin;
mod signout;
mod signup;
// TODO: make non-public
mod anonymous_session;
mod applicant_address;
mod application;
mod application_title;
mod chat;
mod company_address;
mod cover_letter;
mod dummy;
mod feedback;
mod headshot;
mod headshot_generation;
mod json_resume;
mod pdf_cover_letter;
mod pdf_resume;
mod signature;
mod stripe;
mod template_cover_letter;
mod user_type;

use anonymous_session::*;
use applicant_address::*;
use application::*;
use application_title::*;
use chat::chat_response_router;
use company_address::*;
use dummy::dummy_router;
use feedback::*;
use headshot::*;
use headshot_generation::headshot_generation_router;
use health::*;
use hyper::{StatusCode, Uri};
use pdf_cover_letter::*;
use pdf_resume::*;
use reqwest::Client;
use resume::*;
use resume_html::*;
use session::*;
use signature::signature_router;
use signin::*;
use signout::*;
use signup::*;
use stripe::stripe_router;
use template_cover_letter::template_cover_letter_router;
use user_type::user_type_router;

use axum::{http::response, response::Response, Router};

use crate::core::app_state::AppState;

use self::{cover_letter::cover_letter_router, json_resume::json_resume_router};

pub async fn frontend_fallback(uri: Uri) -> response::Response<axum::body::Body> {
    let client = Client::new();

    let new_uri = format!(
        "http://localhost:3000{}",
        uri.path_and_query().map(|pq| pq.as_str()).unwrap_or("")
    );

    // TODO: It'd be better to stream the response we receive here directly. Instead, we're
    // buffering the whole response here and only then begin sending it to the client. This adds
    // some latency, but since this is all in developmenton only it should be OK.
    match client.get(new_uri).send().await {
        Ok(response) => {
            match response.bytes().await {
                Ok(body) => Response::builder()
                    // TODO: It'd be better to send the same status that we received.
                    // Unfortunately, the reqwest and hyper status types appear to be incompatible,
                    // so this would require implementing a conversion between those types.
                    .status(StatusCode::OK)
                    .body(axum::body::Body::from(body))
                    .unwrap(),
                Err(_) => Response::builder()
                    // TODO: It'd be better to send the same status that we received.
                    .status(StatusCode::INTERNAL_SERVER_ERROR)
                    .body(axum::body::Body::empty())
                    .unwrap(),
            }
        }
        Err(_) => Response::builder()
            // TODO: It'd be better to send the same status that we received.
            .status(StatusCode::INTERNAL_SERVER_ERROR)
            .body(axum::body::Body::empty())
            .unwrap(),
    }
}

pub fn root_router() -> Router<AppState> {
    let api_router = Router::new()
        .nest("/signout", signout_router())
        .nest("/signup", signup_router())
        .nest("/signin", signin_router())
        .nest("/session", session_router())
        .nest("/anonymous-session", anonymous_session_router())
        .nest("/application", application_router())
        .nest("/application-title", application_title_router())
        .nest("/resume-html", resume_html_router())
        .nest("/template-cover-letter", template_cover_letter_router())
        .nest("/feedback", feedback_router())
        .nest("/resume", resume_router())
        .nest("/health", health_router())
        .nest("/stripe", stripe_router())
        .nest("/user-type", user_type_router())
        .nest("/dummy", dummy_router())
        .nest("/cover-letter", cover_letter_router())
        .nest("/pdf-cover-letter", pdf_cover_letter_router())
        .nest("/applicant-address", applicant_address_router())
        .nest("/company-address", company_address_router())
        .nest("/json-resume", json_resume_router())
        .nest("/pdf-resume", pdf_resume_router())
        .nest("/headshot", headshot_router())
        .nest("/headshot-generation", headshot_generation_router())
        .nest("/chat", chat_response_router())
        .nest("/signature", signature_router());

    let router = Router::new().nest("/api", api_router);

    // In production, the backend server is responsible only for serving the API. An nginx instance
    // forwards requests either to the backend or serves the frontend from the file system.
    //
    // In development, the backend server also serves frontend files so that we don't need an nginx
    // instance.
    #[cfg(all(not(feature = "production"), not(feature = "integration")))]
    let router = router.fallback(frontend_fallback);

    router
}
