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
import type { ClearedLevel } from '~/types/levels';

ChartJS.register(PieController, ArcElement, Legend);

const props = defineProps({
  clearedLevels: {
    type: Object as PropType<ClearedLevel[]>,
    required: true,
  },
  style: {
    type: String as PropType<'style' | 'theme' | 'countryCode'>,
    default: 'style',
  },
});

const tooltipCallbacks = useUnclearedTooltipFormatter(
  toRef(props, 'clearedLevels'),
);

const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'right',
      labels: {
        boxWidth: 13,
      },
    },
    tooltip: {
      enabled: true,
      callbacks: tooltipCallbacks,
    },
  },
}));

const { formatCountryName } = useFormatters();

const labelMaps = {
  style: (style: string) =>
    ({
      SMB1: 'Super Mario Bros.',
      SMW: 'Super Mario World',
      SMB3: 'Super Mario Bros. 3',
      NSMBU: 'New Super Mario Bros. U',
    })[style],
  countryCode: (countryCode: string) => formatCountryName(countryCode),
  theme: undefined,
};

const styleData = computed(() => {
  const styles = useOrderBy(
    useToPairs(
      useOmit(useGroupBy(props.clearedLevels, props.style), [
        'null',
        'undefined',
      ]),
    ),
    '1',
    'desc',
  );

  const styleLabelFn = labelMaps[props.style];

  return {
    labels: styles.map(([style]) =>
      styleLabelFn ? styleLabelFn(style) : style,
    ),
    datasets: [
      {
        label: 'cleared',
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
