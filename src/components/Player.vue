<template>
  <n-layout-footer
    bordered
    class="flex p-2"
    :class="{ large: large }"
    :style="{
      height: config.footerHeight + 'px',
      'min-height': config.footerHeight + 'px',
    }"
  >
    <div class="song-info flex flex-auto items-center relative overflow-hidden">
      <n-spin v-show="!isReady()" size="small" class="absolute ml-2" />
      <div
        v-if="!!songPlaying"
        class="flex items-center h-full w-full overflow-hidden"
        :style="{ opacity: isReady() ? 100 : 0 }"
      >
        <img
          class="h-full mr-1.5 rounded"
          :src="songPlaying.thumbnailCoverUrl"
          alt="cover"
        />

        <div class="flex flex-col flex-auto overflow-hidden pr-2">
          <h4 class="nowrap-ellipsis font-semibold">
            {{ songPlaying.name }}
          </h4>
          <div class="nowrap-ellipsis">
            <span class="text-sm">{{ songPlaying.mainArtists }}</span>
            <span v-show="!!songPlaying.featureArtists" class="text-xs">
              (feat. {{ songPlaying.featureArtists }})
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-show="large"
      class="flex flex-auto justify-center items-center mx-3 gap-x-2"
    >
      <div class="progress-time">{{ playbackPositionStr }}</div>
      <n-slider
        :value="playbackPosition"
        :max="songDuration || 1"
        :tooltip="false"
        :disabled="!isReady() || !songPlaying"
        :on-update:value="onSlideUpdate"
        class="flex flex-auto"
      />
      <div class="progress-time">{{ songDurationStr }}</div>
    </div>

    <div class="flex flex-none h-full gap-x-3">
      <n-button
        text
        v-show="playbackPosition < 5"
        :disabled="!isReady() || !songPlaying || !hasPrevious()"
        @click="skipBack"
      >
        <n-icon><play-skip-back-outline /></n-icon>
      </n-button>
      <n-button
        text
        v-show="playbackPosition >= 5"
        :disabled="!isReady() || !songPlaying"
        @click="setPlaybackPosition(0)"
      >
        <n-icon><play-back-outline /></n-icon>
      </n-button>

      <n-button
        text
        :disabled="!isReady() || !songPlaying"
        @click="togglePlayback"
      >
        <n-icon>
          <pause-outline v-show="isReady() && isPlaying" />
          <play-outline v-show="!isReady() || !isPlaying" />
        </n-icon>
      </n-button>

      <n-button
        text
        :disabled="!isReady() || !songPlaying || !hasNext()"
        @click="playNext"
      >
        <n-icon><play-skip-forward-outline /></n-icon>
      </n-button>

      <n-button v-if="false" :disabled="!isReady() || !songPlaying" text>
        <n-icon><ellipsis-vertical-outline /></n-icon>
      </n-button>
    </div>
  </n-layout-footer>
</template>

<style lang="scss" scoped>
.large .song-info {
  flex: 0 1 auto;
  min-width: 8rem;
  max-width: 20%;
}
.n-button {
  @apply text-2xl;
}
.progress-time {
  flex: 0 1 2.75rem;
}
</style>

<script lang="ts">
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import { SongLocation } from "@/models/song-location";
import { Song } from "@/models/song";
import { CONFIG } from "@/config";
import {
  EllipsisVerticalOutline,
  PauseOutline,
  PlayOutline,
  PlayBackOutline,
  PlaySkipBackOutline,
  PlaySkipForwardOutline,
} from "@vicons/ionicons5";

@Options({
  components: {
    EllipsisVerticalOutline,
    PauseOutline,
    PlayOutline,
    PlayBackOutline,
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
    large: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    queue() {
      this.playedIndexes = [];
      this.playNext();
    },
    isPlaying(isPlaying: boolean) {
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
  private playedIndexes: Array<number> = [];
  private playbackPosition = 0;
  private playbackPositionStr = "";
  private songDuration = 0;
  private songDurationStr = "";
  private percentagePlayed = 0;

  mounted(): void {
    this.resetProgress();

    this.audio.addEventListener("waiting", () => (this.isBuffering = true));
    this.audio.addEventListener("playing", () => (this.isBuffering = false));
    this.audio.addEventListener("ended", () => {
      if (this.playedIndexes.length < this.queue.length) {
        this.playNext();
      } else {
        store.dispatch.setIsPlaying(false);
      }
    });
    this.audio.addEventListener("timeupdate", () => {
      const currentTime = this.audio.currentTime;
      this.percentagePlayed = (currentTime * 100) / this.audio.duration;
      this.playbackPosition = this.audio.currentTime;
      this.playbackPositionStr = Song.formatDuration(currentTime);
    });
  }

  playNext(): void {
    this.resetProgress();
    const nextSongIndex = this.pickNextSongIndex() as number;
    const songId = this.queue[nextSongIndex];
    this.audio.src = this.songsLocation
      .filter((e) => e.songId === songId)
      .map((e) => e.url)[0];

    const song = this.playlist.find((e) => e.id === songId) || null;
    this.songDuration = song ? song.duration : 0;
    this.songDurationStr = song ? song.formattedDuration : "";
    this.playedIndexes.push(nextSongIndex);
    store.dispatch.setSongPlaying(song);

    this.isPlaying ? this.resume() : store.dispatch.setIsPlaying(true);
  }

  onSlideUpdate(value: number): void {
    this.setPlaybackPosition(value);
  }

  pickNextSongIndex(): number | null {
    return this.playedIndexes.length === 0
      ? 0
      : this.playedIndexes[this.playedIndexes.length - 1] + 1;
  }

  resume(): void {
    if (this.audio.ended) {
      this.setPlaybackPosition(0);
    }
    this.audio.play();
  }

  pause(): void {
    this.audio.pause();
  }

  setPlaybackPosition(position: number): void {
    this.audio.currentTime = position;
  }

  skipBack(): void {
    this.playedIndexes = this.playedIndexes.slice(0, -2);
    this.playNext();
  }

  resetProgress(): void {
    this.playbackPosition = 0;
    this.playbackPositionStr = Song.formatDuration(0);
    this.songDuration = 0;
    this.songDurationStr = Song.formatDuration(0);
    this.percentagePlayed = 0;
  }

  isReady(): boolean {
    return !this.isLoadingPlaylist && !this.isBuffering;
  }

  isAudioPlaying(): boolean {
    return !this.audio.paused && !this.audio.ended;
  }

  hasPrevious(): boolean {
    return this.playedIndexes.length > 1;
  }

  hasNext(): boolean {
    return this.playedIndexes.length < this.queue.length;
  }

  togglePlayback(): void {
    store.dispatch.setIsPlaying(!this.isPlaying);
  }
}
</script>
