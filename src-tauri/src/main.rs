#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

mod commands;
mod error;
mod mm_endpoints;
mod mm_session;

fn main() {
    tauri::Builder::default()
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
