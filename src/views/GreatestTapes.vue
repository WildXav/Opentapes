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
  },
  components: {
    MixtapeCard,
  },
})
export default class Latest extends MixtapeListView {
  fetchMixtapes(): void {
    if (this.session) {
      store.dispatch.fetchGreatestTapes(this.session);
    }
  }
}
</script>
