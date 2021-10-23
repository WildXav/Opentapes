<template>
  <div class="flex flex-col items-center h-full">
    <div
      class="flex-none h-1/6 w-full shadow bg-center bg-no-repeat bg-cover"
      :style="{ 'background-image': 'url(\'' + album.largeCoverUrl + '\')' }"
    />
    <n-button-group class="py-px" size="medium">
      <n-button @click="playAlbum(false)" round>
        <template #icon>
          <n-icon><play-outline /></n-icon>
        </template>
        Play
      </n-button>
      <n-button v-if="false">
        <template #icon>
          <n-icon><ellipsis-vertical-outline /></n-icon>
        </template>
      </n-button>
      <n-button @click="playAlbum(true)" round>
        <template #icon>
          <n-icon><shuffle-outline /></n-icon>
        </template>
        Shuffle
      </n-button>
    </n-button-group>

    <n-spin v-if="loading" size="large" class="mt-3" />

    <div v-if="!loading && songs" class="flex flex-col overflow-y-auto w-full">
      <SongCard
        v-for="song in songs"
        @click="playSong(song)"
        :key="song.id"
        :song="song"
        :is-playing="songPlaying?.id === song.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import { MMSession } from "@/models/backend/mm-session";
import { Song } from "@/models/song";
import { Album } from "@/models/album";
import {
  EllipsisVerticalOutline,
  PlayOutline,
  ShuffleOutline,
} from "@vicons/ionicons5";
import SongCard from "@/components/SongCard.vue";

@Options({
  components: {
    SongCard,
    EllipsisVerticalOutline,
    PlayOutline,
    ShuffleOutline,
  },
  props: {
    album: {
      type: Album,
      required: true,
    },
  },
  computed: {
    session: (): MMSession | null => store.state.core.session,
    songs: (): ReadonlyArray<Song> | null => store.getters.selectedAlbumSongs,
    songPlaying: (): Song | null => store.getters.songPlaying,
  },
  watch: {
    session() {
      this.fetchSongs();
    },
    album() {
      this.fetchSongs();
    },
  },
})
export default class MixtapeDetails extends Vue {
  private session!: MMSession | null;
  private songs!: Array<Song> | null;
  private loading = false;

  mounted(): void {
    this.fetchSongs();
  }

  fetchSongs(): void {
    if (this.session && !this.loading) {
      this.loading = true;

      store.dispatch
        .fetchAlbumSongs(this.session)
        .then(() => (this.loading = false));
    }
  }

  playAlbum(shuffle: boolean): void {
    if (!this.session || !this.songs) return;
    store.dispatch.setPlaylist({
      session: this.session,
      playlist: this.songs,
      shuffle,
    });
  }

  playSong(song: Song): void {
    if (!this.session) return;
    store.dispatch.setPlaylist({
      session: this.session,
      playlist: [song],
      shuffle: false,
    });
  }
}
</script>
