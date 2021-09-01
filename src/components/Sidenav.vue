<template>
  <el-menu
    :default-active="$route.path"
    id="navMenu"
    class="el-menu-vertical-demo"
    :collapse="true"
    router
  >
    <template v-for="item in routes" :key="item.name">
      <el-submenu v-if="'routes' in item" :index="item.id">
        <template #title>
          <svg-icon :name="item.iconName"></svg-icon>
          <span>{{ item.name }}</span>
        </template>

        <template v-for="child in item.routes" :key="child.name">
          <el-menu-item :index="child.path">{{ child.name }}</el-menu-item>
        </template>
      </el-submenu>

      <el-menu-item v-else :index="item.alias || item.path">
        <svg-icon :name="item.iconName"></svg-icon>
        <template #title>{{ item.name }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SvgIcon from "@/components/SvgIcon.vue";
import { ROUTES } from "@/router/routes";

@Options({
  components: {
    SvgIcon,
  },
})
export default class Sidenav extends Vue {
  routes = ROUTES;

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

<style lang="scss">
#navMenu {
  &.el-menu--collapse {
    width: 54px;
    min-width: 54px;
    max-width: 54px;

    > .el-menu-item,
    > .el-submenu {
      text-align: center;
    }
  }

  .el-menu-item > div,
  .el-submenu__title {
    padding: 0 !important;
  }

  .el-submenu.is-active .el-submenu__title {
    color: var(--el-color-primary);
  }

  .svg-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
