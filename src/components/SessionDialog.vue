<template>
  <el-dialog
    title="Requesting new session"
    v-model="isDialogVisible"
    width="400px"
    :show-close="false"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <div v-if="!error" class="wrapper">
      <font-awesome-icon icon="spinner" size="3x" spin />
    </div>

    <div v-if="!!error" class="wrapper error">
      <font-awesome-icon icon="times" size="3x" />
      <h3>{{ error.reason }}</h3>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button v-if="!!error" @click="retry" type="primary">
          Retry
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { invoke } from "@tauri-apps/api";
import { Commands } from "@/models/backend/commands";
import { MMSession } from "@/models/backend/mm-session";
import { Error } from "@/models/backend/error";

enum Events {
  SessionLoaded = "sessionLoaded",
}

@Options({
  props: {
    sessionLoading: Boolean,
  },
  watch: {
    sessionLoading(isLoading: boolean) {
      if (isLoading) this.requestNewSession();
    },
  },
  emits: [Events.SessionLoaded],
})
export default class SessionDialog extends Vue {
  isDialogVisible = false;
  error: Error | null = null;

  requestNewSession(): void {
    this.isDialogVisible = true;
    const loadingStart = performance.now();

    invoke<MMSession>(Commands.RequestNewSession)
      .then((session) => {
        const loadingDuration = performance.now() - loadingStart;

        setTimeout(() => {
          this.isDialogVisible = false;
          this.error = null;
          this.$emit(Events.SessionLoaded, session);
        }, Math.max(1000 - loadingDuration, 0));
      })
      .catch((err: Error) => {
        this.error = err;
        console.error(err.reason, err.details);
      });
  }

  retry(): void {
    this.error = null;
    this.requestNewSession();
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: center;

  &.error {
    color: var(--el-color-danger);
  }

  h3 {
    margin-bottom: 0;
  }
}
</style>
