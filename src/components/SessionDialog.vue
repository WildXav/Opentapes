<template>
  <n-modal
    :show="isLoadingSession"
    preset="card"
    title="Requesting new session"
    :mask-closable="false"
    :closable="false"
    class="max-w-xs md:max-w-lg lg:max-w-xl"
  >
    <div class="flex justify-center">
      <n-spin size="large" />
    </div>
    <template #footer />
  </n-modal>
</template>

<script lang="ts">
import store from "@/store";
import { invoke } from "@tauri-apps/api";
import { Options, Vue } from "vue-class-component";
import { Error } from "@/models/backend/error";
import { ErrorDialogData } from "@/models/error-dialog-data";
import { MMSession } from "@/models/backend/mm-session";
import { Command } from "@/models/backend/command";

@Options({
  props: {
    isLoadingSession: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    isLoadingSession(isLoading: boolean) {
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
