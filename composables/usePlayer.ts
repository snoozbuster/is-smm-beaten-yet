import type { NuxtError } from '#app';
import { PLAYERS_ROOT_URL } from '~/constants/levelData';
import type { ClearedLevel, ClearedLevelStatSummary } from '~/types/levels';

export interface Player {
  levels: ClearedLevel[];
  countryCode: string;
  stats: Pick<
    ClearedLevelStatSummary,
    'clearsByDate' | 'clearedTotal' | 'mostRecentClear' | 'lastClears'
  >;
}

export function usePlayer(nnid: MaybeRef<string>) {
  const {
    data: player,
    pending,
    error,
  } = useAsyncData<Player, NuxtError, Player | undefined>(
    `player-${unref(nnid)}`,
    () => $fetch(`${PLAYERS_ROOT_URL}/${unref(nnid)}.json`),
    {
      deep: false,
      immediate: true,
      server: false,
      lazy: true,
    },
  );

  return {
    player,
    pending,
    error,
  };
}
