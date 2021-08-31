<template>
  <el-menu
    :default-active="'/featured'"
    class="el-menu-vertical-demo"
    :collapse="true"
    router
  >
    <el-menu-item :index="'/featured'">
      <font-awesome-icon :icon="['far', 'bookmark']"></font-awesome-icon>
      <template #title>Featured</template>
    </el-menu-item>
    <el-menu-item :index="'/latest'">
      <font-awesome-icon :icon="['far', 'clock']"></font-awesome-icon>
      <template #title>Latest</template>
    </el-menu-item>

    <el-submenu index="3">
      <template #title>
        <font-awesome-icon
          :icon="['far', 'caret-square-right']"
        ></font-awesome-icon>
        <span>Browse Tapes</span>
      </template>
      <el-menu-item index="/trending-tapes">Trending Tapes</el-menu-item>
      <el-menu-item index="/best-tapes">Best Tapes</el-menu-item>
    </el-submenu>

    <el-submenu index="4">
      <template #title>
        <font-awesome-icon :icon="['far', 'play-circle']"></font-awesome-icon>
        <span>Browse Songs</span>
      </template>
      <el-menu-item index="/trending-songs">Trending Songs</el-menu-item>
      <el-menu-item index="/best-songs">Best Songs</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Sidenav extends Vue {
  mounted(): void {
    // remove menu poppers
    document
      .querySelectorAll(".el-menu-item > div")
      .forEach((itemPopper: Element) => {
        const popperId = itemPopper.getAttribute("aria-describedby");
        if (popperId) document.getElementById(popperId)?.remove();
      });
  }
}
</script>

<style lang="scss" scoped></style>
