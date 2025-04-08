<template>
  <CourseWorldCard class="px-6" :grid="false">
    <h3 class="text-xl font-semibold flex justify-center items-center">
      <span class="mx-auto">{{ title }}</span>
      <div
        v-if="leaderboards.length > 1"
        :class="['min-w-[170px]', 'text-right']"
      >
        <PrimeDropdown
          :model-value="leaderboards[selectedLeaderboardIndex]?.name"
          option-label="label"
          option-value="label"
          :options="tabs"
          :pt="{ input: { class: 'py-0 pr-0' }, item: { class: 'p-2' } }"
          @update:model-value="
            (name) =>
              (selectedLeaderboardIndex = props.leaderboards.findIndex(
                (l) => l.name === name,
              ))
          "
        >
          <template #value="{ value }">
            <slot v-if="value" name="option-icon" :option="value" />
            <span class="align-middle">{{ value }}</span>
          </template>
          <template #option="{ option }">
            <slot v-if="option" name="option-icon" :option="option.label" />
            <span class="align-middle">{{ option.label }}</span>
          </template>
        </PrimeDropdown>
      </div>
    </h3>
    <div
      class="flex flex-row-reverse flex-wrap lg:flex-nowrap justify-center mb-8"
    >
      <svg
        width="200"
        height="150"
        viewBox="0 0 200 150"
        preserve-aspect-ratio="xMidYMid meet"
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
      <div class="text-left self-center mt-4">
        <div
          v-for="i in 3"
          :key="leaderboard[i - 1]?.nnid"
          class="flex items-center text-lg"
        >
          <span class="text-xl mr-1">
            {{ LEADERBOARD_RANK_MEDALS[i] }}
          </span>
          <PlayerNnid :nnid="leaderboard[i - 1]?.nnid" :size="22" />
        </div>
      </div>
    </div>
    <div class="pt-2 border-t -mx-3 px-3 -mb-2">
      <button class="hover:underline text-nowrap" @click="viewing = true">
        View full <Icon name="mdi:chevron-right" />
      </button>

      <LeaderboardModal
        v-if="viewing"
        :name="leaderboards[selectedLeaderboardIndex].name"
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
  title: {
    type: String,
    required: true,
  },
  leaderboards: {
    type: Array as PropType<
      { name: string; rankings: RankedLeaderboard<boolean> }[]
    >,
    default: () => [],
  },
});

const selectedLeaderboardIndex = ref(0);
const leaderboard = computed(
  () => props.leaderboards[unref(selectedLeaderboardIndex)]?.rankings ?? [],
);

const tabs = computed(() =>
  props.leaderboards.map(({ name }, index) => ({
    label: name,
    command: () => (selectedLeaderboardIndex.value = index),
  })),
);

const first = computed(() => unref(leaderboard)[0]);
const second = computed(() => unref(leaderboard)[1]);
const third = computed(() => unref(leaderboard)[2]);

const viewing = ref(false);

const { formatNumber } = useFormatters();
</script>
