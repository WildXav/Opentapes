<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store";

export default abstract class View extends Vue {
  mounted(): void {
    if (store.getters.browsingViewTitle !== this.$route.name) {
      store.dispatch.setBrowsingViewTitle(this.$route.name as string);
      store.dispatch.setIsAlbumViewActive(false);
    }
  }
}
</script>
