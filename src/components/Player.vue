<template>
  <n-layout-footer
    bordered
    class="flex p-2"
    :style="{ height: config.footerHeight + 'px' }"
  >
    <div class="flex items-center h-full flex-auto overflow-hidden">
      <n-spin v-if="!isReady()" size="small" class="ml-2" />
      <template v-else-if="songPlaying">
        <img
          class="h-full mr-1.5 rounded"
          :src="songPlaying.thumbnailCoverUrl"
          alt="cover"
        />

        <div class="flex flex-col flex-auto overflow-hidden">
          <h4 class="nowrap-ellipsis font-semibold">
            {{ songPlaying.name }}
          </h4>
          <div class="nowrap-ellipsis">
            <span class="text-sm">{{ songPlaying.mainArtists }}</span>
            <span v-if="songPlaying.featureArtists" class="text-xs">
              (feat. {{ songPlaying.featureArtists }})
            </span>
          </div>
        </div>
      </template>
    </div>

    <div class="flex flex-none h-full gap-x-2.5">
      <n-button
        text
        class="text-2xl"
        :disabled="!isReady() || !songPlaying"
        @click="resetPlayback"
      >
        <n-icon>
          <play-skip-back-outline />
        </n-icon>
      </n-button>

      <n-button
        text
        class="text-2xl"
        :disabled="!isReady() || !songPlaying"
        @click="togglePlayback"
      >
        <n-icon>
          <pause-outline v-if="isReady() && isPlaying" />
          <play-outline v-else />
        </n-icon>
      </n-button>

      <n-button
        text
        class="text-2xl"
        :disabled="!isReady() || !songPlaying || !hasNext()"
        @click="playNext"
      >
        <n-icon>
          <play-skip-forward-outline />
        </n-icon>
      </n-button>
    </div>
  </n-layout-footer>
</template>

<script lang="ts">
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import { SongLocation } from "@/models/song-location";
import { Song } from "@/models/song";
import { CONFIG } from "@/config";
import {
  PauseOutline,
  PlayOutline,
  PlaySkipBackOutline,
  PlaySkipForwardOutline,
} from "@vicons/ionicons5";

@Options({
  components: {
    PauseOutline,
    PlayOutline,
    PlaySkipBackOutline,
    PlaySkipForwardOutline,
  },
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
    shuffle: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    queue() {
      this.playedIndexes = [];
      this.playNext();
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
  private shuffle!: boolean;
  private audio = new Audio();
  private isBuffering = false;
  private playedIndexes: Array<number> = [];

  mounted(): void {
    this.audio.addEventListener("waiting", () => (this.isBuffering = true));
    this.audio.addEventListener("playing", () => (this.isBuffering = false));
    this.audio.addEventListener("ended", () => {
      if (this.playedIndexes.length < this.queue.length) {
        this.playNext();
      } else {
        store.dispatch.setIsPlaying(false);
      }
    });
  }

  playNext(): void {
    const nextSongIndex = this.pickNextSongIndex() as number;
    const songId = this.queue[nextSongIndex];
    this.audio.src = this.songsLocation
      .filter((e) => e.songId === songId)
      .map((e) => e.url)[0];

    const song = this.playlist.find((e) => e.id === songId) || null;
    this.playedIndexes.push(nextSongIndex);
    store.dispatch.setSongPlaying(song);

    this.isPlaying ? this.resume() : store.dispatch.setIsPlaying(true);
  }

  pickNextSongIndex(): number | null {
    return this.playedIndexes.length === 0
      ? 0
      : this.playedIndexes[this.playedIndexes.length - 1] + 1;
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

  hasNext(): boolean {
    return this.playedIndexes.length < this.queue.length;
  }

  togglePlayback(): void {
    store.dispatch.setIsPlaying(!this.isPlaying);
  }
}
</script>
