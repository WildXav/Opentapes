<script lang="ts">
import MixtapeListView from "@/views/MixtapeListView.vue";
import { Options } from "vue-class-component";
import { MMSession } from "@/models/backend/mm-session";
import store from "@/store";
import { Mixtape } from "@/models/mixtape";
import MixtapeCard from "@/components/MixtapeCard.vue";

@Options({
  computed: {
    session: (): MMSession | null => store.state.core.session,
    mixtapes: (): Array<Mixtape> => store.state.browsing.trendingTapes,
  },
  watch: {
    session() {
      this.fetchMixtapes();
    },
    mixtapes() {
      this.loading = false;
    },
  },
  components: {
    MixtapeCard,
  },
})
export default class TrendingTapes extends MixtapeListView {
  useInfiniteScroll = true;
  fetchFn = store.dispatch.fetchTrendingTapes;
}
</script>
