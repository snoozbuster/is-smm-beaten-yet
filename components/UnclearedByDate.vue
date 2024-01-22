<template>
  <h3 class="text-xl">Uncleared levels by date</h3>
  <v-tabs v-model="tab">
    <v-tab value="year">Year</v-tab>
    <v-tab value="month">Month</v-tab>
  </v-tabs>
  <Bar :data="data" :options="{ responsive: true }" />
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
import type { LevelData } from '~/server/api/levels/uncleared';

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  unclearedLevels: {
    type: Object as PropType<LevelData[]>,
    required: true,
  },
});

const tab = ref('year');

const data = computed(() => {
  const levelCountByYear = useMapValues(
    useGroupBy(props.unclearedLevels, ({ uploadDate }) =>
      uploadDate.substring(0, unref(tab) === 'year' ? 4 : 7),
    ),
    'length',
  );
  const years = useSortBy(Object.keys(levelCountByYear));
  return {
    labels: years,
    datasets: [
      {
        label: 'Levels',
        data: years.map((y) => levelCountByYear[y]),
      },
    ],
  };
});
</script>
