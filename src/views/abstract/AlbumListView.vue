<template>
  <div class="flex flex-col items-center overflow-y-auto" ref="container">
    <div ref="grid">
      <n-grid
        :style="{ padding: config.gridGap + 'px' }"
        :y-gap="config.gridGap"
        :x-gap="config.gridGap"
        cols="2 370:3 600:4 960:5 1220:6 1470:7"
        responsive="self"
      >
        <n-grid-item v-for="album in albums" :key="album.id">
          <AlbumCard :album="album" @click="selectAlbum(album)" />
        </n-grid-item>

        <n-grid-item
          v-show="loading"
          key="loader"
          class="flex justify-center items-center"
          :style="{ 'min-height': '70px' }"
        >
          <n-spin size="large" />
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<script lang="ts">
import View from "@/views/abstract/View.vue";
import { MMSession } from "@/models/backend/mm-session";
import { Album } from "@/models/album";
import store from "@/store";
import { CONFIG } from "@/config";

export default abstract class AlbumListView extends View {
  readonly config = CONFIG;
  protected session!: MMSession | null;
  protected albums!: Array<Album>;
  protected loading = false;
  protected infiniteScrollEnabled = true;

  abstract fetchFn(payload: MMSession): Promise<void>;

  $refs!: {
    container: HTMLElement;
    grid: HTMLElement;
  };

  mounted(): void {
    super.mounted();
    this.$refs.container.addEventListener("scroll", this.handleScroll);

    if (this.albums.length === 0) {
      this.fetchAlbums();
    }
  }

  unmounted(): void {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(): void {
    if (!this.infiniteScrollEnabled) {
      return;
    }

    const gridBottomPosition = this.$refs.grid.getBoundingClientRect().bottom;
    const bottom =
      this.$refs.container.getBoundingClientRect().height +
      this.$refs.container.getBoundingClientRect().top;

    if (gridBottomPosition <= bottom && !this.loading) {
      this.fetchAlbums();
    }
  }

  fetchAlbums(): void {
    if (this.session && !this.loading) {
      this.loading = true;
      this.fetchFn(this.session).then(() => (this.loading = false));
    }
  }

  selectAlbum(album: Album): void {
    store.dispatch.selectAlbum(album);
  }
}
</script>
