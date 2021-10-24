<template>
  <div
    class="flex flex-col items-center overflow-y-auto h-full"
    ref="container"
  >
    <div ref="grid">
      <n-grid
        :style="{ padding: config.gridGap + 'px' }"
        :y-gap="config.gridGap"
        :x-gap="config.gridGap"
        cols="2 370:3 600:4 960:5 1220:6 1470:7"
        responsive="self"
      >
        <n-grid-item v-for="album in albums" :key="album.id">
          <GridCard :content="album" @click="selectAlbum(album)" />
        </n-grid-item>

        <n-grid-item v-for="single in singles" :key="single.id">
          <GridCard :content="single" @click="selectSingle(single)" />
        </n-grid-item>

        <n-grid-item
          v-show="loading"
          key="loader"
          class="flex justify-center items-center"
          style="min-height: 70px; min-width: 100px"
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
import { Single } from "@/models/single";

export default abstract class AlbumListView extends View {
  readonly config = CONFIG;
  protected session!: MMSession | null;
  protected albums!: Array<Album>;
  protected singles!: Array<Single>;
  protected loading = true;
  protected hasLoaded = false;
  protected infiniteScrollEnabled = true;

  abstract fetchFn(payload: MMSession): Promise<void>;

  $refs!: {
    container: HTMLElement;
    grid: HTMLElement;
  };

  mounted(): void {
    super.mounted();
    this.$refs.container.addEventListener("scroll", this.handleScroll);
    this.fetchContent();
  }

  unmounted(): void {
    window.removeEventListener("scroll", this.handleScroll);
    store.dispatch.resetBrowsingState();
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
      this.fetchContent();
    }
  }

  fetchContent(): void {
    if (this.session && (!this.hasLoaded || !this.loading)) {
      this.loading = true;
      this.fetchFn(this.session).then(() => {
        this.hasLoaded = true;
        this.loading = false;
      });
    }
  }

  selectAlbum(album: Album): void {
    store.dispatch.selectAlbum(album);
  }

  selectSingle(single: Single): void {
    store.dispatch.selectSingle(single);
  }
}
</script>
