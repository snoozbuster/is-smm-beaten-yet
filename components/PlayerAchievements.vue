<template>
  <div class="flex flex-col h-full">
    <template v-if="ranks.length === 0">
      <p class="text-course-world-card-text">No leaderboard placements</p>
    </template>
    <template v-else-if="hasTop3">
      <PlayerAchievementPodium
        :count1="top3Counts[1]"
        :count2="top3Counts[2]"
        :count3="top3Counts[3]"
      >
      </PlayerAchievementPodium>
    </template>
    <template v-else>
      <div class="space-y-2">
        <div
          v-for="placement in twoBestPlacements"
          :key="placement.name"
          class="flex items-center gap-2 text-course-world-card-text"
        >
          <span class="text-xl shrink-0">
            {{
              LEADERBOARD_RANK_MEDALS[placement.rank] ?? `#${placement.rank}`
            }}
          </span>
          <span class="truncate">{{ placement.name }}</span>
          <span class="shrink-0 text-right">
            {{ formatNumber(placement.score) }} clears
          </span>
        </div>
      </div>
    </template>
    <button
      v-if="showViewAllLink"
      class="mt-auto hover:underline text-nowrap text-course-world-card-text"
      @click="showAllPlacements = true"
    >
      View all placements <Icon name="mdi:chevron-right" />
    </button>

    <PlayerLeaderboardListModal
      v-model:visible="showAllPlacements"
      :ranks="ranks"
    />
  </div>
</template>

<script lang="ts" setup>
import { LEADERBOARD_RANK_MEDALS } from '~/constants/leaderboards';

const props = defineProps({
  nnid: {
    type: String,
    required: true,
  },
});

const { ranks } = usePlayerLeaderboardRanks(toRef(props, 'nnid'));
const { formatNumber } = useFormatters();

const top3Counts = computed(() => {
  const list = unref(ranks);
  return {
    1: list.filter((r) => r.rank === 1).length,
    2: list.filter((r) => r.rank === 2).length,
    3: list.filter((r) => r.rank === 3).length,
  };
});

const hasTop3 = computed(() => {
  const c = unref(top3Counts);
  return c[1] + c[2] + c[3] > 0;
});

/** Best by rank (lowest rank number), best by clears (highest score). Up to 2 distinct placements. */
const twoBestPlacements = computed(() => {
  const list = unref(ranks);
  if (list.length === 0) return [];
  const byRank = useMinBy(list, 'rank')!;
  const byClears = useMaxBy(list, 'score')!;
  if (byRank.name === byClears.name && byRank.rank === byClears.rank) {
    return [byRank];
  }
  return [byRank, byClears];
});

const showViewAllLink = computed(() => {
  const list = unref(ranks);
  return list.length > 2 || unref(hasTop3);
});

const showAllPlacements = ref(false);
</script>
