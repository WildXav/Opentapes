<template>
  <div>
    <div
      class="cards-list"
      v-infinite-scroll="fetchMixtapes"
      :infinite-scroll-immediate="false"
      :infinite-scroll-disabled="!useInfiniteScroll"
    >
      <MixtapeCard
        v-for="tape in mixtapes"
        :key="tape.id"
        :name="tape.name"
        :coverUrl="tape.smallCoverUrl"
        :artists="tape.mainArtists"
        @click="selectTape(tape)"
      />
    </div>

    <div v-if="loading" v-loading="true" class="loader"></div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { Mixtape } from "@/models/mixtape";
import View from "@/views/View.vue";
import { MMSession } from "@/models/backend/mm-session";

export default abstract class MixtapeListView extends View {
  protected session!: MMSession | null;
  protected mixtapes!: Array<Mixtape>;
  protected useInfiniteScroll = false;
  protected loading = false;
  protected fetchFn!: (payload: MMSession) => Promise<void>;

  mounted(): void {
    super.mounted();
    if (this.mixtapes.length === 0) {
      this.fetchMixtapes();
    }
  }

  fetchMixtapes(): void {
    if (this.session && !this.loading) {
      this.loading = true;
      this.fetchFn(this.session).then(() => (this.loading = false));
    }
  }

  selectTape(tape: Mixtape): void {
    store.dispatch.selectTape(tape);
  }
}
</script>

<style lang="scss" scoped>
.cards-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 5px;
}

.loader {
  height: 50px;
  margin-top: 10px;
}
</style>
