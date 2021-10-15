<script lang="ts">
import { Options } from "vue-class-component";
import AlbumListView from "@/views/abstract/AlbumListView.vue";
import { MMSession } from "@/models/backend/mm-session";
import store from "@/store";
import { Album } from "@/models/album";
import AlbumCard from "@/components/AlbumCard.vue";

@Options({
  computed: {
    session: (): MMSession | null => store.getters.session,
    albums: (): ReadonlyArray<Album> => store.getters.greatestTapes,
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
export default class GreatestMixtapes extends AlbumListView {
  fetchFn(payload: MMSession): Promise<void> {
    return store.dispatch.fetchGreatestTapes(payload);
  }
}
</script>
