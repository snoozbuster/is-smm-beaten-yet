<template>
  <h3 class="text-xl mb-3">Most clears leaderboard</h3>
  <label class="ml-auto">
    Include legacy clears
    <PrimeCheckbox v-model="includeLegacy" class="align-text-bottom" binary />
  </label>
  <ChartContainer>
    <Bar :data="data" :options="options" />
  </ChartContainer>
  <span class="text-sm"> Full leaderboards coming soon! </span>
</template>

<script lang="ts" setup>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  type TooltipItem,
} from 'chart.js';

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  clearsByPerson: {
    type: Object as PropType<Record<string, number>>,
    required: true,
  },
  legacyClears: {
    type: Object as PropType<Record<string, number>>,
    required: true,
  },
});

const { formatNumber } = useFormatters();
const includeLegacy = ref(false);

const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index',
      filter: (item: TooltipItem<any>) => item.raw,
      callbacks: {
        label: (item: TooltipItem<any>) => {
          const label =
            item.dataset.label === 'Clears' && item.label in props.legacyClears
              ? 'Tracked clears'
              : item.dataset.label;
          return `${item.formattedValue} ${label}`;
        },
        beforeBody(items: TooltipItem<any>[]) {
          if (items.length < 2) {
            return null;
          }

          return `${formatNumber(useSumBy(items, 'raw'))} clears total`;
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        autoSkip: false,
      },
      grid: {
        display: false,
      },
    },
  },
}));

const data = computed(() => {
  const clearers = useOrderBy(
    useToPairs(props.clearsByPerson),
    ([user, clears]) =>
      clears + (includeLegacy.value ? props.legacyClears[user] ?? 0 : 0),
    'desc',
  ).slice(0, 10);

  return {
    labels: clearers.map(([user]) => user),
    datasets: useCompact([
      includeLegacy.value && {
        label: 'Legacy Clears (pre-bot)',
        data: clearers.map(([user]) => props.legacyClears[user]),
        backgroundColor: '#8f2532cc',
      },
      {
        label: 'Clears',
        data: clearers.map(([_, clears]) => clears),
        borderRadius: 15,
      },
    ]),
  };
});
</script>
