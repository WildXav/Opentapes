<template>
  <div class="wrapper">
    <el-button @click="showDrawer" type="primary" style="margin-left: 16px">
      Drawer
    </el-button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  emits: ["showDrawer"],
})
export default class Header extends Vue {
  showDrawer(): void {
    this.$emit("showDrawer");
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
}
</style>
