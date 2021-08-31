<template>Latest view works</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store";

export default class Latest extends Vue {
  mounted(): void {
    store.dispatch.setPrimaryViewTitle("Latest");
  }
}
</script>
