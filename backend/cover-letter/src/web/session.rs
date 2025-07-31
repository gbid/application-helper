use std::net::SocketAddr;
use std::time::Duration;

use async_trait::async_trait;
use axum::extract::ConnectInfo;
use axum::extract::FromRequestParts;
// use axum::headers::Cookie;
// use axum_::Cookie;
use axum::http::header::SET_COOKIE;
use axum::http::request;
use axum::http::HeaderValue;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::response::Response;
use axum_extra::extract::cookie::CookieJar;
use tokio::time::sleep;

use crate::core::app_state::*;
use crate::core::error::LogErrAndFatal;
use crate::core::model::SessionToken;
use crate::core::model::SessionTokenHash;
use crate::core::model::{SubscriptionStatus, UserId, UserType};
use crate::db::queries::{self, *};
use rand::random;
use sha2::{Digest, Sha256};

fn generate_session_token() -> SessionToken {
    // 256 bits of randomness:
    let binary_token: [u8; 16] = random();
    let hex_token = base16ct::lower::encode_string(binary_token.as_slice());
    SessionToken(hex_token)
}

fn hash_session_token(token: &SessionToken) -> SessionTokenHash {
    let hash_binary = Sha256::digest(&token.0);
    let hash_hex = base16ct::lower::encode_string(hash_binary.as_slice());
    SessionTokenHash(hash_hex)
}

const SESSION_COOKIE_NAME: &'static str = "session";
const INTERNAL_SESSION_COOKIE_NAME: &'static str = "internal_session";
const USER_COOKIE_NAME: &'static str = "user";

/// Generates a new session and attaches it to a [Response].
pub async fn begin_new_session(user_id: UserId, response: &mut Response, state: &AppState) {
    let session_token = generate_session_token();
    let session_token_hash = hash_session_token(&session_token);

    add_session(user_id, &session_token_hash, &state.db).await;

    // TODO: Should also set `Secure` for production, but then it won't work with http on
    // localhost.
    let session_token = &session_token.0;
    let token_cookie_header_value: HeaderValue =
        format!("{SESSION_COOKIE_NAME}={session_token}; Path=/; HttpOnly; SameSite=Lax")
            .parse()
            .unwrap();

    let user_type = get_user_type(user_id, state).await;
    // directly calling serde_json::to_string escapes the string, which is not what we want.
    let user_cookie_value: serde_json::Value =
        serde_json::to_value(&user_type).expect("User type must be serializable");
    let user_cookie_header_value: HeaderValue = format!(
        "{}={}; Path=/; SameSite=Lax",
        USER_COOKIE_NAME,
        user_cookie_value
            .as_str()
            .expect("User type must deserialize to a string")
    )
    .parse()
    .unwrap();

    let headers = response.headers_mut();
    headers.append(SET_COOKIE, token_cookie_header_value);
    headers.append(SET_COOKIE, user_cookie_header_value);
}

pub async fn begin_new_internal_session(user_id: UserId, state: &AppState) -> SessionToken {
    let session_token = generate_session_token();
    let session_token_hash = hash_session_token(&session_token);

    state
        .internal_sessions
        .lock()
        .expect("Mutex should always work")
        .insert(session_token_hash.clone(), user_id);

    let state = state.clone();

    tokio::spawn(async move {
        const INTERNAL_SESSION_TIMEOUT: Duration = Duration::from_secs(60);
        sleep(INTERNAL_SESSION_TIMEOUT).await;
        state
            .internal_sessions
            .lock()
            .expect("Mutex should always work")
            .remove(&session_token_hash);
    });

    session_token
}

pub fn unset_session(response: &mut Response) {
    for cookie_name in [SESSION_COOKIE_NAME, USER_COOKIE_NAME] {
        let header_value: HeaderValue = format!(
            "{cookie_name}=deleted; Path=/; SameSite=Lax; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        )
        .parse()
        .unwrap();
        response.headers_mut().append(SET_COOKIE, header_value);
    }
}

/// An axum extractor that extracts a potentially tentative session from request headers.
pub struct AnonymousSession {
    pub user_id: UserId,
    pub token_hash: SessionTokenHash,
    pub user_type: UserType,
}

#[async_trait]
impl FromRequestParts<AppState> for AnonymousSession {
    type Rejection = Response;

    async fn from_request_parts(
        parts: &mut request::Parts,
        state: &AppState,
    ) -> Result<Self, Self::Rejection> {
        let err = || -> Response {
            let mut response = StatusCode::FORBIDDEN.into_response();
            unset_session(&mut response);
            response
        };

        let ConnectInfo(_socket_addr): ConnectInfo<SocketAddr> =
            ConnectInfo::from_request_parts(parts, state)
                .await
                .expect("The address of the client should always be available.");

        // TODO
        let cookie_jar = CookieJar::from_request_parts(parts, state)
            .await
            .map_err(|_| err())?;

        let session_cookie = cookie_jar.get(SESSION_COOKIE_NAME);
        let internal_session_cookie = cookie_jar.get(INTERNAL_SESSION_COOKIE_NAME);

        let session: AnonymousSession = match (session_cookie, internal_session_cookie) {
            (Some(_), Some(_)) => {
                return Err(err());
            }
            (None, None) => {
                eprintln!("Missing session cookie");
                return Err(err());
            }
            (Some(session_cookie), None) => {
                let session_token = SessionToken(session_cookie.value().to_owned());
                let token_hash = hash_session_token(&session_token);
                let sqlx_res = get_session(&token_hash, &state.db).await;
                let opt_session: Option<SessionFromDatabase> =
                    sqlx_res.log_and_fatal().map_err(|_| err())?;
                let SessionFromDatabase {
                    user_id,
                    created_at,
                    ..
                } = opt_session.ok_or_else(err)?;

                let user_type = get_user_type(user_id, state).await;
                match user_type {
                    UserType::Anonymous => {
                        let now = chrono::Local::now();
                        let session_age = now - created_at;
                        if session_age.num_hours() > 24 {
                            unset_session(&mut err());
                            return Err(err());
                        }
                    }
                    UserType::Standard | UserType::Subscribed => {}
                };

                AnonymousSession {
                    user_id,
                    token_hash,
                    user_type,
                }
            }
            (None, Some(internal_session_cookie)) => {
                let session_token = SessionToken(internal_session_cookie.value().to_owned());
                let token_hash = hash_session_token(&session_token);
                let user_id = state
                    .internal_sessions
                    .lock()
                    .expect("Mutex should always work")
                    .get(&token_hash)
                    .ok_or_else(err)?
                    .clone();
                let user_type = get_user_type(user_id, state).await;

                AnonymousSession {
                    user_id,
                    token_hash,
                    user_type,
                }
            }
        };

        Ok(session)
    }
}

async fn get_user_type(user_id: UserId, state: &AppState) -> UserType {
    let email = queries::get_email_address(user_id, &state.db)
        .await
        .log_and_fatal()
        .unwrap();

    let subscription_status = queries::get_subscription_status(user_id, &state.db)
        .await
        .log_and_fatal()
        .unwrap();

    match (email, subscription_status) {
        (None, _) => UserType::Anonymous,
        (Some(_), Some(SubscriptionStatus::Active)) => UserType::Subscribed,
        (Some(_), Some(SubscriptionStatus::Inactive)) | (Some(_), None) => UserType::Standard,
    }
}

pub struct Session {
    pub user_id: UserId,
    pub token_hash: SessionTokenHash,
}

#[async_trait]
impl FromRequestParts<AppState> for Session {
    type Rejection = Response;

    async fn from_request_parts(
        parts: &mut request::Parts,
        state: &AppState,
    ) -> Result<Self, Self::Rejection> {
        let AnonymousSession {
            user_id,
            token_hash,
            user_type,
        } = AnonymousSession::from_request_parts(parts, state).await?;
        match user_type {
            UserType::Anonymous => Err(StatusCode::FORBIDDEN.into_response()),
            UserType::Standard | UserType::Subscribed => Ok(Session {
                user_id,
                token_hash,
            }),
        }
    }
}

pub struct SubscribedSession {
    pub user_id: UserId,
}

#[async_trait]
impl FromRequestParts<AppState> for SubscribedSession {
    type Rejection = Response;

    async fn from_request_parts(
        parts: &mut request::Parts,
        state: &AppState,
    ) -> Result<Self, Self::Rejection> {
        let AnonymousSession {
            user_id,
            token_hash: _,
            user_type,
        } = AnonymousSession::from_request_parts(parts, state).await?;
        match user_type {
            UserType::Subscribed => Ok(SubscribedSession { user_id }),
            UserType::Standard | UserType::Anonymous => Err(StatusCode::FORBIDDEN.into_response()),
        }
    }
}
