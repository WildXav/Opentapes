<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store";

export default abstract class View extends Vue {
  mounted(): void {
    store.dispatch.setPrimaryViewTitle(this.$route.name as string);
  }
}
</script>
