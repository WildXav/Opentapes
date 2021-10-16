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
          :content-style="{ 'justify-content': 'space-between' }"
        >
          <n-layout :style="{ position: 'static' }">
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
              !selectedAlbum || (!isAlbumViewFixed && !isAlbumViewActive)
            "
          />
        </n-layout>
      </n-layout>
    </n-layout>

    <Player />

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

@Options({
  computed: {
    staticSidenav: (): boolean => {
      return store.getters.breakpoints.gt.md;
    },
    isAlbumViewFixed: (): boolean => {
      return store.getters.breakpoints.gt.md;
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
  },
  components: { Sidenav, Player, Header, SessionDialog, ErrorDialog },
})
export default class Home extends Vue {
  readonly darkTheme = darkTheme;
  readonly config = CONFIG;

  mounted(): void {
    this.$nextTick(() => {
      invoke(Command.ShowWindow);
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
