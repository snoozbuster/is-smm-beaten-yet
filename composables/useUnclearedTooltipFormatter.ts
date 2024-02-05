import type { TooltipItem } from 'chart.js';
import type { UnclearedLevel } from '~/types/levels';

export default function useUnclearedTooltipFormatter(
  unclearedLevels: Ref<UnclearedLevel[]>,
) {
  const { formatPercent, formatNumber } = useFormatters();

  return {
    label: (item: TooltipItem<any>) =>
      `${formatNumber(item.parsed.y ?? item.parsed)} ${
        item.dataset.label
      } (${formatPercent(
        item.parsed.y ?? item.parsed,
        unref(unclearedLevels).length,
        1,
      )} of total)`,
  };
}
