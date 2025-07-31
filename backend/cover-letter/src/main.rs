use anyhow::Context;
use cover_letter::app_state::*;
use cover_letter::credentials;
use cover_letter::rate_limit::RateLimiter;
use cover_letter::routes::*;
use sqlx::postgres::{PgConnectOptions, PgPool, PgPoolOptions};
use sqlx::ConnectOptions;
use std::collections::BTreeMap;
use std::net::SocketAddr;
use std::sync::Arc;
use std::sync::Mutex;
use tokio::net::TcpListener;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let database_url: url::Url =
        url::Url::parse(credentials::DATABASE_URL).expect("Failed to parse database URL.");
    let options: PgConnectOptions =
        ConnectOptions::from_url(&database_url).context("Failed to parse database URL.")?;
    let options = options
        .log_slow_statements(log::LevelFilter::Warn, std::time::Duration::from_secs(1))
        .log_statements(log::LevelFilter::Debug);
    let db: PgPool = PgPoolOptions::new()
        .max_connections(50)
        .connect_with(options)
        .await?;

    sqlx::migrate!().run(&db).await?;

    let stripe_client = stripe::Client::new(credentials::STRIPE_SECRET_KEY);

    let state = AppState {
        db,
        stripe_client,
        internal_sessions: Arc::new(Mutex::new(BTreeMap::new())),
        rate_limiter: Arc::new(RateLimiter::new()),
    };
    // TODO: get rid of passing the state in two distinct ways
    let router = root_router().with_state(state);

    let addr = SocketAddr::from(([0, 0, 0, 0], 3001));
    let listener = TcpListener::bind(&addr).await?;
    ///////////////
    // test URL parsing for debugging:
    // use serde_urlencoded;
    // use cover_letter::routes::generation::CoverLetterGenerationParameters;

    // let simulated_query = "wordCount=140&coverLetterKind=Standard";
    // let parsed: Result<CoverLetterGenerationParameters, _> = serde_urlencoded::from_str(simulated_query);
    ///////////////
    axum::serve(
        listener,
        router.into_make_service_with_connect_info::<SocketAddr>(),
    )
    .await
    .unwrap();
    Ok(())
}
