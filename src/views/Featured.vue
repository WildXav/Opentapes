<script lang="ts">
import store from "@/store";
import { Options } from "vue-class-component";
import { MMSession } from "@/models/backend/mm-session";
import { Mixtape } from "@/models/mixtape";
import MixtapeListView from "@/views/MixtapeListView.vue";
import MixtapeCard from "@/components/MixtapeCard.vue";

@Options({
  computed: {
    session: (): MMSession | null => store.state.core.session,
    mixtapes: (): Array<Mixtape> => store.state.browsing.featured,
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
export default class Featured extends MixtapeListView {
  fetchFn = store.dispatch.fetchFeatured;
}
</script>
