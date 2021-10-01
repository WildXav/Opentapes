<template>
  <div class="control-button" @click="onClick()">
    <svg-icon :name="iconName"></svg-icon>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SvgIcon from "@/components/SvgIcon.vue";

enum Events {
  Clicked = "clicked",
}

@Options({
  components: {
    SvgIcon,
  },
  props: {
    iconName: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: [Events.Clicked],
})
export default class PlayerControlBtn extends Vue {
  private disabled?: boolean;

  onClick(): void {
    if (!this.disabled) {
      this.$emit(Events.Clicked);
    }
  }
}
</script>

<style lang="scss" scoped>
.control-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
}
</style>
