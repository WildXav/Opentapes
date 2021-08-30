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
          <Header @show-drawer="isDrawerVisible = true"></Header>
        </el-header>
        <router-view />
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
    return store.getters.loadingSession;
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
