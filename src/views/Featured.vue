<template>
  <div class="cards-list">
    <MixtapeCard
      v-for="tape in featured"
      :key="tape.id"
      :tape="tape"
    ></MixtapeCard>
  </div>
</template>

<script lang="ts">
import View from "@/views/View.vue";
import store from "@/store";
import { Options } from "vue-class-component";
import { MMSession } from "@/models/backend/mm-session";
import { Mixtape } from "@/models/mixtape";
import MixtapeCard from "@/components/MixtapeCard.vue";

@Options({
  computed: {
    session: (): MMSession | null => store.state.core.session,
    featured: (): Array<Mixtape> => store.state.browsing.featured,
  },
  watch: {
    session(session: MMSession | null) {
      if (session) {
        store.dispatch.fetchFeatured();
      }
    },
  },
  components: {
    MixtapeCard,
  },
})
export default class Featured extends View {}
</script>

<style lang="scss" scoped>
.cards-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
