<template>
  <div class="wrapper">
    <div
      class="cover"
      :style="{ 'background-image': 'url(\'' + tape.mediumCoverUrl + '\')' }"
    >
      <div class="title">
        <h1>{{ tape.name }}</h1>
      </div>
    </div>

    <div v-if="loading" v-loading="true" class="loader"></div>

    <div v-if="!loading && songs" class="songs-container">
      <SongItem v-for="song in songs" :key="song.id" :song="song"></SongItem>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { Options, Vue } from "vue-class-component";
import { Mixtape } from "@/models/mixtape";
import { MMSession } from "@/models/backend/mm-session";
import { Song } from "@/models/song";
import SongItem from "@/components/SongItem.vue";

@Options({
  components: { SongItem },
  props: {
    tape: {
      type: Mixtape,
      required: true,
    },
  },
  computed: {
    session: (): MMSession | null => store.state.core.session,
    songs: (): Array<Song> | null => store.state.core.selectedTapeSongs,
  },
  watch: {
    session() {
      this.fetchSongs();
    },
    tape() {
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
        .fetchTapeSongs(this.session)
        .then(() => (this.loading = false));
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
  min-height: 100%;
  background-color: var(--el-background-color-base);
}

.cover {
  height: 120px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  .title {
    display: flex;
    align-items: flex-end;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;

    h1 {
      margin-top: 0;
      margin-left: 5px;
      margin-bottom: 3px;
      max-height: 45px;
      overflow: hidden;
      font-size: 18px;
      text-shadow: 0 0 5px #000000;
    }
  }
}

.loader {
  height: 100px;
}

.songs-container {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
