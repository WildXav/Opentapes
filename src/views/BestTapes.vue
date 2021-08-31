<template>Best Tapes view works</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store";

export default class BestTapes extends Vue {
  mounted(): void {
    store.dispatch.setPrimaryViewTitle("Best Tapes");
  }
}
</script>
