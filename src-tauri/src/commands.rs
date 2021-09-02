use tauri::{command, Window, Manager};
use crate::mm_session::MMSession;
use crate::error::{Error, ErrorReason};
use reqwest::header::COOKIE;
use serde_json::Value;
use crate::mm_endpoints::mm_url;
use crate::mm_endpoints::MMEndpoint::Features;

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

#[command]
pub(crate) async fn fetch_featured(session: MMSession) -> Result<Value, Error> {
    reqwest::Client::new()
        .get(mm_url(Features))
        .header(COOKIE, session.cookie)
        .header("x-mm-verifier", session.verifier)
        .send()
        .await
        .map_err(|e| Error::new(ErrorReason::HTTPFailure, e.to_string()))?
        .json()
        .await
        .map_err(|e| Error::new(ErrorReason::UnexpectedResponse, e.to_string()))
}
