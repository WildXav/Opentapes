<template>Trending Songs view works</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store";

export default class TrendingSongs extends Vue {
  mounted(): void {
    store.dispatch.setPrimaryViewTitle("Trending Songs");
  }
}
</script>
