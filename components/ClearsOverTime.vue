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
import type { PropType } from 'vue';
import type { ClearedLevelStatSummary } from '~/types/levels';
import { SHUTDOWN_DATE } from '~/constants/levelData';
import { Legend } from 'chart.js';

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  TimeScale,
  LinearScale,
  Legend,
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
  winners: {
    type: Object as PropType<ClearedLevelStatSummary['winners']>,
    required: true,
  },
  allTime: {
    type: Boolean,
    default: false,
  },
});

const tab = ref<'daily' | 'weekly'>('daily');

const tabs = [
  { label: 'Daily', command: () => (tab.value = 'daily') },
  { label: 'Weekly', command: () => (tab.value = 'weekly') },
];

const { formatNumber } = useFormatters();

const topClearerTooltipCallback = (items: TooltipItem<any>[]) => {
  const day = (items[0].raw as { x: string; y: number }).x;
  const winner = props.winners[unref(tab)][day];

  const creators = useCompact([
    winner.creators[0],
    ...useChunk(winner.creators.slice(1), 2).map((s) => s.join(', ')),
  ]).join(',\n');

  return `Most clears: ${creators} (${
    winner.creators.length > 1 ? 'tied with ' : ''
  }${formatNumber(winner.levels)} level${winner.levels === 1 ? '' : 's'})`;
};

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
      footerFont: { weight: 'normal' },
      callbacks:
        unref(tab) === 'weekly'
          ? {
              title: (items: TooltipItem<any>[]) =>
                `${items[0].label} - ${DateTime.fromISO(
                  (items[0].raw as { x: string; y: number }).x,
                )
                  .endOf('week')
                  .toLocaleString(DateTime.DATE_MED)}`,
              footer: topClearerTooltipCallback,
            }
          : {
              footer: topClearerTooltipCallback,
            },
    },
    legend: {
      display: true,
      position: 'bottom',
      onClick: useNoop,
    },
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: unref(tab) === 'daily' ? 'day' : 'month',
        tooltipFormat: 'DDD',
      },
      grid: {
        drawOnChartArea: false,
      },
    },
    yClears: {
      type: 'linear',
      position: 'left',
      beginAtZero: true,
    },
    yRemaining: {
      type: 'linear',
      position: 'right',
      beginAtZero: true,
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
      ? (props.allTime
          ? DateTime.fromISO('2023-02-06')!
          : DateTime.now().minus({ month: 2 })
        ).toISODate()
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

  const shutdown = DateTime.fromISO(SHUTDOWN_DATE);
  const rateToBeat = useMapValues(
    remainingDatapoints,
    (remainingLevels, day) => {
      const remainingDays = shutdown.diff(DateTime.fromISO(day), 'days').days;
      return (
        Math.ceil(remainingLevels / remainingDays) *
        (unref(tab) === 'daily' ? 1 : 7)
      );
    },
  );
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
        label: `${useCapitalize(unref(tab))} clear target`,
        data: days.map((d) => ({
          x: d,
          y: rateToBeat[d],
        })),
        borderDash: [4, 4],
        borderColor: '#6c43a1',
        backgroundColor: '#6c43a1',
        pointRadius: 0,
        pointHitRadius: 5,
        yAxisID: 'yClears',
      },
      {
        label: 'Remaining (start of day)',
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
