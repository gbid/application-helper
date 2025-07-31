use indoc::formatdoc;

use crate::core::model::{
    ApplicantAddress, ApplicationParameters, ChatLog, CompanyAddress, RevisionId, UserId,
};
use crate::{
    core::app_state::AppState,
    core::error::Error,
    db::queries::get_parameters,
    integrations::prompting::request_json_answer,
    services::resume::{applicant_name, get_json_resume},
};

async fn scrape_company_address(job_advert: &str) -> Result<CompanyAddress, Error> {
    let prompt = formatdoc! {r#"
        Please provide the address of the company given a job advert.
        Your response should be in JSON-format according to the following schema:
        ```json
        {{
            "companyName": "string",
            "streetAddress": "string",
            "postalCode": "string",
            "city": "string"
        }}
        ```
        For example, a valid response could look like this:
        ```json
        {{
            "companyName": "BMW AG",
            "streetAddress": "Petuelring 130",
            "postalCode": "80809",
            "city": "München"
        }}
        ```
        Or if e.g. the address is not at all given in the job advert but the company name is:
        ```json
        {{
            "companyName": "Steuerkanzlei Schmidt"
        }}
        ```
        All fields are optional.
        This means that you should never include dummy values like "Unknown Company", "Company Name", etc.
        Instead, leave out the fields that are not present in the job advert in your JSON response.

        Make sure that the information you're providing is really included in the job advert:
        Don't make up information.

        Here's the job advert:
        ------------------

        {job_advert}
    "#};

    let address: CompanyAddress = request_json_answer(prompt, &mut ChatLog::new()).await?;
    Ok(address)
}

pub async fn get_company_address(
    revision_id: RevisionId,
    user_id: UserId,
    state: &AppState,
) -> Result<CompanyAddress, Error> {
    let ApplicationParameters {
        job_advert,
        company_address: overridden_address,
        ..
    } = match get_parameters(&state.db, user_id, revision_id).await? {
        Some(parameters) => parameters,
        None => {
            return Err(Error::Fatal);
        }
    };

    let job_advert = match job_advert {
        Some(job_advert) => job_advert,
        None => {
            return Ok(CompanyAddress::default());
        }
    };

    let scraped_address = scrape_company_address(&job_advert).await?;

    let merged_address = CompanyAddress {
        company_name: overridden_address
            .company_name
            .or(scraped_address.company_name),
        street_address: overridden_address
            .street_address
            .or(scraped_address.street_address),
        postal_code: overridden_address
            .postal_code
            .or(scraped_address.postal_code),
        city: overridden_address.city.or(scraped_address.city),
    };

    Ok(merged_address)
}

fn non_whitespace_string(s: String) -> Option<String> {
    if s.trim().is_empty() {
        None
    } else {
        Some(s)
    }
}

pub async fn get_applicant_address(
    revision_id: RevisionId,
    user_id: UserId,
    state: &AppState,
) -> Result<ApplicantAddress, Error> {
    let ApplicationParameters {
        applicant_address, ..
    } = match get_parameters(&state.db, user_id, revision_id).await? {
        Some(parameters) => parameters,
        None => {
            return Err(Error::Fatal);
        }
    };

    let resume = match get_json_resume(&state, user_id, revision_id).await {
        Some(resume) => resume,
        None => {
            return Ok(ApplicantAddress::default());
        }
    };

    let basics = &resume.basics;

    let scraped_applicant_address = ApplicantAddress {
        name: applicant_name(basics),
        street_address: non_whitespace_string(basics.location.street_address.clone()),
        postal_code: non_whitespace_string(basics.location.postal_code.clone()),
        city: non_whitespace_string(basics.location.city.clone()),
    };

    let merged_applicant_address = ApplicantAddress {
        name: applicant_address.name.or(scraped_applicant_address.name),
        street_address: applicant_address
            .street_address
            .or(scraped_applicant_address.street_address),
        postal_code: applicant_address
            .postal_code
            .or(scraped_applicant_address.postal_code),
        city: applicant_address.city.or(scraped_applicant_address.city),
    };

    Ok(merged_applicant_address)
}
