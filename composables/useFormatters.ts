import { DateTime } from 'luxon';
import { parse } from 'accept-language-parser';

function getNavigatorLangs() {
  try {
    return navigator.languages as string[];
  } catch {
    return 'en-US';
  }
}

export default function useFormatters() {
  const { 'accept-language': langPref } = useRequestHeaders([
    'Accept-Language',
  ]);

  return {
    formatPercent: (
      numerator: number,
      denominator: number,
      { precision = 0, rounding = 'halfExpand' } = {},
    ) => {
      if (!denominator) {
        return '';
      }

      return new Intl.NumberFormat(
        langPref
          ? parse(langPref).map(({ code }) => code)
          : getNavigatorLangs(),
        {
          style: 'percent',
          maximumFractionDigits: precision,
          roundingMode: rounding,
        } as any,
      ).format(numerator / denominator);
    },
    formatNumber: (n: number) => new Intl.NumberFormat().format(n),
    formatDate: (d: string, short: boolean = false) =>
      DateTime.fromISO(d).toLocaleString(
        short ? DateTime.DATE_MED : DateTime.DATE_FULL,
      ),
  };
}
