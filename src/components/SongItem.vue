<template>
  <el-button>
    <div class="inner-wrapper">
      <div class="title-artists">
        <h3 :class="{ playing: isPlaying }">
          <svg-icon :name="'headphones'"></svg-icon>
          {{ song.name }}
        </h3>
        <h4>
          <span>{{ song.mainArtists }}</span>
          <span v-if="song.featureArtists" class="features">
            (feat. {{ song.featureArtists }})
          </span>
        </h4>
      </div>

      <div class="duration">{{ song.formattedDuration }}</div>
    </div>
  </el-button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Song } from "@/models/song";
import Featured from "@/views/Featured.vue";
import SvgIcon from "@/components/SvgIcon.vue";

@Options({
  components: { Featured, SvgIcon },
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
.el-button {
  border-top: none;
  border-right: none;
  border-left: none;
  border-radius: 0;
  margin: 0 !important;
  text-align: left;
  min-height: auto;
  padding: 12px;

  &:active {
    border-color: var(--el-color-primary-light-7);
  }

  &:last-child {
    border-bottom: none;
  }
}

.inner-wrapper {
  display: flex;
  flex-direction: row;
}

.title-artists {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow: hidden;

  h3,
  h4 {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    white-space: nowrap;
  }

  h3 {
    margin-bottom: 5px;
    font-weight: 600;

    &.playing {
      color: #3a8ee6;

      svg {
        display: inline-block;
      }
    }

    svg {
      display: none;
      width: 12px;
      height: 12px;
    }
  }

  h4 {
    font-weight: 500;

    .features {
      font-size: var(--el-font-size-extra-small);
    }
  }
}

.duration {
  display: flex;
  align-items: center;
}
</style>
