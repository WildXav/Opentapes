use tauri::{command, Window, Manager};
use crate::mm_session::MMSession;
use crate::error::{Error};
use serde_json::Value;
use crate::mm_endpoints::{mm_url, fetch};
use crate::mm_endpoints::MMEndpoint::{Features, Latest, TrendingMixtapes, GreatestMixtapes, AlbumDetails};

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
    let req = reqwest::Client::new().get(mm_url(Features));
    fetch(req, session).await
}

#[command]
pub(crate) async fn fetch_latest(session: MMSession, page: u32, size: u32) -> Result<Value, Error> {
    let req = reqwest::Client::new()
        .get(mm_url(Latest))
        .query(&[("page", page), ("size", size)]);
    fetch(req, session).await
}

#[command]
pub(crate) async fn fetch_trending_tapes(session: MMSession, page: u32, size: u32) -> Result<Value, Error> {
    let req = reqwest::Client::new()
        .get(mm_url(TrendingMixtapes))
        .query(&[("page", page), ("size", size)]);
    fetch(req, session).await
}

#[command]
pub(crate) async fn fetch_greatest_tapes(session: MMSession, page: u32, size: u32) -> Result<Value, Error> {
    let req = reqwest::Client::new()
        .get(mm_url(GreatestMixtapes))
        .query(&[("page", page), ("size", size)]);
    fetch(req, session).await
}

#[command]
pub(crate) async fn fetch_album_details(session: MMSession, album_id: u32) -> Result<Value, Error> {
    let path = format!("{}{}", mm_url(AlbumDetails), album_id);
    let req = reqwest::Client::new().get(path);
    fetch(req, session).await
}
