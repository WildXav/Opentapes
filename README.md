<img src="https://codeberg.org/xaviers/Opentapes/raw/commit/e76434c9a36b69aedab897f727c3cf92c9af6331/src/assets/logo.png" align="right" width="50px" height="50px"/>

#  Opentapes

<p align="center">
<img src="https://img.shields.io/badge/Release-0.1.0-blue">
&nbsp;
<a href="https://v3.vuejs.org/">
    <img src="https://img.shields.io/badge/Vue-3.0-green">
</a>
&nbsp;
<a href="https://tauri.studio/">
    <img src="https://img.shields.io/badge/Tauri-1.0.0%20beta%208-yellowgreen">
</a>
</p>

<p align="center">
A convergent/adaptive app for streaming Hip-Hop mixtapes hosted on MyMixtapez.com.
<br>Built with <a href="https://v3.vuejs.org/">Vue.js</a>,
<a href="https://tauri.studio/">Tauri</a> &
<a href="https://www.naiveui.com/">Naive UI</a>.
<br>Made with ♥. 
</p>

<p align="center">
  <img src="https://codeberg.org/xaviers/Opentapes/media/branch/main/resources/screenshot.png"/>
</p>

## Installation
Note: I'm still working on making Opentapes available to more Linux distros.
### Releases
Releases for Linux (.deb) & Windows (x64 installer) can be found in the [releases page](https://codeberg.org/xaviers/Opentapes/releases).

### Repositories
#### Arch Linux (AUR)
```
yay -S opentapes-bin
```

## Building from source
### Set up Tauri and its dependencies
1. Refer to [Tauri's official documentation](https://tauri.studio/en/docs/getting-started/intro) to install Tauri, Node.js & Rust.
2. Install tauri-cli using cargo: `cargo install tauri-cli --version 1.0.0-beta.7`.

Note: This project uses Yarn 1.x as Node.js package manager. Will migrate to 2.x soon.

### Installing Front-End dependencies
```
yarn install
```

### Building for production
```
yarn build && cd src-tauri && cargo tauri build
```

## Contributing

Bug reports, pull requests, and ideas are welcomed.

## License
[![GNU GPLv3 Image](https://www.gnu.org/graphics/gplv3-127x51.png)](https://www.gnu.org/licenses/gpl-3.0.html) 
