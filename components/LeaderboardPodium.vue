<template>
  <CourseWorldCard class="w-fit" :grid="false">
    <h3 class="text-xl">{{ name }}</h3>
    <div>
      <svg
        width="400"
        height="200"
        viewBox="0 0 200 200"
        preserve-aspect-ratio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Base background -->
        <!-- <rect width="200" height="200" fill="#f5f5f5" /> -->

        <!-- Podium: 1st place -->
        <foreignObject x="30" y="25" width="200" height="22.5">
          <div xmlns="http://www.w3.org/1999/xhtml">
            <PlayerNnid :nnid="first?.nnid" :size="20" :awards="false" />
          </div>
        </foreignObject>
        <rect x="75" y="50" width="50" height="100" fill="#DAA520" />
        <text
          x="100"
          y="70"
          font-family="Arial"
          font-size="16"
          text-anchor="middle"
          fill="#000"
        >
          {{ formatNumber(first?.score) }}
        </text>
        <text
          x="100"
          y="175"
          font-family="Arial"
          font-size="20"
          text-anchor="middle"
          fill="#000"
        >
          {{ LEADERBOARD_RANK_MEDALS[1] }}
        </text>

        <!-- Podium: 2nd place -->
        <foreignObject x="-135" y="53" width="200" height="22.5">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            class="text-right flex flex-row-reverse"
          >
            <PlayerNnid :nnid="second?.nnid" :size="20" :awards="false" />
          </div>
        </foreignObject>
        <rect x="25" y="75" width="50" height="75" fill="#d0d0d0" />
        <text
          x="50"
          y="95"
          font-family="Arial"
          font-size="16"
          text-anchor="middle"
          fill="#000"
        >
          {{ formatNumber(second?.score) }}
        </text>
        <text
          x="50"
          y="175"
          font-family="Arial"
          font-size="20"
          text-anchor="middle"
          fill="#000"
        >
          {{ LEADERBOARD_RANK_MEDALS[2] }}
        </text>

        <!-- Podium: 3rd place -->
        <foreignObject x="90" y="75" width="200" height="22.5">
          <div xmlns="http://www.w3.org/1999/xhtml">
            <PlayerNnid :nnid="third?.nnid" :size="20" :awards="false" />
          </div>
        </foreignObject>
        <rect x="125" y="100" width="50" height="50" fill="#A56F2B" />
        <text
          x="150"
          y="120"
          font-family="Arial"
          font-size="16"
          text-anchor="middle"
          fill="#000"
        >
          {{ formatNumber(third?.score) }}
        </text>
        <text
          x="150"
          y="175"
          font-family="Arial"
          font-size="20"
          text-anchor="middle"
          fill="#000"
        >
          {{ LEADERBOARD_RANK_MEDALS[3] }}
        </text>
      </svg>
    </div>
    <div class="pt-2 border-t -mx-3 px-3 -mb-2">
      <button class="group-hover:underline text-nowrap" @click="viewing = true">
        View full <Icon name="mdi:chevron-right" />
      </button>

      <LeaderboardModal
        v-if="viewing"
        :name="name"
        :leaderboard="leaderboard"
        @close="viewing = false"
      />
    </div>
  </CourseWorldCard>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { LEADERBOARD_RANK_MEDALS } from '~/constants/leaderboards';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  leaderboard: {
    type: Array as PropType<RankedLeaderboard<boolean>>,
    default: () => [],
  },
});

const first = computed(() => props.leaderboard[0]);
const second = computed(() => props.leaderboard[1]);
const third = computed(() => props.leaderboard[2]);

const viewing = ref(false);

const { formatNumber } = useFormatters();
</script>
