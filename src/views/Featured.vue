<template>Featured view works</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store";

export default class Featured extends Vue {
  mounted(): void {
    store.dispatch.setPrimaryViewTitle("Featured");
  }
}
</script>
