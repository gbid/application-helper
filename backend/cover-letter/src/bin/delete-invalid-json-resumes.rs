use anyhow::{Context, Result};
use cover_letter::credentials;
use cover_letter::model::JsonResume;
use serde_json;
use sqlx::postgres::{PgConnectOptions, PgPool, PgPoolOptions};
use sqlx::ConnectOptions;

async fn clean_invalid_resumes(pool: &PgPool) -> Result<(), sqlx::Error> {
    let rows = sqlx::query!(
        "SELECT application_id, revision_id, json_resume FROM application_parameters WHERE json_resume IS NOT NULL"
    )
    .fetch_all(pool)
    .await?;

    let mut deleted_count = 0;
    let mut error_count = 0;

    for row in rows {
        let application_id = row.application_id;
        let revision_id = row.revision_id;
        let json_resume = row.json_resume.unwrap_or_default();

        match serde_json::from_str::<JsonResume>(&json_resume) {
            Ok(_) => {
                // Valid JSON, do nothing
            }
            Err(e) => {
                println!(
                    "Error deserializing resume for application_id {}, revision_id {}: {:?}",
                    application_id, revision_id, e
                );

                match sqlx::query!(
                    "DELETE FROM application_parameters WHERE application_id = $1 AND revision_id = $2",
                    application_id,
                    revision_id
                )
                .execute(pool)
                .await
                {
                    Ok(_) => {
                        deleted_count += 1;
                        println!("Deleted entry for application_id {}, revision_id {}", application_id, revision_id);
                    }
                    Err(e) => {
                        error_count += 1;
                        println!("Failed to delete entry for application_id {}, revision_id {}: {:?}", application_id, revision_id, e);
                    }
                }
            }
        }
    }

    println!(
        "Migration complete. Deleted {} entries. Encountered {} errors.",
        deleted_count, error_count
    );
    Ok(())
}

async fn run_migration() -> Result<(), Box<dyn std::error::Error>> {
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

    clean_invalid_resumes(&db).await?;
    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    run_migration().await
}
