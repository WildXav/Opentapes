<template>Trending Tapes view works</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store";

export default class TrendingTapes extends Vue {
  mounted(): void {
    store.dispatch.setPrimaryViewTitle("Trending Tapes");
  }
}
</script>
