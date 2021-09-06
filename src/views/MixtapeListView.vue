<template>
  <el-scrollbar>
    <div
      class="cards-list"
      v-infinite-scroll="fetchMixtapes"
      :infinite-scroll-immediate="false"
      :infinite-scroll-disabled="!useInfiniteScroll"
    >
      <MixtapeCard
        v-for="tape in mixtapes"
        :key="tape.id"
        :tape="tape"
      ></MixtapeCard>
    </div>

    <div v-if="loading" v-loading="true" class="loader"></div>
  </el-scrollbar>
</template>

<script lang="ts">
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
}
</script>

<style lang="scss" scoped>
.cards-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.loader {
  height: 50px;
  margin-top: 10px;
}
</style>
