<template>
  <n-card class="h-full" content-style="padding: 0;">
    <div class="cover-container">
      <div class="title select">{{ album.name }}</div>
      <div class="overlay"></div>

      <img :src="album.smallCoverUrl" class="cover" alt="cover" />
    </div>
    <div class="artists select">
      {{ album.mainArtists }}
    </div>
  </n-card>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Album } from "@/models/album";

@Options({
  props: {
    album: {
      type: Album,
      required: true,
    },
  },
})
export default class AlbumCard extends Vue {}
</script>

<style lang="scss" scoped>
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
  padding: 8px 5px;
  font-size: 14px;
}
</style>
