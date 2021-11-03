#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use std::env;
use std::env::VarError;
use tauri::{WindowBuilder, WindowUrl};

mod commands;
mod error;
mod mm_endpoints;
mod mm_session;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let xdg_current_desktop = env::var("XDG_CURRENT_DESKTOP");
            let desktop_session = env::var("DESKTOP_SESSION");
            let hide_decoration = check_var_for_mobile_env_name(xdg_current_desktop)
                                        || check_var_for_mobile_env_name(desktop_session);

            app.create_window(
                String::from("main"),
                WindowUrl::default(),
                |win_attrs, webview_attrs| {
                    let win_attrs = win_attrs
                        .title("Opentapes")
                        .resizable(true)
                        .decorations(true)
                        .fullscreen(false)
                        .inner_size(1024.0, 768.0)
                        .min_inner_size(320.0, 320.0);
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
            commands::fetch_trending_singles,
            commands::fetch_greatest_singles,
            commands::fetch_album_details,
            commands::fetch_single_details,
            commands::fetch_song_location,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn check_var_for_mobile_env_name(var: Result<String, VarError>) -> bool {
    match var {
        Ok(value) => {
            let lower_value = value.to_lowercase();
            lower_value.contains("phosh") || lower_value.contains("plasma-mobile")
        },
        Err(_) => false,
    }
}
