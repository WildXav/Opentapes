<template>
  <n-layout-header
    bordered
    class="app-header px-5"
    :style="{ height: config.headerHeight + 'px' }"
  >
    <n-tabs
      v-if="!!browsingViewTitle"
      :class="{ disabled: isAlbumViewFixed || !albumViewTitle }"
      :justify-content="isAlbumViewFixed ? 'space-between' : undefined"
      :value="isAlbumViewActive ? 'album-view' : 'browsing-view'"
      :key="browsingViewTitle + albumViewTitle"
      size="large"
      ref="tabs"
    >
      <n-tab-pane
        name="browsing-view"
        :tab="browsingViewTitle"
        @click="toggleAlbumView(false)"
      />
      <n-tab-pane
        v-if="!!albumViewTitle"
        name="album-view"
        :tab="albumViewTitle"
        @click="toggleAlbumView(true)"
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
    browsingViewTitle: String,
    albumViewTitle: String,
    isAlbumViewActive: Boolean,
    isAlbumViewFixed: Boolean,
  },
})
export default class Header extends Vue {
  isAlbumViewActive!: boolean;
  readonly config = CONFIG;

  toggleAlbumView(value: boolean): void {
    if (this.isAlbumViewActive === value) return;
    store.dispatch.toggleAlbumView(value);
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
