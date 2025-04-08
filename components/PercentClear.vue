<template>
  <div class="align-center flex h-full justify-center position-relative w-full">
    <Doughnut :data="data" :options="options" />
    <PrimeButton
      class="hover:underline text-course-world-contrast absolute block mx-auto p-0 text-sm font-normal top-1/2 left-1/2 -translate-x-1/2 mt-5"
      link
      @click="modalOpen = true"
    >
      Learn why
      <i class="pi pi-angle-right -ml-1 text-sm"></i>
    </PrimeButton>
  </div>
  <TthHistoryModal v-model:visible="modalOpen" />
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

const modalOpen = ref(false);

const { formatPercent, formatDate } = useFormatters();

const unclearedLevels = computed(() => {
  return props.unclearedLevels;
});

const percentClear = computed(() => {
  return formatPercent(101, 100, {
    precision: 0,
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
        data: [props.clearedLevels, unclearedLevels.value],
        backgroundColor: [SMM_YELLOW, COURSE_WORLD_CARD],
        borderColor: unclearedLevels.value === 0 ? 'transparent' : undefined,
      },
    ],
  };
});
</script>
