<template>
  <div class="country-map w-full h-full" ref="mapEl" />
</template>

<script lang="ts" setup>
import Highcharts, { type HTMLDOMElement } from 'highcharts/highmaps';
import { CHART_MAIN_COLOR, COURSE_WORLD_CARD_TEXT } from '~/constants/colors';

const mapEl = ref<HTMLElement>();

const { countryList } = useCountries();

const seriesData = computed(() =>
  useMap(unref(countryList), (data, code) => ({
    code,
    value: data.clearedTotal,
    leaderboard: data.leaderboardPreview,
  })),
);

onMounted(async () => {
  const topology = await fetch(
    'https://code.highcharts.com/mapdata/custom/world.topo.json',
  ).then((response) => response.json());

  const chart = Highcharts.mapChart(unref(mapEl)! as HTMLDOMElement, {
    chart: {
      map: topology,
      backgroundColor: 'transparent',
    },
    title: {
      text: 'Clears by Country',
      style: {
        color: COURSE_WORLD_CARD_TEXT,
        fontWeight: 'normal',
        fontSize: '1.25rem',
        fontFamily:
          'Roboto, "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
      },
    },
    credits: {
      href: 'https://issmmbeatenyet.com',
      mapText: ' Data source: issmmbeatenyet.com; Nintendo',
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom',
      },
    },
    colorAxis: {
      type: 'logarithmic',
      min: 1,
      max: 50000,
      maxColor: CHART_MAIN_COLOR,
      endOnTick: false,
      gridLineWidth: 2,
      gridLineColor: 'white',
      minorTickInterval: 1,
      minorGridLineColor: 'white',
      tickLength: 0,
    },
    tooltip: {
      valueSuffix: ' levels',
      useHTML: true,
      formatter: function (tooltip) {
        const baseTooltip = tooltip.defaultFormatter.call(this, tooltip);
        const leaderboard = getRankedLeaderboard(
          unref(seriesData)[this.index].leaderboard,
        );
        const medals = {
          1: '🥇',
          2: '🥈',
          3: '🥉',
        } as Record<number, string>;
        const leadersTooltip = leaderboard
          .map(
            (entry) =>
              `<tr>
                  <td>${medals[entry.rank] ?? `#${entry.rank}:`}</td>
                  <td class="px-1"><b>${entry.nnid}</b></td>
                  <td class="px-1">${entry.total} level${entry.total !== 1 ? 's' : ''}</td>
                </tr>`,
          )
          .join('');
        return Array.isArray(baseTooltip)
          ? [...baseTooltip, '<table class="mt-1">', leadersTooltip, '</table>']
          : baseTooltip + leadersTooltip;
      },
    },
    series: [
      {
        id: 'clears',
        type: 'map',
        data: unref(seriesData),
        name: 'Cleared',
        joinBy: ['iso-a2', 'code'],
      },
    ],
  });

  watch(seriesData, () => {
    chart.update({
      series: [
        {
          id: 'clears',
          type: 'map',
          data: unref(seriesData),
          name: 'Cleared',
          joinBy: ['iso-a2', 'code'],
        },
      ],
    });
  });
});
</script>
