use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::response::{self, Redirect, Response};
use chrono::Duration;

use crate::core::app_state::*;
use crate::core::error::LogErrAndFatal;
use crate::db::queries::*;
use crate::web::session::*;

#[derive(serde::Deserialize)]
pub struct ConfirmQuery {
    pub redirect: String,
}

pub async fn confirm_token(
    State(state): State<AppState>,
    Path(token): Path<String>,
    Query(ConfirmQuery { redirect }): Query<ConfirmQuery>,
) -> response::Result<Response> {
    let token_expired_error = (StatusCode::GONE, "Token expired. Sign up again");

    let token = SignupConfirmationToken(token);

    let confirmed_user = match get_signup_confirmation_pending(&token, &state.db)
        .await
        .log_and_fatal()?
    {
        Some(SignupConfirmationPending {
            user_id,
            created_at,
        }) => {
            let now = chrono::Local::now();
            if now - created_at > Duration::hours(1) {
                return Err(token_expired_error.into());
            }
            user_id
        }
        None => {
            return Err(token_expired_error.into());
        }
    };

    add_signup_confirmation(confirmed_user, &state.db)
        .await
        .log_and_fatal()?;

    let mut response = Redirect::to(&redirect).into_response();
    begin_new_session(confirmed_user, &mut response, &state).await;
    Ok(response)
}
