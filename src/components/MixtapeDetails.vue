<template>
  <div
    class="cover"
    :style="{ 'background-image': 'url(\'' + tape.images[0].medium + '\')' }"
  >
    <div class="title">
      <h1>{{ tape.name }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Mixtape } from "@/models/mixtape";

@Options({
  props: {
    tape: {
      type: Mixtape,
      required: true,
    },
  },
})
export default class MixtapeDetails extends Vue {}
</script>

<style lang="scss" scoped>
.cover {
  height: 100px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.title {
  display: flex;
  align-items: flex-end;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;

  h1 {
    margin-left: 5px;
    margin-bottom: 3px;
    font-size: 18px;
    text-shadow: 0 0 5px #000000;
  }
}
</style>
