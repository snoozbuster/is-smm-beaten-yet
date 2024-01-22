<template>
  <h3 class="text-xl">Top 10 clearers</h3>
  <Bar :data="data" :options="options" />
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
import type { ClearedLevel } from '~/server/api/levels/cleared';

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  clearedLevels: {
    type: Object as PropType<ClearedLevel[]>,
    required: true,
  },
});

const options = computed(() => ({
  responsive: true,
  aspectRatio: 1.5,
  indexAxis: 'y',
  scales: {
    y: {
      ticks: {
        autoSkip: false,
      },
    },
  },
}));

const data = computed(() => {
  const levelCountByClearer = useMapValues(
    useGroupBy(props.clearedLevels, 'firstClearerNnid'),
    (levels, user) => ({ user, clears: levels.length }),
  );
  const clearers = useOrderBy(levelCountByClearer, 'clears', 'desc').slice(
    0,
    10,
  );
  return {
    labels: clearers.map(({ user }) => user),
    datasets: [
      {
        label: 'Clears',
        data: clearers.map(({ clears }) => clears),
      },
    ],
  };
});
</script>
