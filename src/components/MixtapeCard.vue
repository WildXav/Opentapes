<template>
  <el-card :body-style="{ padding: '0px' }" class="box-card">
    <div class="cover-container">
      <div class="title select">{{ tape.name }}</div>
      <div class="overlay"></div>

      <img :src="coverUrl()" class="cover" alt="cover" />
    </div>
    <div class="artists select">
      {{ artists() }}
    </div>
  </el-card>
</template>

<script lang="ts">
import View from "@/views/View.vue";
import { Options } from "vue-class-component";
import { Mixtape } from "@/models/mixtape";

@Options({
  props: {
    tape: {
      type: Mixtape,
      required: true,
    },
  },
})
export default class MixtapeCard extends View {
  tape!: Mixtape;

  coverUrl(): string | null {
    if (this.tape.images.length === 0) return null;
    return this.tape.images.map((image) => image.small)[0];
  }

  artists(): string {
    return this.tape.artists.main.map((artist) => artist.name).join(", ");
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  flex: 0 1 49%;
  margin-bottom: 10px;

  .cover-container {
    position: relative;
    display: flex;
    width: 100%;
    cursor: pointer;
    margin-bottom: 5px;

    &:hover .overlay {
      opacity: 1;
    }

    .title {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.6);
      color: #fff;
      width: 100%;
      padding: 5px;
      overflow: hidden;
      max-height: 43px;
      opacity: 1 !important;
      z-index: 1;
    }

    .overlay {
      position: absolute;
      opacity: 0;
      background-color: rgba(0, 0, 0, 0.3);
      width: 100%;
      height: 100%;
      transition: opacity 200ms;
    }

    .cover {
      width: 100%;
    }
  }

  .artists {
    padding: 10px 8px;
    font-size: 14px;
  }
}
</style>
