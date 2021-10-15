<template>
  <n-layout-footer
    bordered
    class="p-5"
    :style="{ height: config.footerHeight + 'px' }"
  >
    Chengfu Road
  </n-layout-footer>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { CONFIG } from "@/config";

@Options({})
export default class Player extends Vue {
  readonly config = CONFIG;
}
</script>
