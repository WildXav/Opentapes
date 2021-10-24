<script lang="ts">
import { Options } from "vue-class-component";
import AlbumListView from "@/views/abstract/AlbumListView.vue";
import { MMSession } from "@/models/backend/mm-session";
import store from "@/store";
import { Album } from "@/models/album";
import GridCard from "@/components/GridCard.vue";

@Options({
  computed: {
    session: (): MMSession | null => store.getters.session,
    albums: (): ReadonlyArray<Album> => store.getters.greatestTapes,
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
export default class GreatestMixtapes extends AlbumListView {
  singles = [];

  fetchFn(payload: MMSession): Promise<void> {
    return store.dispatch.fetchGreatestTapes(payload);
  }
}
</script>
