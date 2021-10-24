<script lang="ts">
import { Options } from "vue-class-component";
import AlbumListView from "@/views/abstract/AlbumListView.vue";
import store from "@/store";
import { MMSession } from "@/models/backend/mm-session";
import { Album } from "@/models/album";
import GridCard from "@/components/GridCard.vue";

@Options({
  computed: {
    session: (): MMSession | null => store.getters.session,
    albums: (): ReadonlyArray<Album> => store.getters.featured,
  },
  watch: {
    session() {
      this.fetchContent();
    },
  },
  components: {
    GridCard,
  },
})
export default class Featured extends AlbumListView {
  singles = [];
  infiniteScrollEnabled = false;

  fetchFn(payload: MMSession): Promise<void> {
    return store.dispatch.fetchFeatured(payload);
  }
}
</script>
