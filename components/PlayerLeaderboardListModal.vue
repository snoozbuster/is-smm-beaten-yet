<template>
  <PrimeDialog
    :visible="visible"
    class="w-screen lg:w-3/4"
    header="All leaderboard placements"
    :draggable="false"
    modal
    maximizable
    :content-style="{ height: '80vh' }"
    @update:visible="$emit('update:visible', $event)"
  >
    <PrimeDataTable
      v-model:sort-field="sortField"
      v-model:sort-order="sortOrder"
      :value="ranks"
      scrollable
      scroll-height="flex"
      data-key="name"
      :pt="{
        virtualScroller: {
          root: { class: 'table-scroller-root min-h-full' },
        },
      }"
    >
      <PrimeColumn
        header="Leaderboard"
        field="name"
        class="truncate max-w-[200px]"
      />
      <PrimeColumn
        header="Rank"
        field="rank"
        sortable
        class="text-right text-nowrap w-[80px]"
      >
        <template #body="{ data }">
          {{ LEADERBOARD_RANK_MEDALS[data.rank] ?? `#${data.rank}` }}
        </template>
      </PrimeColumn>
      <PrimeColumn
        header="Clears"
        field="score"
        sortable
        class="text-right"
        :pt="{
          headercontent: { class: 'flex-row-reverse' },
        }"
      >
        <template #body="{ data }">
          {{ formatNumber(data.score) }}
        </template>
      </PrimeColumn>
      <PrimeColumn class="w-1/2">
        <template #body="{ data }">
          <div
            class="h-[20px] rounded-r-xl"
            :style="{
              width: `${(data.score / maxScore) * 100}%`,
              background: CHART_MAIN_COLOR,
            }"
          />
        </template>
      </PrimeColumn>
    </PrimeDataTable>
  </PrimeDialog>
</template>

<script lang="ts" setup>
import { CHART_MAIN_COLOR } from '~/constants/colors';
import { LEADERBOARD_RANK_MEDALS } from '~/constants/leaderboards';

type PlayerLeaderboardRank = {
  name: string;
  rank: number;
  score: number;
  nnid: string;
};

const props = withDefaults(
  defineProps<{
    visible: boolean;
    ranks?: PlayerLeaderboardRank[];
  }>(),
  { ranks: () => [] },
);

defineEmits<{ (e: 'update:visible', value: boolean): void }>();

const sortField = ref<string>('rank');
const sortOrder = ref<1 | -1>(1);

watch(sortField, (newVal, oldVal) => {
  if (newVal === 'score' && oldVal !== 'score') {
    sortOrder.value = -1;
  }
});

const { formatNumber } = useFormatters();

const maxScore = computed(() => useMaxBy(props.ranks, 'score')?.score ?? 1);
</script>
