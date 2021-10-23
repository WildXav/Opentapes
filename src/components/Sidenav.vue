<template>
  <n-layout-sider
    class="z-20"
    :position="static ? 'static' : 'absolute'"
    collapse-mode="width"
    :collapsed-width="config.sidenavCollapsedWidth"
    :width="config.sidenavWidth"
    :collapsed="collapsed"
    :show-trigger="!static"
    bordered
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-space vertical justify="space-between" class="h-full">
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="config.sidenavCollapsedWidth"
        :collapsed-icon-size="config.sidenavIconSize"
        :options="mainMenuOptions"
        :default-expand-all="static"
        :value="$route.meta['key']"
      />

      <n-menu
        v-if="false"
        :collapsed="collapsed"
        :collapsed-width="config.sidenavCollapsedWidth"
        :collapsed-icon-size="config.sidenavIconSize"
        :options="secondaryMenuOptions"
        value=""
      />
    </n-space>
  </n-layout-sider>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { CONFIG } from "@/config";
import { ROUTES, routesToMenuOption } from "@/router/routes";
import { renderIcon } from "@/helpers/render-helper";
import { SettingsOutline } from "@vicons/ionicons5";

@Options({
  props: {
    static: Boolean,
  },
  watch: {
    static() {
      this.collapsed = !this.static;
    },
  },
})
export default class Sidenav extends Vue {
  readonly config = CONFIG;
  readonly mainMenuOptions = ROUTES.map((route) => routesToMenuOption(route));
  readonly secondaryMenuOptions = [
    {
      label: "Settings",
      key: "settings",
      icon: renderIcon(SettingsOutline),
    },
  ];
  collapsed = true;
}
</script>
