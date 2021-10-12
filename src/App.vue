<template>
  <n-config-provider class="flex flex-col h-full w-full" :theme="darkTheme">
    <n-layout has-sider>
      <n-layout-sider
        bordered
        position="absolute"
        collapse-mode="width"
        :collapsed-width="config.sidenavCollapsedWidth"
        :width="config.sidenavWidth"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-space vertical justify="space-between" class="h-full">
          <n-menu
            :collapsed="collapsed"
            :collapsed-width="config.sidenavCollapsedWidth"
            :collapsed-icon-size="config.sidenavIconSize"
            :options="mainMenuOptions"
            :value="$route.meta['key']"
          />

          <n-menu
            :collapsed="collapsed"
            :collapsed-width="config.sidenavCollapsedWidth"
            :collapsed-icon-size="config.sidenavIconSize"
            :options="secondaryMenuOptions"
            value=""
          />
        </n-space>
      </n-layout-sider>

      <n-layout
        class="inner-layout"
        :style="{ 'padding-left': config.sidenavCollapsedWidth + 'px' }"
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

    <n-layout-footer
      bordered
      class="p-5"
      :style="{ height: config.footerHeight + 'px' }"
    >
      Chengfu Road
    </n-layout-footer>

    <SessionDialog :is-loading-session="isLoadingSession" />
    <ErrorDialog :dialog-data="errorDialogData" />
  </n-config-provider>
</template>

<script lang="ts">
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import { darkTheme } from "naive-ui";
import { ROUTES, routesToMenuOption } from "@/router/routes";
import { SettingsOutline } from "@vicons/ionicons5";
import { renderIcon } from "@/helpers/render-helper";
import { CONFIG } from "@/config";
import { invoke } from "@tauri-apps/api";
import { Command } from "@/models/backend/command";
import ErrorDialog from "@/components/ErrorDialog.vue";
import { ErrorDialogData } from "@/models/error-dialog-data";
import SessionDialog from "@/components/SessionDialog.vue";
import Header from "@/components/Header.vue";

@Options({
  computed: {
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
  components: { Header, SessionDialog, ErrorDialog },
})
export default class Home extends Vue {
  readonly darkTheme = darkTheme;
  readonly mainMenuOptions = ROUTES.map((route) => routesToMenuOption(route));
  readonly secondaryMenuOptions = [
    {
      label: "Settings",
      key: "settings",
      icon: renderIcon(SettingsOutline),
    },
  ];
  readonly config = CONFIG;
  collapsed = true;

  mounted(): void {
    this.$nextTick(() => {
      invoke(Command.ShowWindow);
      store.dispatch.setIsLoadingSession(true);
    });
  }
}
</script>
