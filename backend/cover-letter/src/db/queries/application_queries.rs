use crate::error::{Error, LogErrAndFatal as _};
use crate::model::HeadshotId;
use crate::model::{
    ApplicantAddress, Application, ApplicationId, ApplicationParameters, CompanyAddress,
    CoverLetterLanguage, ResumeId, ResumeInfo, Revision, RevisionId, TemplateCoverLetter,
    TemplateCoverLetterId, UserId, WordCount,
};
use crate::queries;
use crate::queries::FromDbString;
use crate::queries::ToDbString;
use sqlx::PgPool;
use uuid::Uuid;

// Creates an application and inserts
// a corresponding new default chat log into the chat_log table.
// Executes both as a transaction.
pub async fn create_application(
    db: &PgPool,
    user_id: &UserId,
) -> Result<ApplicationId, sqlx::Error> {
    let mut transaction = db.begin().await?;

    let application_id = sqlx::query_as!(
        ApplicationId,
        r#"
        INSERT INTO application
            (user_id)
        VALUES
            ($1)
        RETURNING
            application_id
        "#,
        user_id.user_id,
    )
    .fetch_one(&mut *transaction)
    .await?;

    queries::insert_new_chat_log(&mut transaction, user_id, &application_id).await?;
    transaction.commit().await?;

    Ok(application_id)
}

pub async fn set_application_parameters(
    db: &PgPool,
    user_id: UserId,
    application_id: ApplicationId,
    parameters: &ApplicationParameters,
) -> Result<Option<RevisionId>, sqlx::Error> {
    let ApplicationParameters {
        job_advert,
        resume_id,
        word_count,
        template_cover_letter_id,
        language_override,
        cover_letter_random_seed,
        applicant_address,
        company_address,
        cover_letter_text,
        json_resume,
        parent_revision_id,
        headshot_id,
    } = parameters;

    let json_resume_string: Option<String> = json_resume
        .as_ref()
        .map(|json| serde_json::to_string(json).expect("JsonResume must be serializable"));
    let ApplicantAddress {
        name: applicant_name,
        street_address: applicant_street_address,
        postal_code: applicant_postal_code,
        city: applicant_city,
    } = applicant_address;
    let CompanyAddress {
        company_name,
        street_address: company_street_address,
        postal_code: company_postal_code,
        city: company_city,
    } = company_address;

    let mut transaction = db.begin().await?;

    // Check that the application actually exists and belongs to the provided user:
    let application_exists = sqlx::query!(
        r#"
            SELECT 1 AS exists
            FROM application
            WHERE user_id = $1 AND application_id = $2
        "#,
        user_id.user_id,
        application_id.application_id,
    )
    .fetch_optional(&mut *transaction)
    .await?
    .is_some();

    if !application_exists {
        return Ok(None);
    }

    let revision_id = sqlx::query_as!(
        RevisionId,
        r#"
            INSERT INTO application_parameters
                (application_id, job_advert, resume_id, word_count, template_cover_letter_id, language_override, cover_letter_random_seed, applicant_name, applicant_street_address, applicant_postal_code, applicant_city, company_name, company_street_address, company_postal_code, company_city, cover_letter_text, json_resume, parent_revision_id, headshot_id)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
            RETURNING
                revision_id;
        "#,
        application_id.application_id,
        job_advert.as_ref() as Option<&String>,
        resume_id.map(|id| id.resume_id),
        word_count.map(|wc| TryInto::<i32>::try_into(wc).unwrap()),
        template_cover_letter_id.map(|id| id.template_cover_letter_id),
        language_override.map(|cl| cl.to_db_string()),
        // This type override is necessary because sqlx infers cover_letter_random_seed as
        // String here even though the column doesn't have a NOT NULL constraint.
        cover_letter_random_seed.as_ref() as Option<&String>,
        applicant_name.as_ref() as Option<&String>,
        applicant_street_address.as_ref() as Option<&String>,
        applicant_postal_code.as_ref() as Option<&String>,
        applicant_city.as_ref() as Option<&String>,
        company_name.as_ref() as Option<&String>,
        company_street_address.as_ref() as Option<&String>,
        company_postal_code.as_ref() as Option<&String>,
        company_city.as_ref() as Option<&String>,
        cover_letter_text.as_ref() as Option<&String>,
        json_resume_string.as_ref() as Option<&String>,
        parent_revision_id.map(|id| id.revision_id),
        headshot_id.map(|id| id.headshot_id),
    )
    .fetch_one(&mut *transaction)
    .await?;

    transaction.commit().await?;

    Ok(Some(revision_id))
}

struct FlatApplication {
    application_id: ApplicationId,
    revision_id: Option<Uuid>,
    job_advert: Option<String>,
    resume_id: Option<Uuid>,
    word_count: Option<i32>,
    template_cover_letter_id: Option<Uuid>,
    language_override: Option<String>,
    cover_letter_random_seed: Option<String>,
    created_at: chrono::DateTime<chrono::Utc>,
    updated_at: Option<chrono::DateTime<chrono::Utc>>,
}
pub async fn get_application(
    pool: &sqlx::PgPool,
    user_id: &UserId,
    application_id: &ApplicationId,
    revision_id: &Option<RevisionId>,
) -> Result<Option<Application>, sqlx::Error> {
    let revision_id: Option<RevisionId> = match revision_id {
        Some(revision_id) => Some(*revision_id),
        None => {
            let revision_id: Option<RevisionId> = sqlx::query!(
                r#"
                SELECT
                    revision_id
                FROM
                    latest_application_parameters
                WHERE
                    application_id = $1
                "#,
                application_id.application_id,
            )
            .fetch_optional(pool)
            .await?
            .map(|row| RevisionId::from(row.revision_id.unwrap()));
            revision_id
        }
    };

    let flat_application = sqlx::query_as!(
        FlatApplication,
        r#"
        SELECT
            application_id,
            revision_id,
            job_advert,
            resume_id,
            word_count,
            language_override,
            cover_letter_random_seed,
            application.created_at AS created_at,
            application_parameters.created_at AS updated_at,
            template_cover_letter_id
        FROM
            application
        LEFT JOIN
            application_parameters USING (application_id)
        WHERE
            user_id = $1
            AND application_id = $2
            AND revision_id = $3
        "#,
        user_id.user_id,
        application_id.application_id,
        revision_id.map(|r| r.revision_id),
    )
    .fetch_optional(pool)
    .await?;

    if let Some(flat_application) = flat_application {
        let resume_info: Option<ResumeInfo> = match flat_application.resume_id {
            Some(resume_id) => {
                Some(queries::get_resume_info(pool, user_id, &ResumeId::from(resume_id)).await?)
            }
            None => None,
        };
        let template_cover_letter: Option<TemplateCoverLetter> =
            match flat_application.template_cover_letter_id {
                Some(template_cover_letter_id) => {
                    let template_cover_letter_id =
                        TemplateCoverLetterId::from(template_cover_letter_id);
                    Some(
                        queries::get_template_cover_letter_by_id(
                            user_id,
                            &template_cover_letter_id,
                            pool,
                        )
                        .await?,
                    )
                }
                None => None,
            };
        let revision_id = flat_application.revision_id.map(RevisionId::from);

        let language_override = flat_application
            .language_override
            .map(|s| CoverLetterLanguage::from_db_string(s.as_str()));

        Ok(Some(Application {
            application_id: flat_application.application_id,
            revision_id,
            job_advert: flat_application.job_advert,
            resume_info,
            template_cover_letter,
            language_override: language_override,
            cover_letter_random_seed: flat_application.cover_letter_random_seed,
            word_count: flat_application.word_count.map(WordCount::from),
            created_at: flat_application.created_at,
            updated_at: flat_application.updated_at,
        }))
    } else {
        Ok(None)
    }
}

pub async fn get_latest_revision(
    pool: &sqlx::PgPool,
    user_id: UserId,
    application_id: ApplicationId,
) -> Result<Option<Revision>, Error> {
    let row = sqlx::query!(
        r#"
        SELECT
            latest_application_parameters.*
        FROM
            application
        LEFT JOIN
            latest_application_parameters USING (application_id)
        WHERE
            user_id = $1
            AND
            application_id = $2
        "#,
        user_id.user_id,
        application_id.application_id,
    )
    .fetch_optional(pool)
    .await
    .log_and_fatal()?;

    let revision: Option<Revision> = row.map(|row| {
        let company_address = CompanyAddress {
            company_name: row.company_name,
            street_address: row.company_street_address,
            postal_code: row.company_postal_code,
            city: row.company_city,
        };
        let applicant_address = ApplicantAddress {
            name: row.applicant_name,
            street_address: row.applicant_street_address,
            postal_code: row.applicant_postal_code,
            city: row.applicant_city,
        };
        Revision {
            revision_id: row.revision_id.map(RevisionId::from),
            application_parameters: ApplicationParameters {
                job_advert: row.job_advert,
                template_cover_letter_id: row
                    .template_cover_letter_id
                    .map(TemplateCoverLetterId::from),
                resume_id: row.resume_id.map(|id| ResumeId::from(id)),
                word_count: row.word_count.map(WordCount::from),
                language_override: row
                    .language_override
                    .map(|s| CoverLetterLanguage::from_db_string(s.as_str())),
                cover_letter_random_seed: row.cover_letter_random_seed,
                company_address,
                applicant_address,
                cover_letter_text: row.cover_letter_text,
                json_resume: row
                    .json_resume
                    .map(|json| serde_json::from_str(json.as_str()).unwrap_or_default()),
                parent_revision_id: row.parent_revision_id.map(RevisionId::from),
                headshot_id: row.headshot_id.map(HeadshotId::from),
            },
        }
    });
    Ok(revision)
}

pub async fn get_parameters(
    pool: &sqlx::PgPool,
    user_id: UserId,
    revision_id: RevisionId,
) -> Result<Option<ApplicationParameters>, Error> {
    let row = sqlx::query!(
        r#"
        SELECT
            job_advert,
            resume_id,
            word_count,
            language_override,
            template_cover_letter_id,
            cover_letter_random_seed,
            cover_letter_text,
            json_resume,
            parent_revision_id,
            headshot_id,

            applicant_name,
            applicant_street_address,
            applicant_postal_code,
            applicant_city,

            company_name,
            company_street_address,
            company_postal_code,
            company_city
        FROM
            application_parameters
        JOIN
            application USING (application_id)
        WHERE
            user_id = $1
            AND
            revision_id = $2
        "#,
        user_id.user_id,
        revision_id.revision_id,
    )
    .fetch_optional(pool)
    .await
    .log_and_fatal()?;

    let parameters: Option<ApplicationParameters> = row.map(|row| ApplicationParameters {
        job_advert: row.job_advert,
        template_cover_letter_id: row
            .template_cover_letter_id
            .map(TemplateCoverLetterId::from),
        resume_id: row.resume_id.map(|id| ResumeId::from(id)),
        word_count: row.word_count.map(WordCount::from),
        language_override: row
            .language_override
            .map(|s| CoverLetterLanguage::from_db_string(s.as_str())),
        cover_letter_random_seed: row.cover_letter_random_seed,
        applicant_address: ApplicantAddress {
            name: row.applicant_name,
            street_address: row.applicant_street_address,
            postal_code: row.applicant_postal_code,
            city: row.applicant_city,
        },
        company_address: CompanyAddress {
            company_name: row.company_name,
            street_address: row.company_street_address,
            postal_code: row.company_postal_code,
            city: row.company_city,
        },
        cover_letter_text: row.cover_letter_text,
        json_resume: row
            .json_resume
            .map(|json| serde_json::from_str(json.as_str()).unwrap_or_default()),
        parent_revision_id: row.parent_revision_id.map(RevisionId::from),
        headshot_id: row.headshot_id.map(HeadshotId::from),
    });

    Ok(parameters)
}

pub async fn get_latest_revisions(
    pool: &sqlx::PgPool,
    user_id: UserId,
) -> Result<Vec<(ApplicationId, RevisionId)>, Error> {
    // Get the latest revision for each application, sorted by created_at in descending order:
    let rows = sqlx::query!(
        r#"
        SELECT
            application_id,
            revision_id
        FROM
            application
        JOIN
            latest_application_parameters USING (application_id)
        WHERE
            user_id = $1
        ORDER BY
            latest_application_parameters.created_at DESC
        "#,
        user_id.user_id,
    )
    .fetch_all(pool)
    .await
    .log_and_fatal()?;

    Ok(rows
        .into_iter()
        .map(|row| {
            let application_id = ApplicationId::from(row.application_id);
            let revision_id = RevisionId::from(
                row.revision_id
                    .expect("TODO: Why is this not inferred as non-null?"),
            );
            (application_id, revision_id)
        })
        .collect())
}

#[allow(dead_code)]
pub async fn get_application_id(
    db: &PgPool,
    user_id: UserId,
    revision_id: RevisionId,
) -> Result<Option<ApplicationId>, sqlx::Error> {
    let application_id = sqlx::query!(
        r#"
        SELECT
            application_id
        FROM
            application_parameters
        JOIN
            application USING (application_id)
        WHERE
            user_id = $1
            AND
            revision_id = $2
        "#,
        user_id.user_id,
        revision_id.revision_id,
    )
    .fetch_optional(db)
    .await?;

    Ok(application_id.map(|row| ApplicationId::from(row.application_id)))
}
