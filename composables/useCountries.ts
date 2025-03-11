import type { NuxtError } from '#app';
import { LEVELS_ROOT_URL } from '~/constants/levelData';
import type { LegacySupportedLeaderboardEntry } from '~/types/leaderboards';

interface CountryList {
  [countryCode: string]: {
    clearedTotal: number;
    leaderboardPreview: LegacySupportedLeaderboardEntry[];
  };
}

export function useCountries() {
  const {
    data: countryList,
    pending,
    error,
  } = useAsyncData<CountryList, NuxtError, CountryList>(
    `country-list`,
    () => $fetch(`${LEVELS_ROOT_URL}/country/list.json`),
    {
      deep: false,
      immediate: true,
      server: false,
      lazy: true,
    },
  );

  return {
    countryList,
    pending,
    error,
  };
}
