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
  },
  components: {
    MixtapeCard,
  },
})
export default class TrendingTapes extends MixtapeListView {
  fetchMixtapes(): void {
    if (this.session) {
      store.dispatch.fetchTrendingTapes(this.session);
    }
  }
}
</script>
