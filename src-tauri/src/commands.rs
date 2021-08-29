use tauri::{command};
use crate::mm_session::MMSession;
use crate::error::Error;
use serde_json::Value;

#[command]
pub(crate) fn request_new_session() -> Result<MMSession, Error> {
    MMSession::request()
}
