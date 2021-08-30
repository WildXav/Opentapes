use tauri::{command, Window, Manager};
use crate::mm_session::MMSession;
use crate::error::Error;

//noinspection RsWrongGenericArgumentsNumber
#[command]
pub(crate) fn show_window(window: Window) {
    window.get_window("main")
        .unwrap_or_else(|| panic!("unable to retrieve main window"))
        .show()
        .unwrap_or_else(|_| panic!("unable to show main window"));
}

#[command]
pub(crate) async fn request_new_session() -> Result<MMSession, Error> {
    MMSession::request().await
}
