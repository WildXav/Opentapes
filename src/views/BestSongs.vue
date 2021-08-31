<template>Best Singles view works</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store";

export default class BestSongs extends Vue {
  mounted(): void {
    store.dispatch.setPrimaryViewTitle("Best Songs");
  }
}
</script>
