<template>
  <div class="cards-container">
    <el-card
      v-for="tape in featured"
      :key="tape.id"
      :body-style="{ padding: '0px' }"
      class="box-card"
    >
      <img :src="tape.images[0].small" class="cover" alt="Mixtape's cover" />
      <div style="padding: 14px">
        <span class="select">{{ tape.name }}</span>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import View from "@/views/View.vue";
import store from "@/store";
import { Options } from "vue-class-component";
import { MMSession } from "@/models/backend/mm-session";
import { Mixtape } from "@/models/mixtape";

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
})
export default class Featured extends View {}
</script>

<style lang="scss" scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.el-card {
  flex: 0 1 48%;
  margin-bottom: 10px;

  .cover {
    width: 100%;
  }
}
</style>
