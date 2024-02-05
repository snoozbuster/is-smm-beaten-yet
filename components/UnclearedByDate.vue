<template>
  <h3 class="text-xl">Uncleared levels by date</h3>
  <PrimeTabMenu class="mb-3" :model="tabs" />
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
  TimeScale,
  LinearScale,
} from 'chart.js';
import type { UnclearedLevel } from '~/types/levels';

ChartJS.register(BarController, BarElement, TimeScale, LinearScale);

const props = defineProps({
  unclearedLevels: {
    type: Object as PropType<UnclearedLevel[]>,
    required: true,
  },
});

const tab = ref('year');

const tabs = [
  { label: 'Year', command: () => (tab.value = 'year') },
  { label: 'Month', command: () => (tab.value = 'month') },
];

const options = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: 'time',
        grid: {
          offset: unref(tab) === 'year',
        },
        time: {
          unit: 'year',
          tooltipFormat: unref(tab) === 'year' ? 'yyyy' : 'LLLL yyyy',
          displayFormats:
            unref(tab) === 'year'
              ? {}
              : {
                  month: 'LLL yyyy',
                  year: 'yyyy',
                },
        },
        ticks: {
          major: { enabled: true },
        },
      },
    },
  };
});

const data = computed(() => {
  const levelCountByYear = useMapValues(
    useGroupBy(
      props.unclearedLevels.filter(({ uploadDate }) => uploadDate),
      ({ uploadDate }) =>
        uploadDate.substring(0, unref(tab) === 'year' ? 4 : 7),
    ),
    'length',
  );
  const years = useSortBy(Object.keys(levelCountByYear));
  return {
    datasets: [
      {
        label: 'Levels',
        data: years.map((date) => ({
          x: date,
          y: levelCountByYear[date],
        })),
      },
    ],
  };
});
</script>
