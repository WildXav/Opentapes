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
          <Header @show-drawer="showDrawer = true"></Header>
        </el-header>
        <router-view />
      </el-container>
    </el-container>

    <el-footer></el-footer>
  </el-container>

  <!--  TODO: Disable in desktop mode  -->
  <el-drawer
    v-if="true"
    v-model="showDrawer"
    :direction="'ltr'"
    :with-header="false"
  >
    <Sidenav></Sidenav>
  </el-drawer>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store";
import Header from "@/components/Header.vue";
import Sidenav from "@/components/Sidenav.vue";

@Options({
  components: {
    Header,
    Sidenav,
  },
})
export default class App extends Vue {
  showDrawer = false;

  mounted(): void {
    window.addEventListener("resize", this.onResize);
    this.onResize();
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
