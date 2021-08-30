#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

mod commands;
mod error;
mod mm_session;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::request_new_session,
            commands::show_window
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
