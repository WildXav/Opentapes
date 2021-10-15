<template>
  <n-config-provider class="flex flex-col h-full w-full" :theme="darkTheme">
    <n-layout has-sider>
      <Sidenav :static="staticSidenav" />

      <n-layout
        class="inner-layout"
        :style="{
          'padding-left':
            (staticSidenav ? 0 : config.sidenavCollapsedWidth) + 'px',
        }"
      >
        <Header
          :primary-view-title="primaryViewTitle"
          :secondary-view-title="secondaryViewTitle"
          :is-secondary-view-active="isSecondaryViewActive"
        />

        <n-layout>
          <router-view />
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

@Options({
  computed: {
    staticSidenav: (): boolean => {
      return store.getters.breakpoints.gt.sm;
    },
    errorDialogData: (): ErrorDialogData | null => {
      return store.getters.errorDialogData;
    },
    isLoadingSession: (): boolean => {
      return store.getters.isLoadingSession;
    },
    primaryViewTitle: (): string | null => {
      return store.getters.primaryViewTitle;
    },
    secondaryViewTitle: (): string | null => {
      return store.getters.secondaryViewTitle;
    },
    isSecondaryViewActive: (): boolean => {
      return store.getters.isSecondaryViewActive;
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

  onResize(): void {
    store.dispatch.updateBreakpoints();
  }
}
</script>
