import { DateTime } from 'luxon';
import { parse } from 'accept-language-parser';

function getNavigatorLangs() {
  try {
    return navigator.languages as string[];
  } catch {
    return 'en-US';
  }
}

function useEnvironmentAgnosticLangs() {
  const { 'accept-language': langPref } = useRequestHeaders([
    'Accept-Language',
  ]);

  return langPref
    ? parse(langPref).map(({ code }) => code)
    : getNavigatorLangs();
}

export default function useFormatters() {
  const langs = useEnvironmentAgnosticLangs();

  return {
    formatCountryName: (countryCode: string) => {
      const regionNames = new Intl.DisplayNames(langs, {
        type: 'region',
      });
      return regionNames.of(countryCode.toUpperCase()) || countryCode;
    },
    formatPercent: (
      numerator: number,
      denominator: number,
      { precision = 0, rounding = 'halfExpand' } = {},
    ) => {
      if (!denominator) {
        return '';
      }

      return new Intl.NumberFormat(langs, {
        style: 'percent',
        maximumFractionDigits: precision,
        roundingMode: rounding,
      } as any).format(numerator / denominator);
    },
    formatNumber: (n: number) => new Intl.NumberFormat().format(n),
    formatDate: (d: string, short: boolean = false) =>
      DateTime.fromISO(d).toLocaleString(
        short ? DateTime.DATE_MED : DateTime.DATE_FULL,
      ),
  };
}
