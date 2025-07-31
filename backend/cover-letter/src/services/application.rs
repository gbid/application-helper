use crate::core::error::{Error, LogErrAndFatal};
use crate::core::model::{
    ApplicationId, ApplicationParameters, CoverLetterLanguage, ResumeId, RevisionId,
    TemplateCoverLetterId, UserId, WordCount,
};
use crate::db::queries;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
struct CoverLetterResetTriggers {
    job_advert: Option<String>,
    resume_id: Option<ResumeId>,
    word_count: Option<WordCount>,
    template_cover_letter_id: Option<TemplateCoverLetterId>,
    language_override: Option<CoverLetterLanguage>,
    cover_letter_random_seed: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
struct JsonResumeResetTriggers {
    resume_id: Option<ResumeId>,
}

fn perform_resets(parent: &ApplicationParameters, new: &mut ApplicationParameters) -> () {
    if should_reset_cover_letter(parent, &new) {
        new.cover_letter_text = None;
    }

    if should_reset_json_resume(parent, &new) {
        new.json_resume = None;
    }
}

// TODO: introduce some error type based on which the calling handler
// can return a proper error message.
pub async fn process_application_parameters(
    db: &sqlx::PgPool,
    user_id: UserId,
    application_id: ApplicationId,
    mut new_parameters: ApplicationParameters,
) -> Result<Option<RevisionId>, Error> {
    if let Some(job_advert) = &new_parameters.job_advert {
        if job_advert.is_empty() {
            new_parameters.job_advert = None;
        }
    }

    if new_parameters.job_advert.is_none() && new_parameters.resume_id.is_none() {
        return Ok(None);
    }

    let parent_revision_id = new_parameters.parent_revision_id.clone();

    if let Some(parent_revision_id) = parent_revision_id {
        let parent_parameters = queries::get_parameters(db, user_id, parent_revision_id)
            .await
            .log_and_fatal()?
            .ok_or_else(|| {
                eprintln!(
                    "Parent revision {:?} not found for user {:?}",
                    parent_revision_id, user_id
                );
                Error::Fatal
            })?;
        if new_parameters.eq_except_for_parent_revision_id(&parent_parameters) {
            return Ok(Some(parent_revision_id));
        }
        perform_resets(&parent_parameters, &mut new_parameters);
    }

    let new_revision_id =
        queries::set_application_parameters(db, user_id, application_id, &new_parameters)
            .await
            .log_and_fatal()?;

    Ok(new_revision_id)
}

fn should_reset_cover_letter(old: &ApplicationParameters, new: &ApplicationParameters) -> bool {
    extract_cover_letter_reset_triggers(old) != extract_cover_letter_reset_triggers(new)
}

fn should_reset_json_resume(old: &ApplicationParameters, new: &ApplicationParameters) -> bool {
    extract_json_resume_reset_triggers(old) != extract_json_resume_reset_triggers(new)
}

fn extract_cover_letter_reset_triggers(params: &ApplicationParameters) -> CoverLetterResetTriggers {
    CoverLetterResetTriggers {
        job_advert: params.job_advert.clone(),
        resume_id: params.resume_id,
        word_count: params.word_count,
        template_cover_letter_id: params.template_cover_letter_id,
        language_override: params.language_override,
        cover_letter_random_seed: params.cover_letter_random_seed.clone(),
    }
}

fn extract_json_resume_reset_triggers(params: &ApplicationParameters) -> JsonResumeResetTriggers {
    JsonResumeResetTriggers {
        resume_id: params.resume_id,
    }
}
