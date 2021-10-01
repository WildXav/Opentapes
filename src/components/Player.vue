<template>
  <div class="container">
    <div class="song-details-wrapper">
      <div v-if="!isReady()" v-loading="true"></div>
      <template v-else-if="songPlaying">
        <img :src="songPlaying.thumbnailCoverUrl" alt="cover" />

        <div class="song-details select">
          <h4 class="title">{{ songPlaying.name }}</h4>
          <div class="artists">
            <span>{{ songPlaying.mainArtists }}</span>
            <span v-if="songPlaying.featureArtists" class="features">
              (feat. {{ songPlaying.featureArtists }})
            </span>
          </div>
        </div>
      </template>
    </div>

    <div class="controls">
      <PlayerControlBtn icon-name="step-backward" @click="resetPlayback()" />
      <PlayerControlBtn
        :icon-name="isReady() && isPlaying ? 'pause' : 'play'"
        :disabled="!isReady() || !songPlaying"
        @clicked="togglePlayback()"
      />
      <PlayerControlBtn icon-name="step-forward" />
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import { SongLocation } from "@/models/song-location";
import { Song } from "@/models/song";
import PlayerControlBtn from "@/components/PlayerControlBtn.vue";

@Options({
  components: {
    PlayerControlBtn,
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
  },
  watch: {
    queue(newQueue, oldQueue) {
      if (newQueue[0] !== oldQueue[0]) {
        this.play();
      } else {
        this.resetPlayback();
        if (!this.isPlaying) {
          store.dispatch.setIsPlaying(true);
        }
      }
    },
    isPlaying() {
      const audioPlaying = !this.audio.paused && !this.audio.ended;
      if (
        (this.isPlaying && audioPlaying) ||
        (!this.isPlaying && !audioPlaying)
      ) {
        return;
      }

      this.isPlaying ? this.resume() : this.pause();
    },
  },
})
export default class Player extends Vue {
  private playlist!: ReadonlyArray<Song>;
  private songsLocation!: ReadonlyArray<SongLocation>;
  private queue!: ReadonlyArray<number>;
  private isPlaying!: boolean;
  private isLoadingPlaylist!: boolean;
  private audio = new Audio();
  private isBuffering = false;

  play(): void {
    const songId = this.queue[0];
    const songUrl = this.songsLocation
      .filter((e) => e.songId === songId)
      .map((e) => e.url)[0];
    this.audio = new Audio(songUrl);
    this.audio.addEventListener("waiting", () => (this.isBuffering = true));
    this.audio.addEventListener("playing", () => (this.isBuffering = false));
    this.audio.addEventListener("ended", () =>
      store.dispatch.setIsPlaying(false)
    );

    const song = this.playlist.find((e) => e.id === songId) || null;
    store.dispatch.setSongPlaying(song);
    store.dispatch.setIsPlaying(true);
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

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10px;
}

.song-details-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1 1 auto;
  overflow: hidden;

  img {
    height: 100%;
    margin-right: 5px;
    border-radius: 3px;
  }
}

.song-details {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow: hidden;

  .title,
  .artists {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }

  .artists {
    font-size: var(--el-font-size-base);

    .features {
      font-size: var(--el-font-size-small);
    }
  }
}

.controls {
  display: flex;
  flex: 0 0 auto;
  height: 100%;

  .control-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    width: 40px;
    height: 40px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
