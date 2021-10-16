<template>
  <n-card class="rounded-none" size="small">
    <div class="flex flex-row">
      <div class="flex flex-col flex-auto overflow-hidden">
        <h3 class="font-semibold" :class="{ playing: isPlaying }">
          {{ song.name }}
        </h3>
        <h4 class="font-medium">
          <span>{{ song.mainArtists }}</span>
          <span v-if="song.featureArtists" class="text-xs">
            (feat. {{ song.featureArtists }})
          </span>
        </h4>
      </div>

      <div class="flex row items-center">
        {{ song.formattedDuration }}
        <n-button class="ml-2" size="large" text>
          <template #icon>
            <n-icon><ellipsis-vertical-outline /></n-icon>
          </template>
        </n-button>
      </div>
    </div>
  </n-card>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Song } from "@/models/song";
import Featured from "@/views/Featured.vue";
import { EllipsisVerticalOutline } from "@vicons/ionicons5";

@Options({
  components: { EllipsisVerticalOutline, Featured },
  props: {
    song: {
      type: Song,
      required: true,
    },
    isPlaying: {
      type: Boolean,
      required: true,
    },
  },
})
export default class SongItem extends Vue {}
</script>

<style lang="scss" scoped>
.n-card {
  border-right: none;
  border-left: none;
  border-bottom: none;

  &:first-child {
    border-top: none;
  }
}

h3,
h4 {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
</style>
