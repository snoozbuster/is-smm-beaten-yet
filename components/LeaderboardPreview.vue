<template>
  <CourseWorldCard
    class="relative group flex items-center h-fit py-2 flex-wrap lg:flex-nowrap"
    :grid="false"
  >
    <div class="flex items-center h-fit gap-3 flex-wrap md:flex-nowrap">
      <div class="self-start md:self-center">
        <slot name="icon" />
      </div>
      <div class="text-left md:w-full">
        <div v-if="milestone" class="text-sm">
          Cleared on
          <span class="font-medium">{{
            formatDate(milestone.dateCleared)
          }}</span>
          by
          <BaseNnid class="relative z-10" :nnid="milestone.firstClearerNnid" />
        </div>
        <div
          class="flex items-center gap-5 flex-wrap md:flex-nowrap w-min md:w-fit"
        >
          <div
            class="flex gap-2 items-center md:w-[clamp(350px,45vw,480px)] flex-nowrap"
          >
            <Icon name="noto:trophy" size="56" />
            <div class="text-nowrap">
              <div
                class="hidden lg:flex text-4xl items-center relative z-10 flex-nowrap"
              >
                <PlayerNnid :nnid="leaderboard[0]?.nnid" :size="32" />
              </div>
              <div
                class="hidden sm:flex lg:hidden text-2xl items-center relative z-10 flex-nowrap"
              >
                <PlayerNnid :nnid="leaderboard[0]?.nnid" :size="28" />
              </div>
              <div
                class="sm:hidden text-xl leading-5 relative z-10 flex flex-nowrap"
              >
                <PlayerNnid :nnid="leaderboard[0]?.nnid" :size="20" />
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
              <div class="leading-tight text-nowrap">
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
              <div class="leading-tight text-nowrap">
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
    </div>
    <div
      class="text-center border-t lg:border-0 w-full pt-2 lg:pt-0 lg:w-fit ml-auto"
    >
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
