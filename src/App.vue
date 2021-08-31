<style src="./styles/styles.scss" lang="scss"></style>

<template>
  <el-container class="wrapper">
    <el-container>
      <!--  TODO: Enable in desktop mode  -->
      <el-aside v-if="false">
        <Sidenav></Sidenav>
      </el-aside>

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

  <!--  TODO: Disable in desktop mode  -->
  <el-drawer
    v-if="true"
    v-model="isDrawerVisible"
    direction="ltr"
    :with-header="false"
  >
    <Sidenav></Sidenav>
  </el-drawer>

  <SessionDialog
    :session-loading="isLoadingSession()"
    @session-loaded="onSessionLoaded($event)"
  ></SessionDialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { invoke } from "@tauri-apps/api";
import store from "@/store";
import Header from "@/components/Header.vue";
import Sidenav from "@/components/Sidenav.vue";
import SessionDialog from "@/components/SessionDialog.vue";
import { MMSession } from "@/models/backend/mm-session";
import { Commands } from "@/models/backend/commands";

@Options({
  components: {
    Header,
    SessionDialog,
    Sidenav,
  },
})
export default class App extends Vue {
  isDrawerVisible = false;

  mounted(): void {
    invoke(Commands.ShowWindow);
    window.addEventListener("resize", this.onResize);
    this.onResize();
    store.dispatch.loadSession();
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

  toggleSecondaryView(showView: boolean): void {
    store.dispatch.toggleSecondaryView(showView);
  }

  onSessionLoaded(result: MMSession): void {
    store.dispatch.setSession(result);
  }

  onResize(): void {
    store.dispatch.updateBreakpoints();
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
}
</style>
