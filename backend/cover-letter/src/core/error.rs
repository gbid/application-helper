use std::fmt::{self, Display, Formatter};

#[derive(Debug, Copy, Clone, PartialEq, Eq, PartialOrd, Ord)]
pub enum Error {
    Transient,
    Fatal,
}

impl Display for Error {
    fn fmt(&self, f: &mut Formatter) -> fmt::Result {
        match self {
            Error::Transient => {
                write!(f, "Transient error")
            }
            Error::Fatal => {
                write!(f, "Fatal error")
            }
        }
    }
}

impl std::error::Error for Error {}

pub trait LogErrAndFatal {
    type Output;
    fn log_and_fatal(self) -> Self::Output;
}

impl<T, E: std::error::Error> LogErrAndFatal for Result<T, E> {
    type Output = Result<T, Error>;
    fn log_and_fatal(self) -> Result<T, Error> {
        self.map_err(|err| {
            // TODO: does this even work or do we need to keep the previous write:
            eprintln!("{err}");
            // error!(log, "{err}");
            Error::Fatal
        })
    }
}

pub trait LogErrAndTransient {
    type Output;
    fn log_and_transient(self) -> Self::Output;
}

impl<T, E: std::error::Error> LogErrAndTransient for Result<T, E> {
    type Output = Result<T, Error>;
    fn log_and_transient(self) -> Result<T, Error> {
        self.map_err(|err| {
            eprintln!("{err}");
            Error::Transient
        })
    }
}

impl LogErrAndFatal for sqlx::Error {
    type Output = Error;
    fn log_and_fatal(self) -> Error {
        eprintln!("{self}");
        Error::Fatal
    }
}

use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
impl IntoResponse for Error {
    fn into_response(self) -> Response {
        match self {
            // TODO: do we really want to return 500 for transient errors as well?
            Error::Transient => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
            Error::Fatal => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
        }
    }
}
