mod confirm;

use std::str::FromStr;

use lettre::Address;
use serde::Deserialize;

use axum::{
    extract::State,
    http::StatusCode,
    response::{self, IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};
use maud::html;

use crate::core::app_state::*;
use crate::core::error::LogErrAndFatal;
use crate::core::model::UserType;
use crate::db::queries::*;
use crate::utils::send_mail::*;
use crate::web::session::*;
use crate::ROOT_URL;
use rand::random;
use urlencoding::encode;

use confirm::*;

fn generate_signup_token() -> SignupConfirmationToken {
    // 128 bits of randomness:
    let binary_token: [u8; 16] = random();
    let hex_token = base16ct::lower::encode_string(binary_token.as_slice());
    SignupConfirmationToken(hex_token)
}

pub fn signup_router() -> Router<AppState> {
    Router::new()
        .route("/", post(signup))
        .route("/confirm/:token", get(confirm_token))
}

pub async fn send_confirm_mail(
    email: Address,
    signup_token: &SignupConfirmationToken,
    redirect_target: &str,
) -> Result<(), ()> {
    use lettre::message::header::ContentType;
    use lettre::Message;

    let signup_token: &str = &signup_token.0;
    let confirm_url = format!("{ROOT_URL}/api/signup/confirm/{signup_token}");

    let encoded_redirect_target = encode(redirect_target);
    let redirect_confirm_url = format!("{}?redirect={}", confirm_url, encoded_redirect_target);

    let message = Message::builder()
        .from(from_mailbox())
        .reply_to(reply_to_mailbox())
        // TODO: We shouldn't crash here for an invalid email. Instead, move parsing the email
        // address up the call stack so that it doesn't even get into the database.
        .to(email.into())
        .subject("Bestätigen Sie Ihre Registrierung")
        .header(ContentType::TEXT_HTML)
        .body(
            html! {
                (maud::DOCTYPE)
                html {
                    head {
                        title {
                            "Registrierung bei Bewerbungshelfer.net"
                        }
                    }
                    body {
                        h1 {
                            "Willkommen bei Bewerbungshelfer.net!"
                        }
                        p {
                            "Vielen Dank für Ihre Registrierung bei Bewerbungshelfer.net. "
                            "Bitte bestätigen Sie Ihre Emailadresse, indem Sie auf den folgenden Link klicken: "
                        }
                        p {
                            a href=(redirect_confirm_url) {
                                "Registrierung bestätigen"
                            }
                        }
                        p {
                            "Falls Sie sich nicht bei Bewerbungshelfer registriert haben, können Sie diese Email ignorieren."
                        }
                    }
                }
            }.into_string()
        )
        .unwrap();

    send_mail(message).await.map_err(|err| {
        eprintln!("Failed to send signup email");
        err
    })?;

    Ok(())
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Signup {
    pub email: String,
    pub privacy_policy_check: bool,
    pub redirect_target: Option<String>,
}

#[axum_macros::debug_handler]
pub async fn signup(
    State(state): State<AppState>,
    session: Option<AnonymousSession>,
    Json(signup): Json<Signup>,
) -> response::Result<Response> {
    let Signup {
        email,
        privacy_policy_check,
        redirect_target,
    } = signup;

    let email =
        Address::from_str(email.as_str()).map_err(|_| StatusCode::BAD_REQUEST.into_response())?;

    if !privacy_policy_check {
        return Err(StatusCode::BAD_REQUEST.into());
    }

    let mut transaction = state.db.begin().await.expect("Db should work");

    let user_count = count_users(&mut *transaction).await;
    const USER_LIMIT: usize = 1_000_000;
    if user_count >= USER_LIMIT {
        insert_user_interest(&email, &mut *transaction).await;
        transaction.commit().await.unwrap();
        return Err(StatusCode::GONE.into());
    }

    let user_id = match session {
        Some(AnonymousSession {
            user_id,
            user_type: UserType::Anonymous,
            ..
        }) => {
            match update_user_email(user_id, &email, &mut *transaction)
                .await
                .log_and_fatal()?
            {
                Some(user_id) => user_id,
                None => {
                    // User exists already.
                    return Err(StatusCode::CONFLICT.into());
                }
            }
        }
        Some(AnonymousSession {
            user_type: UserType::Standard,
            ..
        })
        | Some(AnonymousSession {
            user_type: UserType::Subscribed,
            ..
        }) => {
            return Err(StatusCode::CONFLICT.into());
        }
        None => {
            // the user has no session
            let user_id = match insert_user(&email, &mut *transaction)
                .await
                .log_and_fatal()?
            {
                Some(user_id) => user_id,
                None => {
                    // User exists already.
                    return Err(StatusCode::CONFLICT.into());
                }
            };
            user_id
        }
    };

    record_consent(user_id, &mut *transaction)
        .await
        .log_and_fatal()?;

    let signup_token = generate_signup_token();
    add_signup_confirmation_token(user_id, &signup_token, &mut *transaction).await;

    let redirect_target = redirect_target.unwrap_or_else(|| "/".to_string());
    send_confirm_mail(email, &signup_token, &redirect_target)
        .await
        .map_err(|()| StatusCode::INTERNAL_SERVER_ERROR)?;

    // TODO: Could we get a constraint error on the email column here in case of concurrent
    // signups?
    transaction.commit().await.expect("db should work");

    let response = StatusCode::ACCEPTED.into_response();
    // begin_new_session(user_id, SessionType::Tentative, &mut response, &state).await;

    Ok(response)
}
