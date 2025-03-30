<template>
  <CourseWorldCard class="w-fit" :grid="false">
    <h3 class="text-xl">{{ name }}</h3>
    <div class="flex flex-row-reverse flex-wrap justify-center mb-8 gap-4">
      <svg
        width="200"
        height="150"
        viewBox="0 0 200 150"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="100"
          y="40"
          font-family="Arial"
          font-size="20"
          text-anchor="middle"
          fill="#000"
        >
          {{ LEADERBOARD_RANK_MEDALS[1] }}
        </text>
        <rect x="75" y="50" width="50" height="100" fill="#DAA520" />
        <text
          x="100"
          y="70"
          font-family="Arial"
          font-size="16"
          text-anchor="middle"
          font-weight="700"
          fill="#000"
        >
          {{ formatNumber(first?.score) }}
        </text>

        <!-- Podium: 2nd place -->
        <text
          x="50"
          y="65"
          font-family="Arial"
          font-size="20"
          text-anchor="middle"
          fill="#000"
        >
          {{ LEADERBOARD_RANK_MEDALS[2] }}
        </text>
        <rect x="25" y="75" width="50" height="75" fill="#d0d0d0" />
        <text
          x="50"
          y="95"
          font-family="Arial"
          font-size="16"
          text-anchor="middle"
          font-weight="700"
          fill="#000"
        >
          {{ formatNumber(second?.score) }}
        </text>

        <!-- Podium: 3rd place -->
        <text
          x="150"
          y="90"
          font-family="Arial"
          font-size="20"
          text-anchor="middle"
          fill="#000"
        >
          {{ LEADERBOARD_RANK_MEDALS[3] }}
        </text>
        <rect x="125" y="100" width="50" height="50" fill="#A56F2B" />
        <text
          x="150"
          y="120"
          font-family="Arial"
          font-size="16"
          text-anchor="middle"
          font-weight="700"
          fill="#000"
        >
          {{ formatNumber(third?.score) }}
        </text>
      </svg>
      <div class="text-left self-center sm:mb-0">
        <div
          v-for="i in 3"
          :key="leaderboard[i - 1]?.nnid"
          class="flex items-center text-lg"
        >
          <span class="text-xl mr-1">
            {{ LEADERBOARD_RANK_MEDALS[i] }}
          </span>
          <PlayerNnid :nnid="leaderboard[i - 1]?.nnid" :size="20" />
        </div>
      </div>
    </div>
    <div class="pt-2 border-t -mx-3 px-3 -mb-2">
      <button class="hover:underline text-nowrap" @click="viewing = true">
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
