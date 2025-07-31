use crate::core::app_state::AppState;
use axum::extract::State;
use axum::Router;

async fn health_handler(_state: State<AppState>) -> &'static str {
    "OK"
}

pub fn health_router() -> Router<AppState> {
    axum::Router::new().route("/", axum::routing::get(health_handler))
}
