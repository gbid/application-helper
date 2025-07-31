use serde::{Deserialize, Serialize};

use std::path::PathBuf;
use strum_macros::Display;
use ts_rs::TS;
use uuid::Uuid;

#[derive(Debug, Serialize, TS)]
#[ts(export)]
pub struct HeadshotGeneratedFavouriteInfo {
    pub favourite_ids: Vec<GeneratedHeadshotId>,
}

#[derive(Debug, Serialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct HeadshotGenerationListItem {
    pub headshot_generation_id: HeadshotGenerationId,
    pub created_at: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug)]
pub struct HeadshotGeneration {
    pub headshot_generation_id: Uuid,
    pub trigger_word: String,
    pub replicate_version_id: Option<String>,
    pub generated_headshot_ids: Vec<GeneratedHeadshotId>,
}

#[derive(Debug, Copy, Clone, Hash, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct GeneratedHeadshotId {
    pub generated_headshot_id: Uuid,
}

#[derive(Debug, Copy, Clone, Hash, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct HeadshotGenerationId {
    pub headshot_generation_id: Uuid,
}

#[derive(Debug, Clone)]
pub struct HeadshotGenerationImage {
    pub filename: String,
    pub byte_content: Vec<u8>,
}

#[derive(Debug, Copy, Clone, Hash, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct HeadshotId {
    pub headshot_id: Uuid,
}

#[derive(Debug, Copy, Clone, PartialEq)]
pub enum HeadshotContentType {
    Jpeg,
    Png,
    Webp,
}

impl HeadshotContentType {
    pub fn to_str(&self) -> &'static str {
        match self {
            HeadshotContentType::Jpeg => "image/jpeg",
            HeadshotContentType::Png => "image/png",
            HeadshotContentType::Webp => "image/webp",
        }
    }
    pub fn from_str(s: &str) -> Option<Self> {
        match s {
            "image/jpeg" => Some(HeadshotContentType::Jpeg),
            "image/png" => Some(HeadshotContentType::Png),
            "image/webp" => Some(HeadshotContentType::Webp),
            _ => None,
        }
    }
}

pub struct Headshot {
    pub image_data: Vec<u8>,
    pub content_type: HeadshotContentType,
}

impl From<uuid::Uuid> for HeadshotId {
    fn from(headshot_id: uuid::Uuid) -> Self {
        Self { headshot_id }
    }
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, Display, PartialEq, Eq, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub enum ResumeLayout {
    SingleColumn,
    SingleColumnHeadshot,
    DualColumn,
    German,
}

#[derive(Debug, Clone, Hash, PartialEq, Eq, PartialOrd, Ord)]
pub struct SessionToken(pub String);

#[derive(Debug, Clone, Hash, PartialEq, Eq, PartialOrd, Ord)]
pub struct SessionTokenHash(pub String);

#[derive(Debug, Copy, Clone, Hash, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub enum UserType {
    Subscribed,
    Standard,
    Anonymous,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, sqlx::Type)]
#[sqlx(type_name = "subscription_status")]
pub enum SubscriptionStatus {
    Active,
    Inactive,
}
impl From<stripe::SubscriptionStatus> for SubscriptionStatus {
    fn from(subscription_status: stripe::SubscriptionStatus) -> Self {
        match subscription_status {
            stripe::SubscriptionStatus::Active => SubscriptionStatus::Active,
            stripe::SubscriptionStatus::Incomplete => SubscriptionStatus::Inactive,
            stripe::SubscriptionStatus::IncompleteExpired => SubscriptionStatus::Inactive,
            stripe::SubscriptionStatus::Trialing => SubscriptionStatus::Active,
            stripe::SubscriptionStatus::PastDue => SubscriptionStatus::Inactive,
            stripe::SubscriptionStatus::Canceled => SubscriptionStatus::Inactive,
            stripe::SubscriptionStatus::Unpaid => SubscriptionStatus::Inactive,
            stripe::SubscriptionStatus::Paused => SubscriptionStatus::Inactive,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewApplication {
    pub job_id: JobId,
    pub resume_id: ResumeId,
}

#[derive(Debug, Copy, Clone, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct ApplicationId {
    pub application_id: Uuid,
}
impl From<uuid::Uuid> for ApplicationId {
    fn from(application_id: uuid::Uuid) -> Self {
        Self { application_id }
    }
}

#[derive(Debug, Copy, Clone, Serialize, Deserialize, PartialEq, Eq, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct RevisionId {
    pub revision_id: Uuid,
}
impl From<uuid::Uuid> for RevisionId {
    fn from(revision_id: uuid::Uuid) -> Self {
        Self { revision_id }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Application {
    pub application_id: ApplicationId,
    pub revision_id: Option<RevisionId>,
    pub job_advert: Option<String>,
    pub resume_info: Option<ResumeInfo>,
    pub word_count: Option<WordCount>,
    pub template_cover_letter: Option<TemplateCoverLetter>,
    pub language_override: Option<CoverLetterLanguage>,
    pub cover_letter_random_seed: Option<String>,
    pub created_at: chrono::DateTime<chrono::Utc>,
    pub updated_at: Option<chrono::DateTime<chrono::Utc>>,
}

#[derive(Debug, Copy, Clone, Serialize, Deserialize, PartialEq, Eq, TS)]
#[ts(export)]
pub struct TemplateCoverLetterId {
    pub template_cover_letter_id: Uuid,
}
impl From<uuid::Uuid> for TemplateCoverLetterId {
    fn from(template_cover_letter_id: uuid::Uuid) -> Self {
        Self {
            template_cover_letter_id,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TemplateCoverLetter {
    pub template_cover_letter_id: TemplateCoverLetterId,
    pub template_cover_letter_title: String,
    pub text_content: String,
    pub created_at: chrono::DateTime<chrono::Utc>,
    pub updated_at: Option<chrono::DateTime<chrono::Utc>>,
}

#[derive(Debug, Copy, Clone, Hash, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct JobId {
    pub job_id: Uuid,
}
impl From<uuid::Uuid> for JobId {
    fn from(job_id: uuid::Uuid) -> Self {
        Self { job_id }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, sqlx::Type, TS)]
#[sqlx(type_name = "job_description_language")]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub enum JobDescriptionLanguage {
    German,
    English,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Job {
    pub job_id: JobId,
    pub job_title: String,
    pub job_description: String,
    pub job_description_hash: String,
    pub job_description_language: JobDescriptionLanguage,
    pub created_at: chrono::DateTime<chrono::Utc>,
    pub updated_at: Option<chrono::DateTime<chrono::Utc>>,
}

#[derive(Debug, Copy, Clone, Hash, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct UserId {
    pub user_id: Uuid,
}

impl From<uuid::Uuid> for UserId {
    fn from(user_id: uuid::Uuid) -> Self {
        Self { user_id }
    }
}

#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct ResumeInfo {
    pub size: u64,
    pub file_path: PathBuf,
    pub resume_id: ResumeId,
    pub updated_at: Option<chrono::DateTime<chrono::Utc>>,
    pub created_at: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Copy, Clone, Hash, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct ResumeId {
    pub resume_id: Uuid,
}

impl From<uuid::Uuid> for ResumeId {
    fn from(resume_id: uuid::Uuid) -> Self {
        Self { resume_id }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CoverLetterGenerationInputData {
    pub job_advert: Option<String>,
    pub resume_text: Option<String>,
    pub template_cover_letter: Option<String>,
    pub word_count: WordCount,
    pub language_override: Option<CoverLetterLanguage>,
    pub cover_letter_random_seed: Option<String>,
    pub cover_letter_text: Option<String>,
}

#[derive(Debug, Copy, Clone, Serialize, Deserialize, PartialEq, Eq, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct WordCount {
    pub word_count: u32,
}

impl From<i32> for WordCount {
    fn from(word_count: i32) -> Self {
        Self {
            word_count: word_count.try_into().unwrap(),
        }
    }
}

impl TryInto<i32> for WordCount {
    type Error = std::num::TryFromIntError;

    fn try_into(self) -> Result<i32, Self::Error> {
        self.word_count.try_into()
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, sqlx::Type, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub enum CoverLetterLanguage {
    German,
    English,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub enum ChatRole {
    User,
    Assistant,
    System,
    Function,
    Tool,
}

impl From<async_openai::types::Role> for ChatRole {
    fn from(role: async_openai::types::Role) -> Self {
        match role {
            async_openai::types::Role::User => ChatRole::User,
            async_openai::types::Role::Assistant => ChatRole::Assistant,
            async_openai::types::Role::System => ChatRole::System,
            async_openai::types::Role::Function => ChatRole::Function,
            async_openai::types::Role::Tool => ChatRole::Tool,
        }
    }
}

impl Into<async_openai::types::Role> for ChatRole {
    fn into(self) -> async_openai::types::Role {
        match self {
            ChatRole::User => async_openai::types::Role::User,
            ChatRole::Assistant => async_openai::types::Role::Assistant,
            ChatRole::System => async_openai::types::Role::System,
            ChatRole::Function => async_openai::types::Role::Function,
            ChatRole::Tool => async_openai::types::Role::Tool,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct ImageUrl {
    pub url: String,
}

impl From<async_openai::types::ImageUrl> for ImageUrl {
    fn from(image_url: async_openai::types::ImageUrl) -> Self {
        Self { url: image_url.url }
    }
}

impl Into<async_openai::types::ImageUrl> for ImageUrl {
    fn into(self) -> async_openai::types::ImageUrl {
        async_openai::types::ImageUrl {
            url: self.url,
            detail: None,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct ChatLogEntry {
    pub role: ChatRole,
    pub content: String,
    pub image_url: Option<ImageUrl>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct ChatLog {
    pub chat_log: Vec<ChatLogEntry>,
}

impl ChatLog {
    pub fn new() -> Self {
        Self {
            chat_log: Vec::new(),
        }
    }
}

#[derive(Debug, Clone, Deserialize, Serialize, PartialEq, TS, Default)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct ApplicationParameters {
    pub resume_id: Option<ResumeId>,
    pub job_advert: Option<String>,
    pub word_count: Option<WordCount>,
    pub language_override: Option<CoverLetterLanguage>,
    pub template_cover_letter_id: Option<TemplateCoverLetterId>,
    pub cover_letter_random_seed: Option<String>,
    pub applicant_address: ApplicantAddress,
    pub company_address: CompanyAddress,
    pub cover_letter_text: Option<String>,
    pub json_resume: Option<JsonResume>,
    pub parent_revision_id: Option<RevisionId>,
    pub headshot_id: Option<HeadshotId>,
}

impl ApplicationParameters {
    pub fn eq_except_for_parent_revision_id(&self, other: &Self) -> bool {
        let self_clone = ApplicationParameters {
            parent_revision_id: None,
            ..self.clone()
        };
        let other_clone = ApplicationParameters {
            parent_revision_id: None,
            ..other.clone()
        };
        self_clone == other_clone
    }
}

#[derive(Debug, Clone, Deserialize, Serialize, PartialEq, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct Revision {
    pub revision_id: Option<RevisionId>,
    pub application_parameters: ApplicationParameters,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct ApplicationIdAndTitle {
    pub application_id: ApplicationId,
    pub title: Option<String>,
}

pub struct NewResume {
    pub byte_content: Vec<u8>,
    pub size: i32,
    pub file_path: PathBuf,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq, Eq, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct ApplicantAddress {
    pub name: Option<String>,
    pub street_address: Option<String>,
    pub postal_code: Option<String>,
    pub city: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq, Eq, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct CompanyAddress {
    pub company_name: Option<String>,
    pub street_address: Option<String>,
    pub postal_code: Option<String>,
    pub city: Option<String>,
}
use schemars::{schema_for, JsonSchema};
#[derive(Debug, Clone, Serialize, Deserialize, Default, TS, PartialEq)]
#[serde(rename_all = "camelCase")]
#[derive(JsonSchema)]
#[ts(export)]
pub struct JsonResume {
    pub language: Option<String>,
    #[serde(default)]
    pub basics: json_resume::Basics,
    #[serde(default)]
    pub work: Vec<json_resume::Work>,
    #[serde(default)]
    pub volunteer: Vec<json_resume::Volunteer>,
    #[serde(default)]
    pub education: Vec<json_resume::Education>,
    #[serde(default)]
    pub skills: json_resume::Skills,
    #[serde(default)]
    pub certificates: Vec<json_resume::Certificate>,
    #[serde(default)]
    pub personal_info: json_resume::PersonalInfo,
}

lazy_static::lazy_static! {
    pub static ref JSON_RESUME_SCHEMA: serde_json::Value = serde_json::to_value(schema_for!(JsonResume)).unwrap();
}

pub mod json_resume {

    use super::*;

    #[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq, TS)]
    #[serde(rename_all = "camelCase")]
    pub struct YearMonthDay {
        pub year: u32,
        pub month: u32,
        pub day: u32,
    }

    #[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq, TS)]
    #[serde(rename_all = "camelCase")]
    pub struct YearMonth {
        pub year: u32,
        pub month: u32,
    }

    #[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq, TS)]
    #[serde(rename_all = "camelCase")]
    pub struct Year {
        pub year: u32,
    }

    #[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq, TS)]
    #[serde(tag = "kind")]
    pub enum ResumeDate {
        YearMonthDay(YearMonthDay),
        YearMonth(YearMonth),
        Year(Year),
        Now,
    }

    #[derive(Debug, Clone, Serialize, Deserialize, Default, JsonSchema, PartialEq, TS)]
    #[serde(rename_all = "camelCase")]
    pub struct Basics {
        #[serde(default)]
        pub family_name: String,
        #[serde(default)]
        pub given_name: String,
        #[serde(default)]
        /// This is the subheading of the resume that is displayed.
        /// This should be a concise professional title or a tagline.
        /// Given a job description to apply for, this job's title can be a good choice.
        /// The most recent position of the resume is another good choice.
        /// This should be just 1 or 2 words for the title plus, optionally, a positive adjective.
        /// This professional title should be inferred if not provided based on the resume content
        /// and possibly the target job description.
        pub label: String,
        #[serde(default)]
        /// This is the resume summary.
        /// It should be a short, concise paragraph that summarizes the person's professional experience and skills.
        /// If the applicant is a student or recent graduate without a lot of professional experience,
        /// this can be more of a career or resume objective, highlighting the applicant's goals and aspirations.
        /// This summary must not be longer than 250 characters since otherwise this messes up the layout.
        /// A resume summary must be present given a complete resume.
        /// If missing, write a good summary based on the resume content.
        pub summary: String,
        #[serde(default)]
        pub email: String,
        #[serde(default)]
        pub phone: String,
        #[serde(default)]
        pub location: Location,
        #[serde(default)]
        pub profiles: Profiles,
    }

    #[derive(Debug, Clone, Serialize, Deserialize, Default, JsonSchema, PartialEq, TS)]
    #[serde(rename_all = "camelCase")]
    pub struct Location {
        #[serde(default)]
        pub street_address: String,
        #[serde(default)]
        pub postal_code: String,
        #[serde(default)]
        pub city: String,
        #[serde(default)]
        pub country_code: String,
    }

    #[derive(Debug, Clone, Serialize, Deserialize, Default, JsonSchema, PartialEq, TS)]
    #[serde(rename_all = "camelCase")]
    pub struct Profiles {
        #[serde(default)]
        pub website: String,
        #[serde(default)]
        pub linkedin: String,
        #[serde(default)]
        pub xing: String,
    }

    #[derive(Debug, Clone, Serialize, Deserialize, Default, JsonSchema, PartialEq, TS)]
    #[serde(rename_all = "camelCase")]
    /// The work positions of the resume.
    /// The order should be reverse chronological, i.e. the most recent position first.
    /// The work positions should be complete, i.e. no gaps of more than 2 or 3 months between the end of one position
    /// and the start of the next one.
    /// Periods without employment should also be listed here, positively phrased,
    /// for example "Arbeitssuchend", "Elternzeit", or "Berufliche Neuorientierung".
    /// Multiple positions at the same employer should be listed as separate work stations.
    pub struct Work {
        #[serde(default)]
        /// The name of the employer, company, or organization.
        /// For non-employed stations or periods, positively name
        /// the activity or project, e.g. "Arbeitssuchend", "Elternzeit", or "Berufliche Neuorientierung".
        /// For companies, this should be the precise name of the company,
        /// e.g. not "BMW" but "BMW AG".
        pub name: String,
        #[serde(default)]
        pub location: String,
        #[serde(default)]
        /// The position or job title of the work station.
        pub position: String,
        #[serde(default)]
        pub url: String,
        /// Dates for work position should be given as a month and year.
        /// Do not include the day.
        /// If no information about the month is given, just give the year.
        pub start_date: Option<ResumeDate>,
        /// Month and year, or just the year, if no month is known.
        pub end_date: Option<ResumeDate>,
        #[serde(default)]
        /// The highlights of the work station should concisely describe the responsibilities and achievements of the position.
        /// For positions relevant to the target job, the highlights should be tailored to the job description and encompass 2-5 bullet points, depending on the relevance.
        pub highlights: Vec<String>,
    }

    #[derive(Debug, Clone, Serialize, Deserialize, Default, JsonSchema, PartialEq, TS)]
    #[serde(rename_all = "camelCase")]
    pub struct Volunteer {
        #[serde(default)]
        pub organization: String,
        #[serde(default)]
        pub position: String,
        #[serde(default)]
        pub url: String,
        pub start_date: Option<ResumeDate>,
        pub end_date: Option<ResumeDate>,
        #[serde(default)]
        pub highlights: Vec<String>,
    }

    #[derive(Debug, Clone, Serialize, Deserialize, Default, JsonSchema, PartialEq, TS)]
    #[serde(rename_all = "camelCase")]
    /// The education stations of the resume, i.e. schools, universities, and german "Ausbildungen".
    /// The order should be reverse chronological, i.e. the most recent education first.
    /// For schools, the highest degree is usually sufficient.
    /// For universities, list all degrees.
    pub struct Education {
        #[serde(default)]
        pub institution: String,
        #[serde(default)]
        pub url: String,
        #[serde(default)]
        pub degree: String,
        /// Dates for education stations should be given as a month and year.
        /// Do not include the day.
        /// If no information about the month is given, just give the year.
        pub start_date: Option<ResumeDate>,
        /// Month and year, or just the year, if no month is known.
        pub end_date: Option<ResumeDate>,
        #[serde(default)]
        /// The grade or score ("Abschlussnote") of the education station is optional in resumes.
        /// It makes sense to include it if it is good.
        pub score: String,
        #[serde(default)]
        pub courses: Vec<String>,
    }

    #[derive(Debug, Clone, Serialize, Deserialize, Default, JsonSchema, PartialEq, TS)]
    #[serde(rename_all = "camelCase")]
    pub struct Skills {
        #[serde(default)]
        pub software: Vec<Skill>,
        #[serde(default)]
        pub drivers_licence: String,
        #[serde(default)]
        pub languages: Vec<Skill>,
        #[serde(default)]
        pub character_traits: Vec<String>,
        #[serde(default)]
        pub interests: Vec<String>,
    }

    #[derive(Debug, Clone, Serialize, Deserialize, Default, JsonSchema, PartialEq, TS)]
    #[serde(rename_all = "camelCase")]
    pub struct Skill {
        #[serde(default)]
        /// Skills should be concise and specific,
        /// e.g. "Microsoft Office 2405" instead of "EDV-Kenntnisse".
        pub name: String,
        #[serde(default)]
        /// Specifying proficiency is optional but can be good.
        /// Possbile scales:
        /// - 10-point scale: "7/10"
        /// - "Grundkenntnisse", "Fortgeschritten", "Experte", ...
        pub proficiency: String,
    }

    #[derive(Debug, Clone, Serialize, Deserialize, Default, JsonSchema, PartialEq, TS)]
    #[serde(rename_all = "camelCase")]
    pub struct Certificate {
        #[serde(default)]
        pub name: String,
        #[serde(default)]
        pub institution: String,
        #[serde(default)]
        pub url: String,
        pub start_date: Option<ResumeDate>,
        pub end_date: Option<ResumeDate>,
        #[serde(default)]
        pub highlights: Vec<String>,
    }

    #[derive(Debug, Clone, Serialize, Deserialize, Default, JsonSchema, PartialEq, TS)]
    #[serde(rename_all = "camelCase")]
    pub struct PersonalInfo {
        #[serde(default)]
        pub marital_status: String,
        #[serde(default)]
        pub birth_place: String,
        #[serde(default)]
        pub birth_date: Option<ResumeDate>,
        #[serde(default)]
        pub children: String,
        #[serde(default)]
        pub nationality: String,
    }

    #[cfg(test)]
    mod tests {
        use super::*;
        use serde_json;

        #[test]
        fn test_year_month_day_serialize_deserialize() {
            let original = YearMonthDay {
                year: 2023,
                month: 8,
                day: 5,
            };
            let serialized = serde_json::to_string(&original).expect("Serialization failed");
            println!("Serialized YearMonthDay: {}", serialized);
            let deserialized: YearMonthDay =
                serde_json::from_str(&serialized).expect("Deserialization failed");
            assert_eq!(original, deserialized);
        }

        #[test]
        fn test_year_month_serialize_deserialize() {
            let original = YearMonth {
                year: 2023,
                month: 8,
            };
            let serialized = serde_json::to_string(&original).expect("Serialization failed");
            println!("Serialized YearMonth: {}", serialized);
            let deserialized: YearMonth =
                serde_json::from_str(&serialized).expect("Deserialization failed");
            assert_eq!(original, deserialized);
        }

        #[test]
        fn test_year_serialize_deserialize() {
            let original = Year { year: 2023 };
            let serialized = serde_json::to_string(&original).expect("Serialization failed");
            println!("Serialized Year: {}", serialized);
            let deserialized: Year =
                serde_json::from_str(&serialized).expect("Deserialization failed");
            assert_eq!(original, deserialized);
        }

        #[test]
        fn test_resume_date_serialize_deserialize() {
            let cases = vec![
                ResumeDate::YearMonthDay(YearMonthDay {
                    year: 2023,
                    month: 8,
                    day: 5,
                }),
                ResumeDate::YearMonth(YearMonth {
                    year: 2023,
                    month: 8,
                }),
                ResumeDate::Year(Year { year: 2023 }),
                ResumeDate::Now,
            ];

            for case in cases.iter() {
                let serialized = serde_json::to_string(case).expect("Serialization failed");
                println!("Serialized ResumeDate: {}", serialized);
                let deserialized: ResumeDate =
                    serde_json::from_str(&serialized).expect("Deserialization failed");
                assert_eq!(case, &deserialized);
            }
        }

        #[test]
        fn test_custom_serialize_deserialize() {
            let original = ResumeDate::Now;
            let serialized = serde_json::to_string(&original).expect("Serialization failed");
            println!("Serialized Custom: {}", serialized);
            let deserialized: ResumeDate =
                serde_json::from_str(&serialized).expect("Deserialization failed");
            assert_eq!(original, deserialized);
        }
    }
}
