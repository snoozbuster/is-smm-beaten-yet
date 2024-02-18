<template>
  <h3 class="text-xl">
    Clears over time
    <button
      v-tooltip.focus="'Clear dates are recorded in the GMT time zone'"
      class="ml-2 opacity-50 hover:opacity-100"
    >
      <span class="pi pi-question-circle"></span>
    </button>
  </h3>
  <PrimeTabMenu class="mb-3" :model="tabs" />
  <ChartContainer>
    <Line :data="data" :options="options" />
  </ChartContainer>
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

const tabs = [
  { label: 'Daily', command: () => (tab.value = 'daily') },
  { label: 'Weekly', command: () => (tab.value = 'weekly') },
];

const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    tooltip: {
      position: 'average',
    },
    legend: {
      display: false,
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
