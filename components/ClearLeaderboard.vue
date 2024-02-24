<template>
  <h3 class="text-xl mb-3">Top clears leaderboard</h3>
  <ChartContainer>
    <Bar :data="data" :options="options" />
  </ChartContainer>
</template>

<script lang="ts" setup>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  clearsByPerson: {
    type: Object as PropType<Record<string, number>>,
    required: true,
  },
});

const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
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
    '1',
    'desc',
  ).slice(0, 10);

  return {
    labels: clearers.map(([user]) => user),
    datasets: [
      {
        label: 'Clears',
        data: clearers.map(([_, clears]) => clears),
      },
    ],
  };
});
</script>
