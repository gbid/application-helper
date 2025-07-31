use crate::core::model::UserId;
use chrono::{DateTime, Utc};
use dashmap::DashMap;
use std::sync::Arc;

#[derive(Clone, Debug)]
pub struct RateLimiter {
    ip_limits: Arc<DashMap<String, Vec<DateTime<Utc>>>>,
    user_limits: Arc<DashMap<UserId, Vec<DateTime<Utc>>>>,
}

impl RateLimiter {
    pub fn new() -> Self {
        RateLimiter {
            ip_limits: Arc::new(DashMap::new()),
            user_limits: Arc::new(DashMap::new()),
        }
    }
    // This also records the request.
    // TODO: should we separate the rate limiting from the recording?
    pub fn is_ip_rate_limited(&self, ip: &str) -> bool {
        let now = Utc::now();
        let one_week_ago = now - chrono::Duration::weeks(1);
        const MAX_ANONYMOUS_REQUESTS: usize = 6;

        self.ip_limits
            .entry(ip.to_string())
            .and_modify(|timestamps| {
                timestamps.retain(|&t| t > one_week_ago);
            })
            .or_insert_with(Vec::new);

        let count = self
            .ip_limits
            .get(ip)
            .map(|timestamps| timestamps.len())
            .unwrap_or(0);

        if count >= MAX_ANONYMOUS_REQUESTS {
            true
        } else {
            self.ip_limits
                .get_mut(ip)
                .map(|mut timestamps| timestamps.push(now));
            false
        }
    }

    pub fn is_user_rate_limited(&self, user_id: &UserId) -> bool {
        let now = Utc::now();
        let one_week_ago = now - chrono::Duration::weeks(1);

        const MAX_USER_REQUESTS: usize = 3;

        self.user_limits
            .entry(user_id.clone())
            .and_modify(|timestamps| {
                timestamps.retain(|&t| t > one_week_ago);
            })
            .or_insert_with(Vec::new);

        let count = self
            .user_limits
            .get(user_id)
            .map(|timestamps| timestamps.len())
            .unwrap_or(0);

        if count >= MAX_USER_REQUESTS {
            true
        } else {
            self.user_limits
                .get_mut(user_id)
                .map(|mut timestamps| timestamps.push(now));
            false
        }
    }
}
