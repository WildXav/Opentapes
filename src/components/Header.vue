<template>
  <div id="header">
    <div class="breadcrumb">
      <div
        class="page-title"
        :class="{ active: !showSecondaryView }"
        @click="toggleSecondaryView(false)"
      >
        {{ primaryViewTitle }}
      </div>

      <template v-if="!!secondaryViewTitle">
        <font-awesome-icon icon="chevron-right" size="xs"></font-awesome-icon>
        <div
          class="page-title"
          :class="{ active: showSecondaryView }"
          @click="toggleSecondaryView(true)"
        >
          {{ secondaryViewTitle }}
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store";

@Options({
  props: {
    primaryViewTitle: String,
    secondaryViewTitle: String,
    showSecondaryView: Boolean,
  },
})
export default class Header extends Vue {
  showSecondaryView!: boolean;

  toggleSecondaryView(value: boolean): void {
    if (this.showSecondaryView === value) {
      return;
    }
    store.dispatch.toggleSecondaryView(value);
  }
}
</script>

<style lang="scss" scoped>
#header {
  display: flex;
  align-items: center;
  height: 100%;
}

.breadcrumb {
  display: flex;
  align-items: center;
  padding-top: 1px;
  margin: 0;
  font-size: 18px;
  overflow: hidden;

  .page-title {
    padding-top: 3px;
    font-size: inherit;
    font-weight: bold;
    white-space: nowrap;
    overflow: inherit;
    text-overflow: ellipsis;
    cursor: pointer;
    color: var(--el-color-info);

    &:first-child {
      overflow: visible;
    }

    &:hover {
      color: var(--el-color-primary);
    }

    &.active,
    &.active:hover {
      color: var(--el-text-color-regular);
      cursor: default;
    }
  }

  .fa-chevron-right {
    margin: 0 5px;
  }
}
</style>

<style lang="scss">
#header #navBtn svg {
  width: 18px;
  height: 18px;
}
</style>
