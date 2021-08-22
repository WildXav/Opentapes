<style src="./styles/styles.scss" lang="scss"></style>

<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store";

export default class App extends Vue {
  mounted(): void {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  onResize(): void {
    store.dispatch.updateBreakpoints();
  }
}
</script>
