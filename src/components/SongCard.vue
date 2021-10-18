<template>
  <n-card class="rounded-none cursor-pointer" size="small">
    <div class="flex">
      <div class="flex flex-col flex-auto overflow-hidden pr-2">
        <h3
          class="font-semibold flex items-center"
          :class="{ playing: isPlaying }"
        >
          <n-icon class="mr-1">
            <headset-outline />
          </n-icon>
          <span class="flex-auto nowrap-ellipsis">
            {{ song.name }}
          </span>
        </h3>
        <h4 class="font-medium nowrap-ellipsis">
          <span>{{ song.mainArtists }}</span>
          <span v-if="song.featureArtists" class="text-xs">
            (feat. {{ song.featureArtists }})
          </span>
        </h4>
      </div>

      <div class="flex row items-center">
        {{ song.formattedDuration }}
        <n-button class="ml-2" size="large" text>
          <n-icon><ellipsis-vertical-outline /></n-icon>
        </n-button>
      </div>
    </div>
  </n-card>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Song } from "@/models/song";
import Featured from "@/views/Featured.vue";
import { EllipsisVerticalOutline, HeadsetOutline } from "@vicons/ionicons5";

@Options({
  components: { EllipsisVerticalOutline, HeadsetOutline, Featured },
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

  &:hover h3 {
    color: var(--color-target);
  }
}

h3 {
  &.playing {
    color: var(--color-target);

    .n-icon {
      display: block;
    }
  }

  .n-icon {
    display: none;
  }
}
</style>
