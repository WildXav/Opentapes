<template>
  <div class="wrapper">
    <el-button @click="showDrawer" type="primary" style="margin-left: 16px">
      Drawer
    </el-button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

enum Events {
  ShowDrawer = "showDrawer",
}

@Options({
  emits: [Events.ShowDrawer],
})
export default class Header extends Vue {
  showDrawer(): void {
    this.$emit(Events.ShowDrawer);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
}
</style>
