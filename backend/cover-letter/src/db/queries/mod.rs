pub mod application_queries;
pub mod chat_log;
pub mod cover_letter;
pub mod feedback_queries;
pub mod headshot;
pub mod headshot_generation;
pub mod resume_queries;
pub mod template_cover_letter_queries;
pub mod user_queries;

// this reexports all the modules in the directory:
pub use application_queries::*;
pub use chat_log::*;
pub use cover_letter::*;
pub use feedback_queries::*;
pub use headshot::*;
pub use resume_queries::*;
pub use template_cover_letter_queries::*;
pub use user_queries::*;

use crate::model::HeadshotContentType;
use crate::model::{ChatRole, CoverLetterLanguage};

trait ToDbString {
    fn to_db_string(&self) -> &'static str;
}

trait FromDbString: Sized {
    fn from_db_string(s: &str) -> Self;
}

impl ToDbString for CoverLetterLanguage {
    fn to_db_string(&self) -> &'static str {
        match self {
            CoverLetterLanguage::German => "de",
            CoverLetterLanguage::English => "en",
        }
    }
}

impl FromDbString for CoverLetterLanguage {
    fn from_db_string(s: &str) -> Self {
        match s {
            "de" => CoverLetterLanguage::German,
            "en" => CoverLetterLanguage::English,
            _ => panic!("Invalid cover letter language in database: {}", s),
        }
    }
}

impl ToDbString for ChatRole {
    fn to_db_string(&self) -> &'static str {
        match self {
            ChatRole::User => "user",
            ChatRole::Assistant => "assistant",
            ChatRole::System => "system",
            ChatRole::Function => "function",
            ChatRole::Tool => "tool",
        }
    }
}

impl FromDbString for ChatRole {
    fn from_db_string(s: &str) -> Self {
        match s {
            "user" => ChatRole::User,
            "assistant" => ChatRole::Assistant,
            "system" => ChatRole::System,
            "function" => ChatRole::Function,
            "tool" => ChatRole::Tool,
            _ => panic!("Invalid chat role in database: {}", s),
        }
    }
}

impl ToDbString for HeadshotContentType {
    fn to_db_string(&self) -> &'static str {
        match self {
            HeadshotContentType::Jpeg => "image/jpeg",
            HeadshotContentType::Png => "image/png",
            HeadshotContentType::Webp => "image/webp",
        }
    }
}

impl FromDbString for HeadshotContentType {
    fn from_db_string(s: &str) -> Self {
        match s {
            "image/jpeg" => HeadshotContentType::Jpeg,
            "image/png" => HeadshotContentType::Png,
            "image/webp" => HeadshotContentType::Webp,
            _ => panic!("Invalid headshot content type in database: {}", s),
        }
    }
}
