#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use std::env;
use tauri::{WindowBuilder, WindowUrl};

mod commands;
mod error;
mod mm_endpoints;
mod mm_session;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let hide_decoration = match env::var("XDG_CURRENT_DESKTOP") {
                Ok(val) => val.to_lowercase().contains("phosh"),
                Err(_) => false,
            };

            app.create_window(
                String::from("main"),
                WindowUrl::default(),
                |win_attrs, webview_attrs| {
                    let win_attrs = win_attrs
                        .title("OpenTapes")
                        .resizable(true)
                        .decorations(true)
                        .fullscreen(false)
                        .inner_size(1024.0, 768.0)
                        .min_inner_size(320.0, 320.0)
                        .decorations(!hide_decoration)
                        .visible(false);
                    (win_attrs, webview_attrs)
                }).unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::show_window,
            commands::request_new_session,
            commands::fetch_featured,
            commands::fetch_latest,
            commands::fetch_trending_tapes,
            commands::fetch_greatest_tapes,
            commands::fetch_album_details,
            commands::fetch_song_location,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
