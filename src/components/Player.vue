<template>
  <div class="container">
    <div
      class="background"
      :style="{
        'background-image': 'url(\'' + songPlaying?.mediumCoverUrl + '\')',
      }"
    />
    <div v-if="isLoadingPlaylist || buffering" v-loading="true"></div>
    <div class="song-details select">
      <template v-if="!isLoadingPlaylist && !buffering">
        <h4 class="title">{{ songPlaying?.name }}</h4>
        <div class="artists">{{ songPlaying?.mainArtists }}</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import { SongLocation } from "@/models/song-location";
import { Song } from "@/models/song";

@Options({
  props: {
    playlist: {
      type: Array,
      required: true,
    },
    songsLocation: {
      type: Array,
      required: true,
    },
    queue: {
      type: Array,
      required: true,
    },
    songPlaying: {
      type: Song,
      required: false,
    },
    isPlaying: {
      type: Boolean,
      required: true,
    },
    isLoadingPlaylist: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    isPlaying() {
      this.isPlaying ? this.play() : this.pause();
    },
  },
})
export default class Player extends Vue {
  private playlist!: ReadonlyArray<Song>;
  private songsLocation!: ReadonlyArray<SongLocation>;
  private queue!: ReadonlyArray<number>;
  private isLoadingPlaylist!: boolean;
  private audio = new Audio();
  private buffering = false;

  isReady(): boolean {
    return (
      !this.isLoadingPlaylist &&
      !(this.audio && !this.audio.paused && this.audio.currentTime === 0)
    );
  }

  play(): void {
    const songId = this.queue[0];
    const songUrl = this.songsLocation
      .filter((e) => e.songId === songId)
      .map((e) => e.url)[0];
    const song = this.playlist.find((e) => e.id === songId);
    store.dispatch.setSongPlaying(song || null);
    this.audio = new Audio(songUrl);
    this.audio.play();
    this.audio.addEventListener("waiting", () => (this.buffering = true));
    this.audio.addEventListener("playing", () => (this.buffering = false));
  }

  pause(): void {
    this.audio.pause();
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 100%;
  position: relative;
}

.background {
  position: absolute;
  top: -25%;
  left: -25%;
  width: 150%;
  height: 150%;
  z-index: -1;
  opacity: 0.4;
  filter: blur(3px);
  background-position: center;
  background-size: cover;
}

.song-details {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  text-shadow: 0 0 1px rgba(255, 255, 255, 0.3);
  overflow: hidden;

  .title,
  .artists {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .title {
    margin: 0 0 3px;
  }

  .artists {
    font-size: var(--el-font-size-base);
  }
}
</style>
