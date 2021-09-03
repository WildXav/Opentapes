<template>
  <div class="cards-list">
    <MixtapeCard
      v-for="tape in mixtapes"
      :key="tape.id"
      :tape="tape"
    ></MixtapeCard>
  </div>
</template>

<script lang="ts">
import { Mixtape } from "@/models/mixtape";
import View from "@/views/View.vue";
import { MMSession } from "@/models/backend/mm-session";

export default abstract class MixtapeListView extends View {
  session!: MMSession | null;
  mixtapes!: Array<Mixtape>;

  mounted(): void {
    super.mounted();
    if (this.mixtapes.length === 0) {
      this.fetchMixtapes();
    }
  }

  abstract fetchMixtapes(): void;
}
</script>

<style lang="scss" scoped>
.cards-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
