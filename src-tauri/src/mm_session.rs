use serde::{Deserialize, Serialize};
use crate::error::{Error, ErrorReason};
use reqwest::header::HeaderMap;
use regex::Regex;
use crate::mm_endpoints::mm_url;
use crate::mm_endpoints::MMEndpoint::Root;

#[derive(Debug, Clone, Deserialize, Serialize)]
pub(crate) struct MMSession {
    pub cookie: String,
    pub verifier: String,
}

impl MMSession {
    pub async fn request() -> Result<MMSession, Error> {
        let resp = reqwest::get(mm_url(Root)).await
            .map_err(|e| Error::new(
                ErrorReason::SessionFetchingFailed, e.to_string()
            ))?;
        let headers = resp.headers().clone();
        let body = resp.text().await
            .map_err(|_| Error::new(
                ErrorReason::SessionFetchingFailed,
                String::from("unable to get response body")
            ))?;

        let cookie = MMSession::extract_cookie(&headers)
            .ok_or_else(|| Error::new(
                ErrorReason::SessionFetchingFailed,
                String::from("failed to extract cookie")
            ))?;
        let verifier = MMSession::extract_verifier(&body)
            .ok_or_else(|| Error::new(
                ErrorReason::SessionFetchingFailed,
                String::from("failed to extract verifier")
            ))?;

        Ok(MMSession {
            cookie,
            verifier,
        })
    }

    fn extract_cookie(headers: &HeaderMap) -> Option<String> {
        headers.get_all("set-cookie").iter()
            .flat_map(|value| value.to_str().ok())
            .map(String::from)
            .reduce(|first, second| format!("{};{}", first, second))
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
    use crate::mm_session::MMSession;
    use reqwest::header::{COOKIE, LOCATION};
    use reqwest::redirect;

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

    #[test]
    fn test2() {
        let session = MMSession {
            cookie: String::from("mm-credentials_refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey\
            J1c2VyX25hbWUiOiIwIiwic2NvcGUiOlsicmVhZCJdLCJhdGkiOiI5MzBkYzk5YS1lNzM2LTQ3MTEtOTYwNy0yY\
            mM1N2JlYmRhZTYiLCJleHAiOjE2NDA4OTIxMDEsImF1dGhvcml0aWVzIjpbIlJPTEVfR1VFU1QiXSwianRpIjoi\
            NzE1Njg3ZTctNjFmYi00OGZhLWFiZGItZjk5YTNkM2U5Y2ZmIiwiY2xpZW50X2lkIjoid2VicGxheWVyIn0.OX-\
            sdB77HSBKEzLN2V4Lkrq0wWHIHJFzsj8Waufy4fE; Path=/; Expires=Sun, 31 Oct 2021 19:21:41 GMT\
            ; HttpOnly; Secure;mm-credentials_access=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiO\
            jE2MzU3MDgxMDEsInVzZXJfbmFtZSI6IjAiLCJhdXRob3JpdGllcyI6WyJST0xFX0dVRVNUIl0sImp0aSI6Ijkz\
            MGRjOTlhLWU3MzYtNDcxMS05NjA3LTJiYzU3YmViZGFlNiIsImNsaWVudF9pZCI6IndlYnBsYXllciIsInNjb3B\
            lIjpbInJlYWQiXX0.xtvfsoU3p7C0WGattcUVmTpeU7KlWlBb5ny2FFAHTl8; Path=/; Expires=Sun, 31 O\
            ct 2021 19:21:41 GMT; HttpOnly; Secure;mm-credentials_type=bearer; Path=/; Expires=Sun,\
             31 Oct 2021 19:21:41 GMT; HttpOnly; Secure"),
            verifier: String::from("Yj4A9TcKnlgarYqH_IF2tC9qQiU"),
        };

        let response = reqwest::blocking::Client::builder()
            .redirect(redirect::Policy::none())
            .build()
            .unwrap()
            .get("https://mymixtapez.com/api/songs/59828/stream")
            .header(COOKIE, session.cookie)
            .header("x-mm-verifier", session.verifier)
            .send()
            .unwrap();

        let status = response.status();

        dbg!(status);

        let location = response.headers()
            .get(LOCATION)
            .unwrap()
            .to_str()
            .unwrap()
            .replace("/low", "/original");

        dbg!(location);

        assert_eq!(0, 0);
    }
}
