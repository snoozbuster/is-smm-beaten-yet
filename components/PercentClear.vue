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
  <PrimeDialog
    v-model:visible="modalOpen"
    class="w-full md:w-2/3"
    header="101% Clear"
    modal
    dismissable-mask
  >
    <p class="mb-3">
      Originally, it was believed that a level called Trimming the Herbs would
      be the final uncleared level. However, after over seven years, the creator
      of Trimming the Herbs revealed that the level was, in fact, a convoluted
      sort of troll. Despite a general belief both then and now that
      tool-assisted speedruns (TASes) were not possible on the Wii U, the
      creator had access to a hardware-based TAS prototype which was used to
      develop and clear-check TTH. It was apparently intended to be revealed to
      the public as such, but the level remained relatively obscure even in the
      community it was designed to troll and was eventually forgotten (until
      Team 0% uncovered it). Since the level was not uploaded legitimately, it
      was excluded from Team 0%'s list of uncleared levels. As a result of this
      shocking revelation, Team 0% considers Super Mario Maker 1 to have been
      100% cleared on {{ formatDate('2024-03-15') }}, the day that Yamada (aka
      "kazeihinn") cleared The Last Dance.
    </p>

    <p class="mb-3">
      However, this isn't quite the end of the story. Trimming the Herbs isn't
      <i>impossible</i> for a human, and on
      {{ formatDate('2024-04-05T5:15:00-07:00') }} (only a couple days before
      the SMM1 servers shut down for good), after over 100 hours of practice and
      attempts, a player by the name of
      <a
        class="text-blue-500 hover:underline"
        href="https://twitter.com/sanyx91smm2"
        target="_blank"
        >Sanyx91SMM2</a
      >
      did what the original creator could not: he achieved the
      <a
        class="text-blue-500 hover:underline"
        href="https://twitter.com/sanyx91smm2/status/1776407036160291101"
        target="_blank"
        >first true clear</a
      >
      of TTH. Since TTH was excluded from the team's goal due to the nature of
      its original upload and 100% was already achieved, we choose to treat this
      clear of the "secret final boss" of Super Mario Maker as the 101st
      completion percentage to signify his dedication to going above and beyond
      in the effort to truly complete every level in the game.
    </p>
  </PrimeDialog>
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
