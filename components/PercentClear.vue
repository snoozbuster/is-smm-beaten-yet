<template>
  <div class="align-center flex h-full justify-center position-relative w-full">
    <Doughnut id="foo" :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, DoughnutController, ArcElement } from 'chart.js';
import {
  COURSE_WORLD_CARD,
  COURSE_WORLD_TEXT,
  SMM_YELLOW,
} from '~/constants/colors';
import DonutCenterTextPlugin from '~/charts/donutCenterTextPlugin';

ChartJS.register(DoughnutController, ArcElement, DonutCenterTextPlugin);

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

const options = computed(() => ({
  responsive: true,
  plugins: {
    donut_center_text: {
      text: `${percentClear.value} clear`,
      color: COURSE_WORLD_TEXT,
      minFontSize: 20,
      maxFontSize: 200,
    },
  },
}));

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