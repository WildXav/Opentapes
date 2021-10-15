<template>
  <n-grid
    :style="{ padding: config.gridGap + 'px' }"
    :y-gap="config.gridGap"
    :x-gap="config.gridGap"
    cols="2 370:3 600:4 960:5 1220:6 1470:7"
    responsive="self"
  >
    <n-grid-item v-for="album in albums" :key="album.id">
      <AlbumCard :album="album" />
    </n-grid-item>
  </n-grid>
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
  protected useInfiniteScroll = false;
  protected loading = false;
  abstract fetchFn(payload: MMSession): Promise<void>;

  mounted(): void {
    super.mounted();
    if (this.albums.length === 0) {
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
