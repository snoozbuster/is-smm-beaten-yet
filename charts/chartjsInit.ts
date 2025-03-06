import {
  Chart as ChartJS,
  Tooltip,
  type ChartType,
  type TooltipPositionerFunction,
} from 'chart.js';
import { CHART_MAIN_COLOR, COURSE_WORLD_CARD_TEXT } from '~/constants/colors';

declare module 'chart.js' {
  interface TooltipPositionerMap {
    mouse: TooltipPositionerFunction<ChartType>;
  }
}

export function initChartJs() {
  ChartJS.register(Tooltip);
  ChartJS.defaults.datasets.bar.backgroundColor = CHART_MAIN_COLOR;
  ChartJS.defaults.datasets.line.borderColor = CHART_MAIN_COLOR;
  ChartJS.defaults.datasets.line.backgroundColor = CHART_MAIN_COLOR;
  ChartJS.defaults.color = COURSE_WORLD_CARD_TEXT;
  ChartJS.defaults.borderColor = COURSE_WORLD_CARD_TEXT;
  Tooltip.positioners.mouse = function (_elements, eventPosition) {
    return eventPosition;
  } as TooltipPositionerFunction<ChartType>;
  ChartJS.defaults.plugins.tooltip.position = 'mouse';
}
