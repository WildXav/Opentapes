<template>
  <n-layout-footer
    bordered
    class="p-5"
    :style="{ height: config.footerHeight + 'px' }"
  >
    IsPlaying: {{ isPlaying }} Paused: {{ audio.paused }} Ended:
    {{ audio.ended }}
  </n-layout-footer>
</template>

<script lang="ts">
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import { SongLocation } from "@/models/song-location";
import { Song } from "@/models/song";
import { CONFIG } from "@/config";

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
    queue(newQueue, oldQueue) {
      if (newQueue[0] !== oldQueue[0]) {
        this.currentSongIndex = 0;
        this.play();
      } else {
        this.resetPlayback();
        if (!this.isPlaying) {
          store.dispatch.setIsPlaying(true);
        }
      }
    },
    isPlaying(isPlaying) {
      const audioPlaying = !this.audio.paused && !this.audio.ended;
      if ((isPlaying && audioPlaying) || (!isPlaying && !audioPlaying)) {
        return;
      }

      isPlaying ? this.resume() : this.pause();
    },
  },
})
export default class Player extends Vue {
  readonly config = CONFIG;
  private playlist!: ReadonlyArray<Song>;
  private songsLocation!: ReadonlyArray<SongLocation>;
  private queue!: ReadonlyArray<number>;
  private isPlaying!: boolean;
  private isLoadingPlaylist!: boolean;
  private audio = new Audio();
  private isBuffering = false;
  private currentSongIndex = 0;

  mounted(): void {
    this.audio.addEventListener("waiting", () => (this.isBuffering = true));
    this.audio.addEventListener("playing", () => (this.isBuffering = false));
    this.audio.addEventListener("ended", () => {
      if (this.currentSongIndex < this.queue.length - 1) {
        this.currentSongIndex++;
        this.play();
      } else {
        store.dispatch.setIsPlaying(false);
      }
    });
  }

  play(): void {
    const songId = this.queue[this.currentSongIndex];
    this.audio.src = this.songsLocation
      .filter((e) => e.songId === songId)
      .map((e) => e.url)[0];

    const song = this.playlist.find((e) => e.id === songId) || null;
    store.dispatch.setSongPlaying(song);

    this.isPlaying ? this.resume() : store.dispatch.setIsPlaying(true);
  }

  resume(): void {
    if (this.audio.ended) {
      this.resetPlayback();
    }
    this.audio.play();
  }

  pause(): void {
    this.audio.pause();
  }

  resetPlayback(): void {
    this.audio.currentTime = 0;
  }

  isReady(): boolean {
    return !this.isLoadingPlaylist && !this.isBuffering;
  }

  isAudioPlaying(): boolean {
    return !this.audio.paused && !this.audio.ended;
  }

  togglePlayback(): void {
    store.dispatch.setIsPlaying(!this.isPlaying);
  }
}
</script>
