<template>
  <h3 class="text-xl">Clears over time</h3>
  <v-tabs v-model="tab">
    <v-tab value="daily">Daily</v-tab>
    <v-tab value="weekly">Weekly</v-tab>
  </v-tabs>
  <Line :data="data" :options="options" />
</template>

<script lang="ts" setup>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  TimeScale,
  LinearScale,
} from 'chart.js';
import 'chartjs-adapter-luxon';
import { DateTime } from 'luxon';
import type { ClearedLevel } from '~/server/api/levels/cleared';

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  TimeScale,
  LinearScale,
);

const props = defineProps({
  clearedLevels: {
    type: Object as PropType<ClearedLevel[]>,
    required: true,
  },
});

const tab = ref('daily');

const options = computed(() => ({
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    tooltip: {
      position: 'average',
    },
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: unref(tab) === 'daily' ? 'day' : 'week',
      },
    },
  },
}));

const data = computed(() => {
  const leftEdge = DateTime.now()
    .minus({ month: unref(tab) === 'daily' ? 1 : 3 })
    .toISODate();
  const levelCountByDate = useMapValues(
    useGroupBy(
      props.clearedLevels.filter(({ dateCleared }) => dateCleared >= leftEdge),
      'dateCleared',
    ),
    'length',
  );
  const days = useSortBy(Object.keys(levelCountByDate));
  return {
    datasets: [
      {
        label: 'Clears',
        data: days.map((d) => ({
          x: d,
          y: levelCountByDate[d],
        })),
        pointRadius: 0,
        pointHitRadius: 5,
      },
    ],
  };
});
</script>
