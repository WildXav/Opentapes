<script lang="ts">
import { Options } from "vue-class-component";
import AlbumListView from "@/views/abstract/AlbumListView.vue";
import store from "@/store";
import { MMSession } from "@/models/backend/mm-session";
import { Album } from "@/models/album";
import AlbumCard from "@/components/AlbumCard.vue";

@Options({
  computed: {
    session: (): MMSession | null => store.getters.session,
    albums: (): ReadonlyArray<Album> => store.getters.featured,
  },
  watch: {
    session() {
      this.fetchAlbums();
    },
    albums() {
      this.loading = false;
    },
  },
  components: {
    AlbumCard,
  },
})
export default class Featured extends AlbumListView {
  fetchFn(payload: MMSession): Promise<void> {
    return store.dispatch.fetchFeatured(payload);
  }
}
</script>
