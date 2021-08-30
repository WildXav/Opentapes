use tauri::{command, Window, Manager};
use crate::mm_session::MMSession;
use crate::error::Error;

//noinspection RsWrongGenericArgumentsNumber
#[command]
pub(crate) fn show_window(window: Window) {
    window.get_window("main").unwrap().show().unwrap();
}

#[command]
pub(crate) async fn request_new_session() -> Result<MMSession, Error> {
    MMSession::request().await
}
