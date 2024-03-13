<template>
  <div class="align-center flex h-full justify-center position-relative w-full">
    <Doughnut :data="data" :options="options" />
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

const { formatPercent } = useFormatters();

const percentClear = computed(() => {
  const numerator = props.clearedLevels;
  const denominator = props.clearedLevels + props.unclearedLevels;

  const precision = numerator / denominator >= 0.991 ? 2 : 0;

  return formatPercent(numerator, denominator, {
    precision,
    rounding: 'trunc',
  });
});

const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: false,
    legend: {
      display: false,
    },
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
        borderColor: props.unclearedLevels === 0 ? 'transparent' : undefined,
      },
    ],
  };
});
</script>
