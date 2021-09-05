<template>
  <el-dialog
    v-model="isDialogVisible"
    width="400px"
    custom-class="error-dialog"
    :show-close="!!isDialogVisible && !!dialogData && dialogData.showClose"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <el-result
      v-if="!!dialogData"
      icon="error"
      :title="dialogData.error.reason"
      :subTitle="dialogData.error.details"
    >
      <template #extra>
        <el-button
          v-if="!!dialogData.retryCallback"
          @click="retry"
          type="primary"
          size="medium"
        >
          Retry
        </el-button>
      </template>
    </el-result>
  </el-dialog>
</template>

<script lang="ts">
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import { ErrorDialogData } from "@/models/error-dialog-data";

@Options({
  props: {
    dialogData: ErrorDialogData,
  },
  watch: {
    dialogData(dialogData: ErrorDialogData | null) {
      this.isDialogVisible = !!dialogData;
    },
  },
})
export default class ErrorDialog extends Vue {
  isDialogVisible = false;
  dialogData!: ErrorDialogData | null;

  retry(): void {
    if (!this.dialogData || !this.dialogData.retryCallback) return;
    store.dispatch.setErrorDialogData(null);
    this.dialogData.retryCallback();
  }
}
</script>

<style lang="scss">
.error-dialog {
  .el-dialog__header,
  .el-dialog__body {
    padding: 0;
  }
}
</style>
