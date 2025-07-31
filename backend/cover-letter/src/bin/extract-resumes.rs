use anyhow::Context;
use cover_letter::credentials;
use sqlx::postgres::{PgConnectOptions, PgPool, PgPoolOptions};
use sqlx::ConnectOptions;
use sqlx::Pool;
use sqlx::Postgres;
use tokio::fs::File;
use tokio::io::AsyncWriteExt;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let database_url: url::Url =
        url::Url::parse(credentials::DATABASE_URL).expect("Failed to parse database URL.");
    let options: PgConnectOptions =
        ConnectOptions::from_url(&database_url).context("Failed to parse database URL.")?;
    let db: PgPool = PgPoolOptions::new()
        .max_connections(3)
        .connect_with(options)
        .await?;

    write_resumes_to_filesystem(&db)
        .await
        .context("Failed to write resumes to filesystem.")
}
async fn write_resumes_to_filesystem(pool: &Pool<Postgres>) -> Result<(), sqlx::Error> {
    let resumes = sqlx::query!(
        r#"
        SELECT byte_content, file_path, user_id, created_at
        FROM resume
        "#
    )
    .fetch_all(pool)
    .await?;

    const OUTPUT_DIR: &str = "/tmp/exported-resumes";
    tokio::fs::create_dir_all(OUTPUT_DIR).await.unwrap();
    for resume in resumes {
        let file_path = format!(
            "{}/{}---{}.pdf",
            OUTPUT_DIR,
            resume.created_at.format("%Y-%m-%d"),
            resume.file_path,
        );

        let mut file = File::create(file_path).await.unwrap();
        file.write_all(&resume.byte_content).await.unwrap();
    }

    Ok(())
}
