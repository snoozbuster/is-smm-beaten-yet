<template>
  <h3 class="text-xl">Uncleared levels by date</h3>
  <v-tabs v-model="tab">
    <v-tab value="year">Year</v-tab>
    <v-tab value="month">Month</v-tab>
  </v-tabs>
  <Bar :data="data" :options="options" />
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

const options = computed(() => {
  return {
    responsive: true,
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
