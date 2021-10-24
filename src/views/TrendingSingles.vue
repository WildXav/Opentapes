<script lang="ts">
import { Options } from "vue-class-component";
import AlbumListView from "@/views/abstract/AlbumListView.vue";
import { MMSession } from "@/models/backend/mm-session";
import store from "@/store";
import GridCard from "@/components/GridCard.vue";
import { Single } from "@/models/single";

@Options({
  computed: {
    session: (): MMSession | null => store.getters.session,
    singles: (): ReadonlyArray<Single> => store.getters.trendingSingles,
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
export default class TrendingSingles extends AlbumListView {
  albums = [];

  fetchFn(payload: MMSession): Promise<void> {
    return store.dispatch.fetchTrendingSingles(payload);
  }
}
</script>
