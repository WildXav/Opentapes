<template>
  <div id="header">
    <el-button
      @click="showDrawer"
      id="navBtn"
      class="icon-button"
      size="medium"
      circle
      plain
    >
      <font-awesome-icon icon="bars" size="2x"></font-awesome-icon>
    </el-button>

    <div class="title">
      <el-link
        href="#"
        :underline="false"
        :type="showSecondaryView ? 'info' : 'default'"
        @click="toggleSecondaryView(false)"
      >
        {{ primaryViewTitle }}
      </el-link>

      <template v-if="!!secondaryViewTitle">
        <font-awesome-icon icon="chevron-right" size="xs"></font-awesome-icon>
        <el-link
          href="#"
          :underline="false"
          :type="showSecondaryView ? 'default' : 'info'"
          @click="toggleSecondaryView(true)"
        >
          {{ secondaryViewTitle }}
        </el-link>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

enum Events {
  ShowDrawer = "showDrawer",
  ToggleSecondaryView = "ToggleSecondaryView",
}

@Options({
  props: {
    primaryViewTitle: String,
    secondaryViewTitle: String,
    showSecondaryView: Boolean,
  },
  emits: [Events.ShowDrawer, Events.ToggleSecondaryView],
})
export default class Header extends Vue {
  showSecondaryView!: boolean;

  showDrawer(): void {
    document.getElementById("navBtn")?.blur();
    this.$emit(Events.ShowDrawer);
  }

  toggleSecondaryView(value: boolean): void {
    if (this.showSecondaryView === value) {
      return;
    }
    this.$emit(Events.ToggleSecondaryView, value);
  }
}
</script>

<style lang="scss" scoped>
#header {
  display: flex;
  align-items: center;
  height: 100%;
}

#navBtn {
  border: none;
  margin-right: 3px;
}

.title {
  display: flex;
  align-items: center;
  padding-top: 1px;
  margin: 0;
  font-size: 18px;
  overflow: hidden;

  .el-link {
    display: block;
    padding-top: 3px;
    font-size: inherit;
    white-space: nowrap;
    overflow: inherit;
    text-overflow: ellipsis;

    &:first-child {
      overflow: visible;
    }

    &.el-link--default {
      font-weight: bold;

      &:hover {
        color: var(--el-link-default-font-color);
        cursor: default;
      }
    }

    &.el-link--info {
      font-weight: bold;

      &:hover {
        color: var(--el-color-primary);
      }
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
