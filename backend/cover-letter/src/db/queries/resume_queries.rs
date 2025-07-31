use crate::model::{NewResume, ResumeId, ResumeInfo, UserId};
use sqlx::{query_as, Executor, PgPool, Postgres};
use std::path::PathBuf;
use uuid::Uuid;

pub async fn save_or_get_resume(
    db: &PgPool,
    user_id: &UserId,
    NewResume {
        byte_content,
        size,
        file_path,
    }: &NewResume,
) -> Result<ResumeId, sqlx::Error> {
    // Try to insert the resume using save_resume
    // If it already exists, make another query to get the resume_id
    // TODO: we removed the unique constraint on user_id, byte_content_hash
    // to merge users without having to (recursively) update foreign keys.
    // Therefore, we need to explicitly check if a resume with byte_content_hash
    // already exists for the user:

    // TODO: Shouldn't the hash be calcuated based also on the file path?
    let byte_content_hash = crate::util::hash(&byte_content);

    let existing_resume = query_as!(
        ResumeId,
        r#"
        SELECT resume_id
        FROM resume
        WHERE
            user_id = $1
            AND byte_content_hash = $2
        "#,
        user_id.user_id,
        byte_content_hash
    )
    .fetch_optional(db)
    .await?;

    if let Some(resume_id) = existing_resume {
        return Ok(resume_id);
    } else {
        let resume_id = query_as!(
            ResumeId,
            r#"
            INSERT
                INTO resume
                    (user_id, byte_content, byte_content_hash, size, file_path)
                VALUES
                    ($1, $2, $3, $4, $5)
                -- ON CONFLICT
                --     (user_id, byte_content_hash)
                --     DO NOTHING
                RETURNING resume_id;
            "#,
            user_id.user_id,
            byte_content,
            byte_content_hash,
            size,
            // convert to string
            file_path.to_str().unwrap()
        )
        .fetch_one(db)
        .await?;
        Ok(resume_id)
    }
}

pub async fn get_resume(
    UserId { user_id }: &UserId,
    ResumeId { resume_id }: &ResumeId,
    exec: impl Executor<'_, Database = Postgres>,
) -> Result<Option<(ResumeInfo, Vec<u8>)>, sqlx::Error> {
    let qr = sqlx::query!(
        r#"
        SELECT resume_id, user_id, size, file_path, updated_at, created_at, byte_content
        FROM resume
        WHERE
            user_id = $1
            AND
            resume_id = $2;
    "#,
        user_id,
        resume_id
    )
    .fetch_optional(exec)
    .await?;

    Ok(qr.map(|row| {
        let flat_resume_info = FlatResumeInfo {
            resume_id: row.resume_id,
            user_id: row.user_id,
            size: row.size,
            file_path: Some(row.file_path),
            updated_at: row.updated_at,
            created_at: row.created_at,
        };
        (flat_resume_info.into(), row.byte_content)
    }))
}

pub async fn get_resume_info(
    exec: impl Executor<'_, Database = Postgres>,
    UserId { user_id }: &UserId,
    ResumeId { resume_id }: &ResumeId,
) -> Result<ResumeInfo, sqlx::Error> {
    let qr = sqlx::query_as! {
        FlatResumeInfo,
        r#"
        SELECT resume_id, user_id, size, file_path, updated_at, created_at
        FROM resume
        WHERE
            user_id = $1
            AND
            resume_id = $2;
        "#,
        user_id, resume_id
    }
    .fetch_one(exec)
    .await?;
    Ok(qr.into())
}

pub async fn get_latest_resume_info(
    UserId { user_id }: &UserId,
    exec: impl Executor<'_, Database = Postgres>,
) -> Result<Option<ResumeInfo>, sqlx::Error> {
    let qr = sqlx::query! {"
        SELECT resume_id, user_id, size, file_path, updated_at, created_at
        FROM resume
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT 1;
    ", user_id}
    .fetch_optional(exec)
    .await?;

    Ok(qr.map(|row| {
        let flat_resume_info = FlatResumeInfo {
            resume_id: row.resume_id,
            user_id: row.user_id,
            size: row.size,
            file_path: Some(row.file_path),
            updated_at: row.updated_at,
            created_at: row.created_at,
        };
        flat_resume_info.into()
    }))
}

/// An internal helper struct to deserialize a [DocumentInfo] from query results.
///
/// The fields in this struct correspond directly to the columns of query. There is an [Into]
/// instance that converts to `DocumentInfo`.
#[derive(Debug, Clone, Hash, PartialEq, Eq, PartialOrd, Ord)]
struct FlatResumeInfo {
    pub resume_id: Uuid,
    pub user_id: Uuid,
    pub size: i32,
    pub file_path: Option<String>,
    // TODO: is this the correct Time type?
    pub updated_at: Option<chrono::DateTime<chrono::Utc>>,
    pub created_at: chrono::DateTime<chrono::Utc>,
}

impl Into<ResumeInfo> for FlatResumeInfo {
    fn into(self) -> ResumeInfo {
        let FlatResumeInfo {
            resume_id,
            user_id: _,
            size,
            file_path,
            updated_at,
            created_at,
        } = self;
        let size: u64 = size.try_into().unwrap();
        let resume_id = ResumeId { resume_id };
        let file_path = PathBuf::from(file_path.expect("Got no file_path from database."));
        ResumeInfo {
            resume_id,
            size,
            file_path,
            updated_at,
            created_at,
        }
    }
}
