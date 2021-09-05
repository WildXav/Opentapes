<style src="./styles/styles.scss" lang="scss"></style>

<template>
  <el-container class="wrapper">
    <el-container>
      <Sidenav></Sidenav>

      <el-container>
        <el-header>
          <Header
            :primary-view-title="primaryViewTitle()"
            :secondary-view-title="secondaryViewTitle()"
            :show-secondary-view="showSecondaryView()"
            @show-drawer="isDrawerVisible = true"
            @toggle-secondary-view="toggleSecondaryView($event)"
          ></Header>
        </el-header>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>

    <el-footer></el-footer>
  </el-container>

  <SessionDialog :session-loading="isLoadingSession()"></SessionDialog>
  <ErrorDialog :dialogData="getErrorDialogData()"></ErrorDialog>
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

@Options({
  components: {
    ErrorDialog,
    Header,
    SessionDialog,
    Sidenav,
  },
})
export default class App extends Vue {
  isDrawerVisible = false;

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

  toggleSecondaryView(showView: boolean): void {
    store.dispatch.toggleSecondaryView(showView);
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
