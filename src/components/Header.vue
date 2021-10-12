<template>
  <n-layout-header
    bordered
    class="app-header px-5"
    :style="{ height: config.headerHeight + 'px' }"
  >
    <n-tabs
      v-if="!!primaryViewTitle"
      :class="{ disabled: !secondaryViewTitle }"
      size="large"
    >
      <n-tab-pane name="primary-view" :tab="primaryViewTitle" />
      <n-tab-pane
        v-if="!!secondaryViewTitle"
        name="secondary-view"
        :tab="secondaryViewTitle"
      />
    </n-tabs>
  </n-layout-header>
</template>

<script lang="ts">
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import { CONFIG } from "@/config";

@Options({
  props: {
    primaryViewTitle: String,
    secondaryViewTitle: String,
    isSecondaryViewActive: {
      type: Boolean,
      required: true,
    },
  },
})
export default class Header extends Vue {
  isSecondaryViewActive!: boolean;
  readonly config = CONFIG;

  toggleSecondaryView(value: boolean): void {
    if (this.isSecondaryViewActive === value) return;
    store.dispatch.toggleSecondaryView(value);
  }
}
</script>

<style lang="scss">
.app-header {
  .n-tabs,
  .n-tabs-nav,
  .n-tabs-tab-wrapper,
  .n-tabs-tab,
  .v-x-scroll,
  .n-tabs-nav-scroll-content {
    @apply h-full;
  }

  .n-tabs.disabled {
    .n-tabs-tab {
      @apply cursor-default;

      .n-tabs-tab__label {
        color: var(--tab-text-color);
      }
    }

    .n-tabs-bar {
      @apply hidden;
    }
  }
}
</style>
