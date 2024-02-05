import { DateTime } from 'luxon';

export default function useFormatters() {
  return {
    formatPercent: (numerator: number, denominator: number, precision = 0) => {
      if (!denominator) {
        return '';
      }

      return new Intl.NumberFormat(navigator.languages as string[], {
        style: 'percent',
        maximumFractionDigits: precision,
      }).format(numerator / denominator);
    },
    formatNumber: (n: number) => new Intl.NumberFormat().format(n),
    formatDate: (d: string) => DateTime.fromISO(d).toFormat('DDD'),
  };
}
