# Opentapes

<p align="center">
<img src="https://img.shields.io/badge/version-0.1.0-blue">
</p>

A convergent/adaptive app for streaming Hip-Hop mixtapes. Made with Vue.js & Tauri.

<p align="center">
  <img src="https://codeberg.org/xaviers/Opentapes/media/branch/main/screenshot.png"/>
</p>

## Building from source
### Set up Tauri and its dependencies
1. Refer to [Tauri's official documentation](https://tauri.studio/en/docs/getting-started/intro) to install Tauri, Node.js & Rust.
2. Install tauri-cli using cargo: `cargo install tauri-cli --version 1.0.0-beta.7`.

Note: This project uses Yarn 1.x as Node.js package manager.

### Installing Front-End dependencies
```
yarn install
```

### Build for production
```
yarn build && cd src-tauri && cargo tauri build
```

### Contributing

Bug reports, pull request submission, and idea suggestions are welcomed.
