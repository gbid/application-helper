use crate::model::{CoverLetterLanguage, RevisionId, UserId, WordCount};
use crate::queries::FromDbString;

use super::get_template_cover_letter_by_id;

const DEFAULT_WORD_COUNT: i32 = 170;

pub struct CoverLetterGenerationInputDataFromDb {
    pub job_advert: Option<String>,
    pub resume_document: Option<Vec<u8>>,
    pub template_cover_letter: Option<String>,
    pub word_count: WordCount,
    pub language_override: Option<CoverLetterLanguage>,
    pub cover_letter_random_seed: Option<String>,
    pub cover_letter_text: Option<String>,
}
pub async fn get_cover_letter_input_data(
    db: &sqlx::PgPool,
    user_id: &UserId,
    revision_id: &RevisionId,
) -> Result<Option<CoverLetterGenerationInputDataFromDb>, sqlx::Error> {
    let query = sqlx::query!(
        r#"
        SELECT
            word_count,
            job_advert,
            template_cover_letter_id,
            language_override,
            COALESCE(resume.byte_content, NULL::bytea) AS resume_document,
            cover_letter_random_seed,
            cover_letter_text
        FROM
            application_parameters
        JOIN
            application USING (application_id)
        LEFT JOIN
            resume USING (resume_id)
        WHERE
            application.user_id = $1 AND
            revision_id = $2
        "#,
        user_id.user_id,
        revision_id.revision_id,
    );

    let qr = query.fetch_optional(db).await?;

    let row = match qr {
        Some(row) => row,
        None => {
            return Ok(None);
        }
    };

    let word_count: u32 = row
        .word_count
        .unwrap_or(DEFAULT_WORD_COUNT)
        .try_into()
        .expect("word count should an u32");
    let word_count = WordCount { word_count };

    let template_cover_letter = match row.template_cover_letter_id {
        Some(template_cover_letter_id) => {
            let template_cover_letter =
                get_template_cover_letter_by_id(&user_id, &template_cover_letter_id.into(), db)
                    .await?;
            Some(template_cover_letter.text_content)
        }
        None => None,
    };

    let language_override = row
        .language_override
        .map(|s| CoverLetterLanguage::from_db_string(s.as_str()));

    let input_data = CoverLetterGenerationInputDataFromDb {
        // TODO: Do we properly handle the case of an empty job advert later at the usage site of
        // CoverLetterGenerationInputData?
        job_advert: row.job_advert,
        resume_document: row.resume_document,
        template_cover_letter,
        word_count,
        cover_letter_random_seed: row.cover_letter_random_seed,
        language_override,
        cover_letter_text: row.cover_letter_text,
    };
    Ok(Some(input_data))
}

pub async fn save_cover_letter(
    db: &sqlx::PgPool,
    _user_id: &UserId,
    revision_id: &RevisionId,
    cover_letter_text: &str,
) -> Result<(), sqlx::Error> {
    sqlx::query!(
        r#"
        UPDATE application_parameters
        SET cover_letter_text = $1
        WHERE revision_id = $2
        "#,
        cover_letter_text,
        revision_id.revision_id,
    )
    .execute(db)
    .await?;
    Ok(())
}
