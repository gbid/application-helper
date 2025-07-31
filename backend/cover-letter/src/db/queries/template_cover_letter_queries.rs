use crate::model::{TemplateCoverLetter, TemplateCoverLetterId, UserId};
use crate::util::hash;
use sqlx::PgPool;
#[derive(Debug, Clone)]
pub struct NewTemplateCoverLetter {
    pub template_cover_letter_title: String,
    pub text_content: String,
}
/// Saves an uploaded cover letter to the database.
pub async fn save_template_cover_letter(
    UserId { user_id }: &UserId,
    cover_letter: &NewTemplateCoverLetter,
    exec: &PgPool,
) -> Result<Option<TemplateCoverLetterId>, sqlx::Error> {
    let NewTemplateCoverLetter {
        text_content,
        template_cover_letter_title,
    } = cover_letter;
    let hash = hash(text_content.as_bytes());
    // TODO: request this from openai in handler?
    sqlx::query_as! {
        // we return None on conflict of unique constraint (user_id, text_content_hash)
        TemplateCoverLetterId,
        r#"
        INSERT INTO template_cover_letter(
            user_id,
            text_content,
            text_content_hash,
            template_cover_letter_title
        )
        VALUES ($1, $2, $3, $4)
        -- ON CONFLICT (user_id, text_content_hash) DO NOTHING
        RETURNING template_cover_letter_id;
        "#,
        user_id,
        text_content,
        hash,
        template_cover_letter_title,
    }
    .fetch_optional(exec)
    .await
}

pub async fn get_template_cover_letter_by_content(
    user_id: &UserId,
    cover_letter: &str,
    exec: &PgPool,
) -> Result<Option<TemplateCoverLetter>, sqlx::Error> {
    let text_content_hash = hash(cover_letter.as_bytes());
    sqlx::query_as!(
        TemplateCoverLetter,
        r#"
        SELECT template_cover_letter_id, template_cover_letter_title, text_content, created_at, updated_at
        FROM template_cover_letter
        WHERE user_id = $1
        AND text_content_hash = $2;
        "#,
        user_id.user_id,
        text_content_hash,
    )
    .fetch_optional(exec)
    .await
}

pub async fn get_template_cover_letter_by_id(
    UserId { user_id }: &UserId,
    TemplateCoverLetterId {
        template_cover_letter_id,
    }: &TemplateCoverLetterId,
    exec: &PgPool,
) -> Result<TemplateCoverLetter, sqlx::Error> {
    sqlx::query_as!(
        TemplateCoverLetter,
        r#"
        SELECT template_cover_letter_id, template_cover_letter_title, text_content, created_at, updated_at
        FROM template_cover_letter
        WHERE user_id = $1
        AND template_cover_letter_id = $2;
        "#,
        user_id,
        template_cover_letter_id,
    )
    .fetch_one(exec)
    .await
}

pub async fn get_latest_template_cover_letter(
    UserId { user_id }: &UserId,
    exec: &PgPool,
) -> Result<Option<TemplateCoverLetter>, sqlx::Error> {
    sqlx::query_as!(
        TemplateCoverLetter,
        r#"
            SELECT
                template_cover_letter_id,
                template_cover_letter_title,
                text_content,
                template_cover_letter.created_at,
                updated_at
            FROM template_cover_letter
            JOIN application_parameters USING (template_cover_letter_id)
            WHERE template_cover_letter.user_id = $1
            ORDER BY application_parameters.created_at DESC
            LIMIT 1;
        "#,
        user_id,
    )
    .fetch_optional(exec)
    .await
}
