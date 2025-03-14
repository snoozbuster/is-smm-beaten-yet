<template>
  <PrimeDataTable
    :value="leaderboard"
    sort-field="rank"
    :sort-order="1"
    scrollable
    scroll-height="flex"
    :virtual-scroller-options="{
      itemSize: 50,
    }"
    data-key="nnid"
    :pt="{
      virtualScroller: {
        root: {
          class: 'table-scroller-root min-h-full',
        },
      },
    }"
  >
    <PrimeColumn header="Rank" class="text-right text-nowrap w-[50px]">
      <template #body="{ data: { rank } }">
        {{ LEADERBOARD_RANK_MEDALS[rank] ?? `# ${rank}` }}
      </template>
    </PrimeColumn>
    <PrimeColumn header="NNID">
      <template #body="{ data: { nnid } }">
        <div class="flex items-center">
          <PlayerNnid :nnid="nnid" :size="16" />
        </div>
      </template>
    </PrimeColumn>
    <PrimeColumn
      field="score"
      header="Clears"
      class="text-right"
      :pt="{
        headercontent: {
          class: 'flex-row-reverse',
        },
      }"
    />
    <PrimeColumn class="w-1/2">
      <template #body="{ data: { score } }">
        <div
          class="h-[20px] rounded-r-xl"
          :style="{
            width: `${(score / biggestScore) * 100}%`,
            background: CHART_MAIN_COLOR,
          }"
        ></div>
      </template>
    </PrimeColumn>
  </PrimeDataTable>
</template>

<script lang="ts" setup>
import { CHART_MAIN_COLOR } from '~/constants/colors';
import { LEADERBOARD_RANK_MEDALS } from '~/constants/leaderboards';

const props = defineProps({
  leaderboard: {
    type: Array as PropType<RankedLeaderboard<boolean>>,
    default: () => [],
  },
});

defineEmits(['close']);

const biggestScore = computed(
  () => useMaxBy(props.leaderboard, 'score')?.score,
);
</script>
