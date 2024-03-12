<template>
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
  style: {
    type: String as PropType<'style' | 'theme' | 'countryCode'>,
    default: 'style',
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
  const styles = useToPairs(useGroupBy(props.unclearedLevels, props.style));

  const styleLabelKey = labelMaps[props.style];

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

const data = computed(() => {
  return styleData.value;
});
</script>
