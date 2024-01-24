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

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  TimeScale,
  LinearScale,
);

const props = defineProps({
  clearsByDate: {
    type: Object as PropType<Record<string, number>>,
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
        tooltipFormat: 'DDD',
      },
    },
  },
}));

const data = computed(() => {
  const leftEdge = DateTime.now()
    .minus({ month: unref(tab) === 'daily' ? 1 : 3 })
    .toISODate();
  const days = useSortBy(
    Object.keys(props.clearsByDate).filter(
      (dateCleared) => dateCleared >= leftEdge,
    ),
  );
  return {
    datasets: [
      {
        label: 'Clears',
        data: days.map((d) => ({
          x: d,
          y: props.clearsByDate[d],
        })),
        pointRadius: 0,
        pointHitRadius: 5,
      },
    ],
  };
});
</script>
