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
    }
}
