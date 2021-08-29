use std::fmt;
use serde::{Serialize, Serializer};
use serde::ser::SerializeStruct;

#[derive(Debug)]
pub(crate) struct Error {
    reason: ErrorReason,
    details: Option<String>,
}

impl std::error::Error for Error {}

impl fmt::Display for Error {
    fn fmt(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        write!(formatter, "{}", self.reason.as_str())
    }
}

impl Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        let mut ser = serializer.serialize_struct("Error", 2)?;
        ser.serialize_field("reason", &self.reason.as_str())?;
        ser.serialize_field("details", &self.details)?;
        ser.end()
    }
}

impl Error {
    pub fn new(reason: ErrorReason) -> Error {
        Error { reason, details: Option::None }
    }

    pub fn new_detailed(reason: ErrorReason, details: String) -> Error {
        Error { reason, details: Option::Some(details) }
    }
}

#[derive(Debug, Serialize)]
pub(crate) enum ErrorReason {
    MissingMMSessionCookie,
    MissingMMSessionVerifier,
    RequestFailed,
    UnexpectedMMResponse,
}

impl ErrorReason {
    pub fn as_str(&self) -> &'static str {
        match *self {
            ErrorReason::MissingMMSessionCookie => "Missing MyMixtapez session cookie",
            ErrorReason::MissingMMSessionVerifier => "Missing MyMixtapez session verifier",
            ErrorReason::RequestFailed => "Request failed",
            ErrorReason::UnexpectedMMResponse => "Unexpected MyMixtapez response",
        }
    }
}