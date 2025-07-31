use std::{
    collections::BTreeMap,
    sync::{Arc, Mutex},
};

use sqlx::PgPool;
use stripe::Client;

use crate::core::model::{SessionTokenHash, UserId};
use crate::utils::rate_limit::RateLimiter;

#[derive(Clone)]
pub struct AppState {
    pub db: PgPool,
    pub stripe_client: Client,
    pub internal_sessions: Arc<Mutex<BTreeMap<SessionTokenHash, UserId>>>,
    pub rate_limiter: Arc<RateLimiter>,
}
