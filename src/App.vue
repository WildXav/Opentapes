<style src="./styles/styles.scss" lang="scss"></style>

<template>
  <el-container class="wrapper">
    <el-container>
      <Sidenav />

      <el-container>
        <el-header>
          <Header
            :primary-view-title="primaryViewTitle()"
            :secondary-view-title="secondaryViewTitle()"
            :show-secondary-view="showSecondaryView()"
          />
        </el-header>

        <el-main>
          <router-view />
          <MixtapeDetails
            v-if="!!getSelectedTape()"
            v-show="showSecondaryView()"
            :tape="getSelectedTape()"
          />
        </el-main>
      </el-container>
    </el-container>

    <el-footer>
      <Player
        :playlist="getPlaylist()"
        :songs-location="getSongsLocation()"
        :queue="getQueue()"
        :song-playing="getSongPlaying()"
        :is-playing="getIsPlaying()"
        :is-loading-playlist="getIsLoadingPlaylist()"
      />
    </el-footer>
  </el-container>

  <SessionDialog :session-loading="isLoadingSession()" />
  <ErrorDialog :dialogData="getErrorDialogData()" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { invoke } from "@tauri-apps/api";
import store from "@/store";
import Header from "@/components/Header.vue";
import Sidenav from "@/components/Sidenav.vue";
import SessionDialog from "@/components/SessionDialog.vue";
import { Command } from "@/models/backend/command";
import ErrorDialog from "@/components/ErrorDialog.vue";
import { ErrorDialogData } from "@/models/error-dialog-data";
import MixtapeDetails from "@/views/MixtapeDetails.vue";
import { Mixtape } from "@/models/mixtape";
import Player from "@/components/Player.vue";
import { Song } from "@/models/song";
import { SongLocation } from "@/models/song-location";

@Options({
  components: {
    Player,
    ErrorDialog,
    Header,
    MixtapeDetails,
    SessionDialog,
    Sidenav,
  },
  watch: {
    $route() {
      if (store.getters.showSecondaryView) {
        store.dispatch.toggleSecondaryView(false);
      }
    },
  },
})
export default class App extends Vue {
  mounted(): void {
    invoke(Command.ShowWindow);
    window.addEventListener("resize", this.onResize);
    this.onResize();
    store.dispatch.setIsLoadingSession(true);
  }

  isLoadingSession(): boolean {
    return store.getters.isLoadingSession;
  }

  primaryViewTitle(): string | null {
    return store.getters.primaryViewTitle;
  }

  secondaryViewTitle(): string | null {
    return store.getters.secondaryViewTitle;
  }

  showSecondaryView(): boolean {
    return store.getters.showSecondaryView;
  }

  getErrorDialogData(): ErrorDialogData | null {
    return store.getters.errorDialogData;
  }

  getSelectedTape(): Mixtape | null {
    return store.getters.selectedTape;
  }

  getPlaylist(): ReadonlyArray<Song> {
    return store.getters.playlist;
  }

  getSongsLocation(): ReadonlyArray<SongLocation> {
    return store.getters.songsLocation;
  }

  getQueue(): ReadonlyArray<number> {
    return store.getters.queue;
  }

  getSongPlaying(): Song | null {
    return store.getters.songPlaying;
  }

  getIsPlaying(): boolean {
    return store.getters.isPlaying;
  }

  getIsLoadingPlaylist(): boolean {
    return store.getters.isLoadingPlaylist;
  }

  onResize(): void {
    store.dispatch.updateBreakpoints();
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;

  > .el-container {
    overflow: hidden;
  }
}
</style>
