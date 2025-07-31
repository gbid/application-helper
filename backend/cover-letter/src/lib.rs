pub mod core;
#[cfg(feature = "credentials")]
pub mod credentials;
pub mod db;
pub mod integrations;
pub mod services;
pub mod utils;
pub mod web;

// Re-export commonly used items for backward compatibility
pub use core::*;
pub use db::*;
pub use integrations::*;
pub use services::*;
pub use utils::*;
pub use web::*;

#[cfg(feature = "production")]
const ROOT_URL: &str = "https://bewerbungshelfer.net";
#[cfg(feature = "integration")]
const ROOT_URL: &str = "https://integration.bewerbungshelfer.net";
#[cfg(all(not(feature = "production"), not(feature = "integration")))]
const ROOT_URL: &str = "http://localhost:3001";
