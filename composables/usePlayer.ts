import type { NuxtError } from '#app';
import { PLAYERS_ROOT_URL } from '~/constants/levelData';
import knownPlayerData from '~/assets/users.json';
import milestones from '~/assets/milestones.json';
import type {
  BasePlayer,
  DecoratedPlayer,
  MajorMilestone,
  Milestone,
  Player,
} from '~/types/players';

const knownPlayers = useKeyBy(knownPlayerData, 'nnid');

type PlayersList = {
  [nnid: string]: {
    clearedTotal: number;
    countryCode: string;
    legacyClears: number;
  };
};

export type PlayerListItem = PlayersList[string] & DecoratedPlayer;

const parsePlayerData = (
  knownPlayerEntry: (typeof knownPlayerData)[number],
  clearCount: number,
  nnid: string,
) => ({
  awards: useCompact([
    (clearCount || 0) > 2500
      ? { name: '2500 Clears' }
      : (clearCount || 0) > 1000
        ? { name: '1000 Clears' }
        : undefined,
    ...(unref(knownPlayerEntry)?.awards ?? []),
  ]),
  discordName: unref(knownPlayerEntry)?.discord,
  milestones: useConcat<Milestone>(
    milestones.majorMilestones as MajorMilestone[],
    milestones.monthMilestones,
  ).filter(({ firstClearerNnid }) => firstClearerNnid === unref(nnid)),
});

export function usePlayerList() {
  const {
    data: players,
    pending,
    error,
  } = useAsyncData<PlayersList, NuxtError, Record<string, PlayerListItem>>(
    `players-list`,
    () => $fetch(`${PLAYERS_ROOT_URL}/list.json`),
    {
      deep: false,
      immediate: true,
      server: true,
      transform: (playersList) => {
        return useMapValues(
          playersList!,
          (player, nnid) =>
            ({
              ...player,
              ...parsePlayerData(knownPlayers[nnid], player.clearedTotal, nnid),
            }) as PlayerListItem,
        );
      },
    },
  );

  return {
    players,
    pending,
    error,
  };
}

export function usePlayer(nnid: MaybeRef<string>) {
  const {
    data: player,
    pending,
    error,
  } = useAsyncData<BasePlayer, NuxtError, BasePlayer>(
    `player-${unref(nnid)}`,
    () => $fetch(`${PLAYERS_ROOT_URL}/${unref(nnid)}.json`),
    {
      deep: false,
      immediate: true,
      server: false,
      lazy: true,
    },
  );

  const knownPlayerEntry = computed(() =>
    knownPlayerData.find((entry) => entry.nnid === unref(nnid)),
  );

  return {
    player: computed(() =>
      unref(player)
        ? ({
            ...unref(player),
            ...parsePlayerData(
              unref(knownPlayerEntry)!,
              unref(player)!.levels.length,
              unref(nnid),
            ),
          } as Player)
        : undefined,
    ),
    pending,
    error,
  };
}
