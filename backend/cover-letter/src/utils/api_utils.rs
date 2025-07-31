use sha2::{Digest, Sha256};
use std::cmp::max;
use std::fs;
use std::io::Write;
use std::ops::DerefMut;
use std::path::PathBuf;
use std::sync::{Mutex, MutexGuard};
use std::time::{Duration, Instant};
use tempfile::NamedTempFile;
use tokio::sync::{Semaphore, SemaphorePermit};
use tokio::time::{sleep_until, Instant as TokioInstant};

#[derive(Debug, Clone)]
pub struct RateLimitInfo {
    pub last_request_instant: Instant,
    pub request_count: usize,
}

pub struct ApiUtils {
    cache_dir: PathBuf,
    request_permits: Semaphore,
    last_rate_limit: Mutex<Option<RateLimitInfo>>,
    rate_limited_duration_base: Duration,
}

impl ApiUtils {
    pub fn new(
        cache_dir: PathBuf,
        max_requests: usize,
        rate_limited_duration_base: Duration,
    ) -> Self {
        Self {
            cache_dir,
            request_permits: Semaphore::new(max_requests),
            last_rate_limit: Mutex::new(None),
            rate_limited_duration_base,
        }
    }
    pub fn cache_path_for_request(&self, request_slices: &[&[u8]]) -> PathBuf {
        let mut hasher = Sha256::new();
        for slice in request_slices {
            hasher.update(slice);
        }
        let binary_digest = hasher.finalize();
        let hex_digest = base16ct::lower::encode_string(binary_digest.as_slice());
        self.cache_dir.join(hex_digest)
    }

    pub async fn get_cached(&self, request_slices: &[&[u8]]) -> Option<String> {
        let cache_path = self.cache_path_for_request(request_slices);
        let cache_response_path = cache_path.join("response.json");
        if cache_response_path.is_file() {
            fs::read_to_string(cache_response_path).ok()
        } else {
            None
        }
    }

    pub async fn put_cached(&self, request_slices: &[&[u8]], response_body: &[u8]) {
        let cache_path = self.cache_path_for_request(request_slices);
        fs::create_dir_all(cache_path.as_path()).unwrap();

        // For debugging/reproduction purposes, we might want to store the original request
        let cache_request_path = cache_path.join("request.json");
        let mut request_file = fs::File::create(cache_request_path).unwrap();
        for slice in request_slices {
            request_file.write_all(slice).unwrap();
        }

        let cache_response_path = cache_path.join("response.json");
        let mut tmp_cache_response_file =
            NamedTempFile::with_prefix_in("response.json", cache_path.as_path()).unwrap();

        tmp_cache_response_file
            .as_file_mut()
            .write_all(response_body)
            .unwrap();
        tmp_cache_response_file.as_file_mut().sync_all().unwrap();

        tmp_cache_response_file
            .persist(cache_response_path)
            .unwrap();
    }

    pub async fn sleep_if_rate_limited(&self) -> Option<RateLimitInfo> {
        loop {
            let rate_limit_info: Option<RateLimitInfo> =
                self.last_rate_limit.lock().unwrap().clone();
            let RateLimitInfo {
                last_request_instant,
                request_count,
            } = match &rate_limit_info {
                None => return None,
                Some(rate_limit_info) => rate_limit_info,
            };

            let rate_limit_duration_multiplier: u32 = (0..request_count - 1).map(|_| 2).product();
            let rate_limit_duration =
                rate_limit_duration_multiplier * self.rate_limited_duration_base;
            let rate_limit_over_instant = *last_request_instant + rate_limit_duration;

            let now = Instant::now();
            if rate_limit_over_instant <= now {
                return rate_limit_info;
            }

            sleep_until(TokioInstant::from_std(rate_limit_over_instant)).await;
        }
    }

    pub fn record_no_rate_limit(&self) {
        *self.last_rate_limit.lock().unwrap().deref_mut() = None;
    }

    pub fn record_rate_limit(&self, existing_rate_limit: Option<RateLimitInfo>) {
        let mut active_rate_limit_guard: MutexGuard<Option<RateLimitInfo>> =
            self.last_rate_limit.lock().unwrap();
        let now = Instant::now();

        match (existing_rate_limit, active_rate_limit_guard.deref_mut()) {
            (None, None) | (Some(_), None) => {
                *active_rate_limit_guard = Some(RateLimitInfo {
                    last_request_instant: now,
                    request_count: 1,
                });
            }
            (None, Some(active_rate_limit)) => {
                active_rate_limit.last_request_instant = now;
            }
            (Some(existing_rate_limit), Some(active_rate_limit)) => {
                active_rate_limit.last_request_instant = now;
                active_rate_limit.request_count = max(
                    existing_rate_limit.request_count + 1,
                    active_rate_limit.request_count,
                );
            }
        }
    }

    pub async fn acquire_permit(&self) -> SemaphorePermit {
        self.request_permits.acquire().await.unwrap()
    }
}
