use crate::core::app_state::*;
use crate::core::error::LogErrAndFatal;
use crate::core::model::{UserId, UserType};
use crate::db::queries::{self, *};
use crate::utils::send_mail::*;
use crate::web::session::*;
use crate::ROOT_URL;

use axum::extract::{Path, State};
use axum::response;
use axum::response::IntoResponse;
use axum::response::Redirect;
use axum::response::Response;
use axum::routing::get;
use axum::routing::post;
use axum::Json;

use axum::http::StatusCode;
use axum::Router;
use chrono::Duration;
use maud::html;

use rand::random;
use serde::Deserialize;

async fn send_signin_mail(email: &str, signin_token: &SigninToken) -> Result<(), ()> {
    use lettre::message::header::ContentType;
    use lettre::Message;

    let signin_token: &str = &signin_token.0;
    let signin_url = format!("{ROOT_URL}/api/signin/mail/{signin_token}");

    let message = Message::builder()
        .from(from_mailbox())
        .reply_to(reply_to_mailbox())
        .to(email.parse().unwrap())
        .subject("Anmeldung bei Bewerbungshelfer.net")
        .header(ContentType::TEXT_HTML)
        .body(
            html! {
                (maud::DOCTYPE)
                html {
                    head {
                        title {
                            "Anmeldung bei Bewerbungshelfer.net"
                        }
                    }
                    body {
                        h1 {
                            "Willkommen zurück!"
                        }
                        p {
                            "Klicken Sie auf den folgenden Link, um sich anzumelden:"
                        }
                        p {
                            a href=(signin_url) {
                                "Anmelden"
                            }
                        }
                        p {
                            "Beachten Sie, dass der Link nur kurze Zeit gültig ist. "
                            "Sie können jederzeit einen neuen Link auf "
                            a href=(format!("{ROOT_URL}/signin")) {
                                "bewerbungshelfer.net/signin"
                            }
                            " anfordern."

                        }
                    }
                }
            }
            .into_string(),
        )
        .unwrap();

    send_mail(message).await?;

    Ok(())
}

fn generate_signin_token() -> SigninToken {
    // 128 bits of randomness:
    let binary_token: [u8; 16] = random();
    let hex_token = base16ct::lower::encode_string(binary_token.as_slice());
    SigninToken(hex_token)
}

#[derive(Debug, Deserialize)]
pub struct Signin {
    pub email: String,
}

pub async fn post_signin(
    State(state): State<AppState>,
    Json(Signin { email }): Json<Signin>,
) -> response::Result<StatusCode> {
    let user_id: UserId = match get_user(email.as_str(), &state.db)
        .await
        // log error to stderr and return 500
        .log_and_fatal()?
    {
        None => {
            return Err(StatusCode::NOT_FOUND.into());
        }
        Some(user_id) => user_id,
    };

    let token = generate_signin_token();
    add_signin_pending(user_id, &token, &state.db)
        .await
        .log_and_fatal()?;
    send_signin_mail(email.as_str(), &token)
        .await
        .map_err(|()| StatusCode::INTERNAL_SERVER_ERROR)?;
    Ok(StatusCode::ACCEPTED)
}

async fn get_mail_token(
    State(state): State<AppState>,
    session: Option<AnonymousSession>,
    Path(token): Path<String>,
) -> response::Result<Response> {
    let token_expired_error = (StatusCode::GONE, "Token expired. Sign in again");

    let token = SigninToken(token);
    let user_id = match get_signin_pending(&token, &state.db)
        .await
        .log_and_fatal()?
    {
        Some(SigninPending {
            user_id,
            created_at,
        }) => {
            let now = chrono::Local::now();
            if now - created_at > Duration::minutes(15) {
                return Err(token_expired_error.into());
            }
            user_id
        }
        None => {
            return Err(token_expired_error.into());
        }
    };

    if let Some(session) = session {
        match session.user_type {
            UserType::Standard | UserType::Subscribed => {
                // TODO: The existing old session cookie will be overwritten with the new session anyway,
                // but we should also delete the existing session in the database.
            }
            UserType::Anonymous => {
                // start transaction
                let mut transaction = state.db.begin().await.log_and_fatal()?;
                queries::merge_users(user_id, session.user_id, &mut transaction)
                    .await
                    .log_and_fatal()?;
                transaction.commit().await.log_and_fatal()?;
            }
        }
    }

    let mut response = Redirect::to("/").into_response();
    begin_new_session(user_id, &mut response, &state).await;
    Ok(response)
}

pub fn signin_router() -> Router<AppState> {
    Router::new()
        // we can test this route with curl as follows:
        // curl -X POST -H "Content-Type: application/json" -d '{"email": "mail@bidlingmaier.net"}' http://localhost:3000/api/signin
        .route("/", post(post_signin))
        .route("/mail/:token", get(get_mail_token))
}
