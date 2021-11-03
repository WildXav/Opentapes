<template>
  <n-config-provider class="flex flex-col h-full w-full" :theme="darkTheme">
    <n-layout has-sider>
      <Sidenav :static="staticSidenav" />

      <n-layout
        class="inner-layout"
        :content-style="{
          'padding-left':
            (staticSidenav ? 0 : config.sidenavCollapsedWidth) + 'px',
        }"
      >
        <Header
          :browsing-view-title="browsingViewTitle"
          :album-view-title="albumViewTitle"
          :is-album-view-active="isAlbumViewActive"
          :is-album-view-fixed="isAlbumViewFixed"
        />

        <n-layout
          has-sider
          sider-placement="right"
          content-style="justify-content: space-between"
        >
          <n-layout style="position: static">
            <div
              style="overflow: hidden; height: 100%"
              :style="{ position: isAlbumViewFixed ? 'static' : 'absolute' }"
            >
              <router-view />
            </div>
          </n-layout>

          <n-layout-sider
            class="z-10"
            :collapsed-width="0"
            :width="isAlbumViewFixed ? '40%' : '100%'"
            :collapsed="
              (!selectedAlbum && !selectedSingle) ||
              (!isAlbumViewFixed && !isAlbumViewActive)
            "
          >
            <AlbumDetails v-if="!!selectedAlbum" :album="selectedAlbum" />
            <SingleDetails v-if="!!selectedSingle" :single="selectedSingle" />
          </n-layout-sider>
        </n-layout>
      </n-layout>
    </n-layout>

    <Player
      :playlist="playlist"
      :songs-location="songsLocation"
      :queue="queue"
      :song-playing="songPlaying"
      :is-playing="isPlaying"
      :is-loading-playlist="isLoadingPlaylist"
      :large="largePlayer"
    />

    <SessionDialog :is-loading-session="isLoadingSession" />
    <ErrorDialog :dialog-data="errorDialogData" />
  </n-config-provider>
</template>

<script lang="ts">
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import { darkTheme } from "naive-ui";
import { CONFIG } from "@/config";
import { invoke } from "@tauri-apps/api";
import { Command } from "@/models/backend/command";
import ErrorDialog from "@/components/ErrorDialog.vue";
import { ErrorDialogData } from "@/models/error-dialog-data";
import SessionDialog from "@/components/SessionDialog.vue";
import Header from "@/components/Header.vue";
import Player from "@/components/Player.vue";
import Sidenav from "@/components/Sidenav.vue";
import { Album } from "@/models/album";
import AlbumDetails from "@/views/AlbumDetails.vue";
import { Song } from "@/models/song";
import { SongLocation } from "@/models/song-location";
import { Single } from "@/models/single";
import SingleDetails from "@/views/SingleDetails.vue";

@Options({
  computed: {
    staticSidenav: (): boolean => {
      return store.getters.breakpoints.gt.sm;
    },
    isAlbumViewFixed: (): boolean => {
      return store.getters.breakpoints.gt.sm;
    },
    largePlayer: (): boolean => {
      return store.getters.breakpoints.gt.xs;
    },
    errorDialogData: (): ErrorDialogData | null => {
      return store.getters.errorDialogData;
    },
    isLoadingSession: (): boolean => {
      return store.getters.isLoadingSession;
    },
    browsingViewTitle: (): string | null => {
      return store.getters.browsingViewTitle;
    },
    albumViewTitle: (): string | null => {
      return store.getters.albumViewTitle;
    },
    isAlbumViewActive: (): boolean => {
      return store.getters.isAlbumViewActive;
    },
    selectedAlbum: (): Album | null => {
      return store.getters.selectedAlbum;
    },
    selectedSingle: (): Single | null => {
      return store.getters.selectedSingle;
    },
    playlist: (): ReadonlyArray<Song> => {
      return store.getters.playlist;
    },
    songsLocation: (): ReadonlyArray<SongLocation> => {
      return store.getters.songsLocation;
    },
    queue: (): ReadonlyArray<number> => {
      return store.getters.queue;
    },
    songPlaying: (): Song | null => {
      return store.getters.songPlaying;
    },
    isPlaying: (): boolean => {
      return store.getters.isPlaying;
    },
    isLoadingPlaylist: (): boolean => {
      return store.getters.isLoadingPlaylist;
    },
  },
  components: {
    SingleDetails,
    AlbumDetails,
    Sidenav,
    Player,
    Header,
    SessionDialog,
    ErrorDialog,
  },
})
export default class Home extends Vue {
  readonly darkTheme = darkTheme;
  readonly config = CONFIG;

  mounted(): void {
    this.$nextTick(() => {
      // invoke(Command.ShowWindow);
      store.dispatch.setIsLoadingSession(true);
    });

    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  unmounted(): void {
    window.removeEventListener("resize", this.onResize);
  }

  onResize(): void {
    store.dispatch.updateBreakpoints();
  }
}
</script>
