use tauri::{command};
use crate::mm_session::MMSession;
use crate::error::Error;

#[command]
pub(crate) fn request_new_session() -> Result<MMSession, Error> {
    MMSession::request()
}
