<template>
  <CourseWorldCard
    class="flex items-center h-fit gap-3 py-2 relative group"
    :grid="false"
  >
    <div>
      <slot name="icon" />
    </div>
    <div class="text-left w-full">
      <div v-if="milestone" class="text-sm">
        Cleared on
        <span class="font-medium">{{ formatDate(milestone.dateCleared) }}</span>
        by
        <BaseNnid class="relative z-10" :nnid="milestone.firstClearerNnid" />
      </div>
      <div class="flex items-center gap-5">
        <div class="flex gap-2 items-center w-[500px]">
          <Icon name="noto:trophy" size="56" />
          <div>
            <div class="text-4xl leading-5 relative z-10">
              <PlayerNnid :nnid="leaderboard[0]?.nnid" :size="32" />
            </div>
            <span class="text-lg"
              >{{ formatNumber(leaderboard[0]?.score) }} clears</span
            >
          </div>
        </div>
        <div class="-mt-2">
          <div class="flex items-center mb-1">
            <span class="text-3xl leading-none">{{
              LEADERBOARD_RANK_MEDALS[leaderboard[1]?.rank]
            }}</span>
            <div class="leading-tight">
              <div class="relative z-10">
                <PlayerNnid :nnid="leaderboard[1]?.nnid" :size="16" />
              </div>
              <div class="text-sm">
                {{ formatNumber(leaderboard[1]?.score) }} clears
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <span class="text-3xl leading-none">{{
              LEADERBOARD_RANK_MEDALS[leaderboard[2]?.rank]
            }}</span>
            <div class="leading-tight">
              <div class="relative z-10">
                <PlayerNnid :nnid="leaderboard[2]?.nnid" :size="16" />
              </div>
              <div class="text-sm">
                {{ formatNumber(leaderboard[2]?.score) }} clears
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button
        class="after:absolute after:inset-0 group-hover:underline text-nowrap"
        @click="viewing = true"
      >
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

<script setup lang="ts">
import type { PropType } from 'vue';
import type { RankedLeaderboard } from '~/composables/useLeaderboards';
import { LEADERBOARD_RANK_MEDALS } from '~/constants/leaderboards';
import PlayerNnid from './PlayerNnid.vue';
import type { Milestone } from '~/types/players';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  leaderboard: {
    type: Array as PropType<RankedLeaderboard<boolean>>,
    default: () => [],
  },
  milestone: {
    type: Object as PropType<Milestone>,
    default: null,
  },
});

const { formatDate, formatNumber } = useFormatters();

const viewing = ref(false);
</script>
