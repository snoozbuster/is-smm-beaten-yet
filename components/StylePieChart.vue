<template>
  <h3 class="text-xl">
    Uncleared levels by {{ tab === 'countryCode' ? 'country' : tab }}
  </h3>
  <PrimeTabMenu class="mb-3 -mx-2 md:mx-0" :model="tabs" />
  <ChartContainer>
    <Pie :data="data" :options="options" />
  </ChartContainer>
</template>

<script setup lang="ts">
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, PieController, ArcElement, Legend } from 'chart.js';
import {
  CHART_MAIN_COLOR,
  COURSE_WORLD_TEXT,
  SMM_YELLOW,
} from '~/constants/colors';
import type { UnclearedLevel } from '~/types/levels';
import { COUNTRIES } from '~/constants/levelData';

ChartJS.register(PieController, ArcElement, Legend);

const props = defineProps({
  unclearedLevels: {
    type: Object as PropType<UnclearedLevel[]>,
    required: true,
  },
});

const tooltipCallbacks = useUnclearedTooltipFormatter(
  toRef(props, 'unclearedLevels'),
);

const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
    tooltip: {
      enabled: true,
      callbacks: tooltipCallbacks,
    },
  },
}));

const tab = ref<'style' | 'countryCode' | 'theme'>('style');

const labelMaps = {
  style: {
    SMB1: 'Super Mario Bros.',
    SMW: 'Super Mario World',
    SMB3: 'Super Mario Bros. 3',
    NSMBU: 'New Super Mario Bros. U',
  } as Record<string, string>,
  countryCode: useMapValues(useKeyBy(COUNTRIES, 'value'), 'name'),
  theme: undefined,
};

const styleData = computed(() => {
  const styles = useToPairs(useGroupBy(props.unclearedLevels, unref(tab)));

  const styleLabelKey = labelMaps[unref(tab)];

  return {
    labels: styles.map(([style]) =>
      styleLabelKey ? styleLabelKey[style] : style,
    ),
    datasets: [
      {
        label: 'remaining',
        data: styles.map(([_, levels]) => levels.length),
        backgroundColor: [
          '#6c43a1',
          CHART_MAIN_COLOR,
          '#8f2532',
          SMM_YELLOW,
          COURSE_WORLD_TEXT,
          '#d4d530',
        ],
      },
    ],
  };
});

const tabs = [
  { label: 'Style', command: () => (tab.value = 'style') },
  { label: 'Theme', command: () => (tab.value = 'theme') },
  { label: 'Country', command: () => (tab.value = 'countryCode') },
];

const data = computed(() => {
  return styleData.value;
});
</script>
