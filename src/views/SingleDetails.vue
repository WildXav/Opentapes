<template>
  <div class="flex flex-col items-center h-full">
    <div
      class="flex-none h-1/6 w-full shadow bg-center bg-no-repeat bg-cover"
      :style="{ 'background-image': 'url(\'' + single.largeCoverUrl + '\')' }"
    />
    <n-button-group class="py-px" size="medium">
      <n-button @click="play()" round>
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
    </n-button-group>

    <n-spin v-if="loading" size="large" class="mt-3" />
    <div v-else-if="song" class="flex flex-col overflow-y-auto w-full">
      <SongCard
        @click="play()"
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
import {
  EllipsisVerticalOutline,
  PlayOutline,
  ShuffleOutline,
} from "@vicons/ionicons5";
import SongCard from "@/components/SongCard.vue";
import { Single } from "@/models/single";

@Options({
  components: {
    SongCard,
    EllipsisVerticalOutline,
    PlayOutline,
    ShuffleOutline,
  },
  props: {
    single: {
      type: Single,
      required: true,
    },
  },
  computed: {
    session: (): MMSession | null => store.state.core.session,
    song: (): Song | null => store.getters.selectedSingleSong,
    songPlaying: (): Song | null => store.getters.songPlaying,
  },
  watch: {
    session() {
      this.fetchSong();
    },
    single() {
      this.fetchSong();
    },
  },
})
export default class SingleDetails extends Vue {
  private session!: MMSession | null;
  private song!: Song | null;
  private loading = false;

  mounted(): void {
    this.fetchSong();
  }

  fetchSong(): void {
    if (this.session && !this.loading) {
      this.loading = true;

      store.dispatch
        .fetchSingleSong(this.session)
        .then(() => (this.loading = false));
    }
  }

  play(): void {
    if (!this.session || !this.song) return;
    store.dispatch.setPlaylist({
      session: this.session,
      playlist: [this.song],
      shuffle: false,
    });
  }
}
</script>
