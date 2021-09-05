<template>
  <el-dialog
    title="Requesting new session"
    v-model="isDialogVisible"
    width="400px"
    :show-close="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <div v-loading="true" class="loader"></div>

    <template #footer>
      <span class="dialog-footer"></span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import { Command } from "@/models/backend/command";
import { MMSession } from "@/models/backend/mm-session";
import { Error } from "@/models/backend/error";
import { ErrorDialogData } from "@/models/error-dialog-data";
import { invoke } from "@tauri-apps/api";

@Options({
  props: {
    sessionLoading: Boolean,
  },
  watch: {
    sessionLoading(isLoading: boolean) {
      if (isLoading) {
        this.isDialogVisible = true;
        this.requestNewSession();
      } else this.isDialogVisible = false;
    },
  },
})
export default class SessionDialog extends Vue {
  isDialogVisible = false;

  requestNewSession(): void {
    invoke<MMSession>(Command.RequestNewSession)
      .then((session) => store.dispatch.setSession(session))
      .catch((error: Error) => {
        store.dispatch.setErrorDialogData(
          new ErrorDialogData(error, false, () =>
            store.dispatch.setIsLoadingSession(true)
          )
        );
      })
      .finally(() => {
        store.dispatch.setIsLoadingSession(false);
      });
  }
}
</script>

<style lang="scss" scoped>
.loader {
  margin: auto;
}
</style>
