use serde::{Deserialize, Serialize};
use crate::error::{Error, ErrorReason};
use reqwest::header::HeaderMap;
use regex::Regex;

const MY_MIXTAPEZ_URL: &str = "https://mymixtapez.com";

#[derive(Debug, Clone, Deserialize, Serialize)]
pub(crate) struct MMSession {
    cookie: String,
    verifier: String,
}

impl MMSession {
    pub fn request() -> Result<MMSession, Error> {
        let resp = reqwest::blocking::get(MY_MIXTAPEZ_URL)
            .map_err(|_| Error::new_detailed(
                ErrorReason::RequestFailed, format!("failed to reach {}", MY_MIXTAPEZ_URL)
            ))?;
        let headers = resp.headers().clone();
        let body = resp.text()
            .map_err(|_| Error::new(ErrorReason::UnexpectedMMResponse))?;

        let cookie = MMSession::extract_cookie(&headers)
            .ok_or_else(|| Error::new(ErrorReason::MissingMMSessionCookie))?;
        let verifier = MMSession::extract_verifier(&body)
            .ok_or_else(|| Error::new(ErrorReason::MissingMMSessionVerifier))?;

        Ok(MMSession {
            cookie,
            verifier,
        })
    }

    fn extract_cookie(headers: &HeaderMap) -> Option<String> {
        headers.get("set-cookie")
            .and_then(|value| value.to_str().ok())
            .map(String::from)
    }

    fn extract_verifier(body: &str) -> Option<String> {
        Regex::new(r"X-MM-VERIFIER&q;,&q;value&q;:&q;([^&]+)&q;")
            .ok()
            .and_then(|f| f.captures(body))
            .and_then(|captures| captures.get(1))
            .map(|m| m.as_str())
            .map(String::from)
    }
}

#[cfg(test)]
mod tests {
    use regex::Regex;
    use crate::mm_session::MMSession;
    use crate::error::Error;

    // TODO: Write proper tests
    #[test]
    fn test() {
        let resp = reqwest::blocking::get("https://mymixtapez.com").unwrap();
        let headers = resp.headers().clone();
        let body = resp.text().unwrap();

        let cookie = MMSession::extract_cookie(&headers).unwrap();
        let verifier = MMSession::extract_verifier(&body).unwrap();

        println!("Cookie: {}", cookie);
        println!("X-MM-VERIFIER: {}", verifier);

        assert_eq!(0, 0);
    }
}