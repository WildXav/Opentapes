<script lang="ts">
import store from "@/store";
import { Options } from "vue-class-component";
import { MMSession } from "@/models/backend/mm-session";
import MixtapeCard from "@/components/MixtapeCard.vue";
import { Mixtape } from "@/models/mixtape";
import MixtapeListView from "@/views/MixtapeListView.vue";

@Options({
  computed: {
    session: (): MMSession | null => store.state.core.session,
    mixtapes: (): Array<Mixtape> => store.state.browsing.greatestTapes,
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
export default class GreatestTapes extends MixtapeListView {
  useInfiniteScroll = true;
  fetchFn = store.dispatch.fetchGreatestTapes;
}
</script>
