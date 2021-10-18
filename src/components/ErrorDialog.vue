<template>
  <n-modal
    :show="!!dialogData"
    preset="card"
    :mask-closable="false"
    :closable="dialogData?.showClose"
    @close="close"
    class="max-w-xs md:max-w-lg lg:max-w-xl"
  >
    <n-result
      status="error"
      :title="dialogData?.error.reason"
      :description="dialogData?.error.details"
      class="select-text"
      size="small"
    >
      <template v-if="!!dialogData?.retryCallback" #footer>
        <n-button class="select-none" @click="retry" type="primary">
          Retry
        </n-button>
      </template>
    </n-result>
  </n-modal>
</template>

<script lang="ts">
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import { ErrorDialogData } from "@/models/error-dialog-data";

@Options({
  props: {
    dialogData: ErrorDialogData,
  },
})
export default class ErrorDialog extends Vue {
  dialogData!: ErrorDialogData | null;

  retry(): void {
    if (!this.dialogData || !this.dialogData.retryCallback) return;
    this.close();
    setTimeout(this.dialogData.retryCallback, 100);
  }

  close(): void {
    store.dispatch.setErrorDialogData(null);
  }
}
</script>
