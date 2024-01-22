<template>
  <div class="position-relative grid place-content-center">
    <Doughnut id="foo" :data="data" :options="{ responsive: true }" />
    <div
      class="position-absolute grid place-content-center top-0 bottom-0 left-0 right-0 text-6xl text-center"
    >
      {{ percentClear }}<br />clear
    </div>
  </div>
</template>

<script setup lang="ts">
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, DoughnutController, ArcElement } from 'chart.js';
import { COURSE_WORLD_CARD, SMM_YELLOW } from '~/constants/colors';

ChartJS.register(DoughnutController, ArcElement);

const props = defineProps({
  clearedLevels: {
    type: Number,
    required: true,
  },
  unclearedLevels: {
    type: Number,
    required: true,
  },
});

const percentClear = computed(() =>
  new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 0,
  }).format(
    props.clearedLevels / (props.clearedLevels + props.unclearedLevels),
  ),
);

const data = computed(() => {
  return {
    labels: ['Cleared', 'Uncleared'],
    datasets: [
      {
        data: [props.clearedLevels, props.unclearedLevels],
        backgroundColor: [SMM_YELLOW, COURSE_WORLD_CARD],
      },
    ],
  };
});
</script>
