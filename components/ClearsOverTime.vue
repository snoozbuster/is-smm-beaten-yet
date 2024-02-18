<template>
  <h3 class="text-xl">
    Clears over time
    <button
      v-tooltip.focus="'Clear dates are recorded in the GMT time zone'"
      class="ml-2 opacity-50 hover:opacity-100"
    >
      <span class="pi pi-question-circle"></span>
    </button>
  </h3>
  <PrimeTabMenu class="mb-3" :model="tabs" />
  <ChartContainer>
    <Line :data="data" :options="options" />
  </ChartContainer>
</template>

<script lang="ts" setup>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  TimeScale,
  LinearScale,
} from 'chart.js';
import 'chartjs-adapter-luxon';
import { DateTime } from 'luxon';
import type { TooltipItem } from 'chart.js';

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  TimeScale,
  LinearScale,
);

const props = defineProps({
  unclearedLevelCount: {
    type: Number,
    required: true,
  },
  clearsByDate: {
    type: Object as PropType<Record<string, number>>,
    required: true,
  },
});

const tab = ref('daily');

const tabs = [
  { label: 'Daily', command: () => (tab.value = 'daily') },
  { label: 'Weekly', command: () => (tab.value = 'weekly') },
];

const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    tooltip: {
      position: 'average',
      callbacks:
        unref(tab) === 'weekly'
          ? {
              title: (items: TooltipItem<any>[]) =>
                `${items[0].label} - ${DateTime.fromISO(
                  (items[0].raw as { x: string; y: number }).x,
                )
                  .endOf('week')
                  .toLocaleString(DateTime.DATE_MED)}`,
            }
          : undefined,
    },
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: unref(tab) === 'daily' ? 'day' : 'month',
        tooltipFormat: 'DDD',
      },
    },
    yClears: {
      type: 'linear',
      position: 'left',
    },
    yRemaining: {
      type: 'linear',
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
}));

const orderedDays = computed(() =>
  useSortBy(Object.keys(props.clearsByDate)).filter(
    (d) => DateTime.fromISO(d).isValid,
  ),
);

const remainingLevelsByDate = computed(() => {
  const remainingByDate: Record<string, number> = {};
  const dates = [...unref(orderedDays)];
  let lastDay = dates.pop()!;
  remainingByDate[lastDay] =
    props.clearsByDate[lastDay] + props.unclearedLevelCount;
  while (dates.length) {
    const currentDay = dates.pop()!;
    remainingByDate[currentDay] =
      remainingByDate[lastDay] + props.clearsByDate[currentDay];
    lastDay = currentDay;
  }

  return remainingByDate;
});

const computeWeeklyData = (datapoints: Record<string, number>, sum = true) => {
  return useMapValues(
    useGroupBy(unref(orderedDays), (day) =>
      DateTime.fromISO(day).startOf('week').toISOWeekDate(),
    ),
    (days) =>
      sum ? useSumBy(days, (d) => datapoints[d]) : datapoints[days[0]],
  );
};

const data = computed(() => {
  const datapoints =
    unref(tab) === 'daily'
      ? props.clearsByDate
      : computeWeeklyData(props.clearsByDate);
  const leftEdge =
    unref(tab) === 'daily'
      ? DateTime.now().minus({ month: 1 }).toISODate()
      : /* there is a huge spike of 6k the week before this which dwarfs the
         * rest of the chart
         */
        DateTime.fromISO('2023-02-06').toISOWeekDate()!;
  const days = useSortBy(Object.keys(datapoints)).filter(
    (dateCleared) => dateCleared >= leftEdge,
  );

  const remainingDatapoints =
    unref(tab) === 'daily'
      ? unref(remainingLevelsByDate)
      : computeWeeklyData(unref(remainingLevelsByDate), false);
  return {
    datasets: [
      {
        label: 'Clears',
        data: days.map((d) => ({
          x: d,
          y: datapoints[d],
        })),
        pointRadius: 0,
        pointHitRadius: 5,
        yAxisID: 'yClears',
      },
      {
        label: 'Remaining',
        data: days.map((d) => ({
          x: d,
          y: remainingDatapoints[d],
        })),
        borderColor: '#8f2532aa',
        backgroundColor: '#8f2532aa',
        pointRadius: 0,
        pointHitRadius: 5,
        yAxisID: 'yRemaining',
      },
    ],
  };
});
</script>
