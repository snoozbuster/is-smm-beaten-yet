<template>
  <div class="flex flex-col h-full min-h-0">
    <PrimeTabMenu
      v-if="hasMilestones"
      v-model:active-index="activeTabIndex"
      class="mb-2 -mx-1"
      :model="tabItems"
      :pt="{
        action: { class: 'text-course-world-card-text' },
        inkbar: { class: 'bg-course-world-card-contrast' },
      }"
    />
    <div class="flex flex-col flex-1 min-h-0 overflow-hidden">
      <template v-if="!hasMilestones || activeTabIndex === 0">
        <template v-if="ranks.length === 0">
          <p class="text-course-world-card-text">No leaderboard placements</p>
        </template>
        <template v-else-if="hasTop3">
          <PlayerAchievementPodium
            :count1="top3Counts[1]"
            :count2="top3Counts[2]"
            :count3="top3Counts[3]"
          />
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
                  LEADERBOARD_RANK_MEDALS[placement.rank] ??
                  `#${placement.rank}`
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
      </template>

      <div
        v-else
        class="flex flex-col flex-1 min-h-0 overflow-auto text-course-world-card-text"
      >
        <div v-if="displayedMilestones.length" class="mb-3">
          <h4 class="text-sm font-semibold uppercase tracking-wide mb-2 inline">
            Category finales
          </h4>
          <span
            v-tooltip.focus="
              'The last uncleared level in each category that received a \'first clear!\' when you cleared it.'
            "
            class="ml-1 cursor-help"
            tabindex="0"
          >
            <Icon name="mdi:information-outline" size="16" />
          </span>
          <ul class="space-y-2 mt-1">
            <li
              v-for="m in displayedMilestones"
              :key="m.levelId + (m.dateCleared ?? '')"
            >
              <PlayerMajorMilestone
                v-if="!('month' in m)"
                :milestone="m as MajorMilestone"
                compact
                @click="openLevelPreview"
              />
              <PlayerMinorMilestone
                v-else
                :milestone="m as MinorMilestone"
                compact
                @click="openLevelPreview"
              />
            </li>
          </ul>
        </div>
        <button
          v-if="showViewAllMilestonesButton"
          class="mt-auto hover:underline text-nowrap"
          @click="showAllMilestones = true"
        >
          View all {{ totalMilestoneClears }} milestone clears
          <Icon name="mdi:chevron-right" />
        </button>
        <p v-else-if="!displayedMilestones.length" class="text-sm opacity-80">
          No milestone clears
        </p>
      </div>
    </div>

    <PlayerLeaderboardListModal
      v-model:visible="showAllPlacements"
      :ranks="ranks"
    />
    <PlayerMilestonesModal
      v-model:visible="showAllMilestones"
      :milestones="milestones"
      :cleared-levels="clearedLevels"
    />
    <LevelPreviewModal
      v-if="viewingLevel"
      :level="viewingLevel"
      @close="viewingLevel = undefined"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type {
  MajorMilestone,
  Milestone,
  MinorMilestone,
} from '~/types/players';
import type { ClearedLevel } from '~/types/levels';
import { LEADERBOARD_RANK_MEDALS } from '~/constants/leaderboards';

const props = defineProps({
  nnid: { type: String, required: true },
  milestones: {
    type: Array as PropType<Milestone[]>,
    default: () => [],
  },
  clearedLevels: {
    type: Array as PropType<ClearedLevel[]>,
    default: () => [],
  },
});

const { ranks } = usePlayerLeaderboardRanks(toRef(props, 'nnid'));
const { formatNumber, formatDate } = useFormatters();

const hasMilestones = computed(() => (props.milestones?.length ?? 0) > 0);

const activeTabIndex = ref(0);
const tabItems = [
  { label: 'Leaderboards', command: () => (activeTabIndex.value = 0) },
  { label: 'Milestone clears', command: () => (activeTabIndex.value = 1) },
];

const majorMilestones = computed(
  () =>
    props.milestones?.filter((m): m is MajorMilestone => !('month' in m)) ?? [],
);
const minorMilestones = computed(
  () =>
    props.milestones?.filter((m): m is MinorMilestone => 'month' in m) ?? [],
);

const displayLimit = 5;

const displayedMilestones = computed(() =>
  useOrderBy(
    [
      // Prefer major milestones for display if they exist
      ...useOrderBy(majorMilestones.value, 'dateCleared', 'desc'),
      ...useOrderBy(minorMilestones.value, 'dateCleared', 'desc'),
    ].slice(0, displayLimit),
    'dateCleared',
    'desc',
  ),
);

const totalMilestoneClears = computed(() => props.milestones?.length ?? 0);

const showViewAllMilestonesButton = computed(
  () => totalMilestoneClears.value > displayLimit,
);

const showAllMilestones = ref(false);

const viewingLevel = ref<ClearedLevel>();

function openLevelPreview(levelId: string) {
  const level = props.clearedLevels?.find((l) => l.levelId === levelId);
  if (level) viewingLevel.value = level;
}

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
