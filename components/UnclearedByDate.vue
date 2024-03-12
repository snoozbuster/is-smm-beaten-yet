<template>
  <ChartContainer>
    <Bar :data="data" :options="options" />
  </ChartContainer>
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
  unit: {
    type: String as PropType<'year' | 'month'>,
    default: 'year',
  },
});

const tooltipCallbacks = useUnclearedTooltipFormatter(
  toRef(props, 'unclearedLevels'),
);

const options = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: tooltipCallbacks,
      },
    },
    scales: {
      x: {
        type: 'time',
        grid: {
          offset: props.unit === 'year',
          display: false,
        },
        time: {
          unit: 'year',
          tooltipFormat: props.unit === 'year' ? 'yyyy' : 'LLLL yyyy',
          displayFormats:
            props.unit === 'year'
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
        uploadDate.substring(0, props.unit === 'year' ? 4 : 7),
    ),
    'length',
  );
  const years = useSortBy(Object.keys(levelCountByYear));
  return {
    datasets: [
      {
        label: 'remaining',
        data: years.map((date) => ({
          x: date,
          y: levelCountByYear[date],
        })),
      },
    ],
  };
});
</script>
