use crate::core::app_state::AppState;
use crate::core::error::*;
use crate::utils::document;

use crate::core::model::json_resume::Basics;
use crate::core::model::ChatLog;
use crate::core::model::{ApplicationParameters, RevisionId, UserId};
use crate::core::model::{JsonResume, JSON_RESUME_SCHEMA};
use crate::db::queries;
use crate::integrations::prompting::request_json_answer;

use indoc::formatdoc;
use indoc::indoc;
use itertools::Itertools as _;
use lazy_static::lazy_static;

const SAMPLE_RESUME_JSON: &str = indoc! {r#"
    {
      // Country code of the language of human-readable fields in this JSON document:
      "language": "DE",

      "basics": {
        "familyName": "Mustermann",
        // This should contain both first and middle names:
        "givenName": "Max Georg F.",
        // This label will be used as the subtitle of the resume.
        // It should be a short, positive professional title of the applicant.
        // It should be between 2 and 4 words long and be as concise as possible,
        // in particular not containing any unnecessary fillers.
        // The last position of the applicant, optionally with a positive adjective
        // is a possible choice for this field.
        // If the job title of the job advert the applicant is applying for is known,
        // this field can be tailored to that job title.
        "label": "Eigenverantwortliche, zuverlässige Sekretärin",
        "email": "max.mustermann@mail.com",
        "phone": "07123 567898",
        "location": {
          "streetAddress": "Musterstraße 15",
          "postalCode": "54321",
          "city": "Musterstadt",
          "countryCode": "DE"
        },
        "profiles": {
          // A personal webpage:
          "website": "http://maxmustermann.de",
          "linkedin": "https://www.linkedin.com/in/max-mustermann-fkdsa193",
          "xing": "https://www.xing.com/profile/Master_Mustermann123"
        }
      },

      "work": [
        {
          "name": "Musterfirma GmbH",
          "location": "Musterdorf",
          // The role or position at this company. Should be human-readable.
          "position": "Musterdesigner",
          "url": "https://www.mustervertrieb.de",
          // Our dates for resumes are flexible since often the day is not known.
          // Also, sometimes only the year is known, so month and day can be left out
          // if they are not specified in the resume data.
          "startDate": { "kind": "YearMonth", "year": 2015, "month": 3 },
          // endDate can also be "Now" if the applicant is still working at the company
          // or if the activity, education, etc. is still ongoing.
          "endDate": { "kind": "Now" },
          "highlights": [
            "Prototyping einer neuen Musterserie für die Automobilindustrie",
            "Weiterentwicklung und Vermarktung von Mustern für eine Architekturfirma"
          ]
        }
      ],

      "education": [
        {
          "institution": "Universität Musterhausen",
          "url": "https://www.uni-musterhausen.de",
          "degree": "Bachelor of Science (B.Sc.) in Industriedesign",
          "startDate": { "kind": "YearMonth", "year": 2011, "month": 10 },
          "endDate": { "kind": "YearMonth", "year": 2014, "month": 11 },
          // This should be a human-readable grade:
          "score": "1,3",
          // This should be a list of notable courses or projects the applicant
          // completed at the institution.
          "courses": [
            "KFZ-Industriedesign",
            "Design der Internationalen Raumstation"
          ]
        },
        {
          "institution": "Musterschneider Gmbh",
          "url": "https://www.musterdesign.de",
          "degree": "Industriekaufmann",
          // sometimes, either the start or the end date of an element might be missing in the
          // resume data. In this case just leave out the missing date, in this case the start date.
          "endDate": { "kind": "Year", "year": 2011 }
        }
      ],

      // This should contain a list of certifications and other qualifications (apart from the ones
      // in "education") that the applicant has acquired.
      "certificates": [
        {
          "name": "Scrum Master",
          "institution": "Agile Coaching GmbH",
          "url": "https://www.uni-musterhausen.de",
          "endDate": { "kind": "YearMonthDay", "year": 2015, "month": 0, "day": 15 },
          "highlights": [
            "Planung von Daily Startups",
            "Agiles Arbeiten"
          ]
        }
      ],

      "volunteer": [
        {
          "organization": "FC Musterdorf",
          "position": "Trainer",
          "url": "https://fcmusterdorf.de",
          "startDate": { "kind": "Year", "year": 2012 },
          "endDate": { "kind": "Year", "year": 2018 },
          "highlights": ["Trainingsleitung der männlichen B-Jugend bestehend aus 21 Spielern"]
        }
      ],
      // If there are few explicitly listed skills, characterTraits, etc. in the resume,
      // you can also infer skills and traits from the work experience and education sections.
      // Both the skill names and the proficiency levels should be short and human-readable.
      // If a job advert requires a certain skill as a hard requirement,
      // which is not present in the resume, it can in some cases
      // be beneficial to state the willingness to learn that skill in the resume.
      "skills": {
        "software": [
          { "name": "MS Office", "proficiency": "Sehr gut" },
          { "name": "Designworks", "proficiency": "Gut" },
          { "name": "Python", "proficiency": "Grundkenntnisse" }
        ],
        "driversLicence": "Klasse B",
        "languages": [
          {
            "name": "Deutsch",
            "proficiency": "Muttersprache"
          },
          {
            "name": "Englisch",
            "proficiency": "C1"
          },
          {
            "name": "Spanisch",
            "proficiency": "Anfänger"
          }
        ],
        "characterTraits": [
          "Sorgfalt",
          "Kreativität",
          "Selbstständigkeit",
          "Teamfähigkeit"
        ],
        "interests": [
          "Fußball",
          "Philosophie",
          "Interior Design"
        ]
      },
      // do not include any fields that are not present in the text content
      "personalInfo": {
        "maritalStatus": "Ledig",
        "birthDate": { "kind": "YearMonthDay", "year": 1990, "month": 5, "day": 23 },
        "birthPlace": "Kleinmusterdorf",
        "nationality": "Deutsch",
        "children": "Tochter, 3 Jahre und Sohn, 5 Jahre"
      }
    }
"#};

// TODO: are we able to get this as static string at compile time?
lazy_static! {
    pub static ref RESUME_JSON_EXPLANATION: String = formatdoc! {r#"
        The JSON resume format is a standard for structuring resumes in JSON format.
        We have adapted the JSON resume format since most of our clients are german.
        The following is an example resume in JSON format with comments explaining the fields:
        ```json
        {}
        ```
        And here is the formal JSON schema for the JSON resume format:
        ```json
        {}
        ```
    "#,
        SAMPLE_RESUME_JSON,
        serde_json::to_string_pretty(&*JSON_RESUME_SCHEMA).unwrap(),
    };
}

#[test]
fn sample_resume_json_is_valid() {
    let json_str_stripped = json_comments::StripComments::new(SAMPLE_RESUME_JSON.as_bytes());
    let _resume: JsonResume =
        serde_json::from_reader(json_str_stripped).expect("Sample JSON resume should be valid");
}

pub async fn scrape_json_resume_from_document(resume_content: &[u8]) -> Result<JsonResume, Error> {
    let resume_text = document::prepare_document(&resume_content).await?;

    let prompt = formatdoc! {r#"
        Your task is to convert the text content of a resume into a JSON representation of the resume data.
        The "JSON resume" format is defined and explained as follows:

        {}
        
        Make sure to provide the detailed description and highlights of all job positions and education steps which are provided in the text content of the resume.
        If in doubt, the positions and education steps should be listed in reverse chronological order.
        In general, use common sense and your best judgement for bringing the resume into the JSON resume format such that we have maximally rich data about the person while not making up facts.
        Your answer must however include valid JSON in the format of the example above.

        Here is the text content that your JSON resume should be based on:

        ```
        {}
        ```
        When creating the JSON resume, make sure to leave out any fields that are not present in the text content, in particular,
        do _not_ provide dummy values like "null", "unknown", "n/a", "", "nicht angegeben".
        If a field is not present in the resume text and you cannot infer it for sure from the context, leave out the field altogether.
        On the other hand, when there's little or no explicit information present for skills or character traits, you can infer them from the work experience and education sections.
        You should also come up with the following additional information, if not present in the resume text:
        - A good professional title (label) for the resume, which should be 1-2 words.
          This should be just 1 or 2 words for the title plus, optionally, a positive adjective.
        - A good and concise resume summary.
          This should be be a short, concise paragraph that summarizes the person's professional experience and skills in roughly 150 to at most 250 characters.
          This can also be a career objective if this fits the resume better, e.g. for entry-level positions and internships.
    "#,
    *RESUME_JSON_EXPLANATION,
    resume_text,
    };
    let response: JsonResume = request_json_answer::<JsonResume>(prompt, &mut ChatLog::new())
        .await
        .map_err(|err| {
            eprintln!("Error scraping JSON resume from PDF: {:?}", err);
            Error::Fatal
        })?;
    Ok(response)
}

pub async fn get_json_resume(
    state: &AppState,
    user_id: UserId,
    revision_id: RevisionId,
) -> Option<JsonResume> {
    let application_parameters = queries::get_parameters(&state.db, user_id, revision_id)
        .await
        .expect("Query must succeed")?;

    get_json_resume_for_application_parameters(state, &user_id, &application_parameters).await
}

pub async fn get_json_resume_for_application_parameters(
    state: &AppState,
    user_id: &UserId,
    application_parameters: &ApplicationParameters,
) -> Option<JsonResume> {
    if let Some(json_resume) = &application_parameters.json_resume {
        return Some(json_resume.clone());
    }

    let resume_id = application_parameters.resume_id?;

    let (_, resume_bytes) = queries::get_resume(&user_id, &resume_id, &state.db)
        .await
        .expect("Query must succeed")?;

    let resume: JsonResume = scrape_json_resume_from_document(&resume_bytes)
        .await
        .unwrap();

    Some(resume)
}

pub fn applicant_name(basics: &Basics) -> Option<String> {
    if basics.given_name.trim().is_empty() && basics.family_name.trim().is_empty() {
        return None;
    }

    let concatenated: String = [&basics.given_name, &basics.family_name]
        .into_iter()
        .filter(|name| !name.is_empty())
        .join(" ")
        .to_string();

    Some(concatenated)
}
