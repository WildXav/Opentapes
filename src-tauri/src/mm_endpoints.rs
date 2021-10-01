use reqwest::RequestBuilder;
use serde_json::Value;
use crate::error::{Error, ErrorReason};
use reqwest::header::COOKIE;
use crate::mm_session::MMSession;

const BASE_URL: &str = "https://mymixtapez.com";

#[allow(dead_code)]
pub(crate) enum MMEndpoint {
    Root,
    Features,
    Latest,
    TrendingMixtapes,
    GreatestMixtapes,
    TrendingSongs,
    GreatestSongs,
    AlbumDetails,
    SongDetails,
}

pub(crate) fn mm_url(endpoint: MMEndpoint) -> String {
    match endpoint {
        MMEndpoint::Root => BASE_URL.to_string(),
        MMEndpoint::Features => format!("{}/api/albums/features", BASE_URL),
        MMEndpoint::Latest => format!("{}/api/albums/just-added", BASE_URL),
        MMEndpoint::TrendingMixtapes => format!("{}/api/albums/trending", BASE_URL),
        MMEndpoint::GreatestMixtapes => format!("{}/api/albums/best", BASE_URL),
        MMEndpoint::TrendingSongs => format!("{}/api/songs/trending", BASE_URL),
        MMEndpoint::GreatestSongs => format!("{}/api/songs/best", BASE_URL),
        MMEndpoint::AlbumDetails => format!("{}/api/albums/", BASE_URL),
        MMEndpoint::SongDetails => format!("{}/api/songs/", BASE_URL),
    }
}

pub(crate) async fn fetch(req_builder: RequestBuilder, session: MMSession) -> Result<Value, Error> {
    let response = req_builder
        .header(COOKIE, session.cookie)
        .header("x-mm-verifier", session.verifier)
        .send()
        .await?;

    if !response.status().is_success() {
        return Err(Error::new(
            ErrorReason::HTTPFailure,
            response.status().to_string()))
    }

    response.json()
        .await
        .map_err(|e| Error::new(ErrorReason::UnexpectedResponse, e.to_string()))
}
