import type { NuxtError } from '#app';
import { PLAYERS_ROOT_URL } from '~/constants/levelData';
import knownPlayerData from '~/assets/users.json';
import milestones from '~/assets/milestones.json';
import type {
  BasePlayer,
  MajorMilestone,
  Milestone,
  Player,
} from '~/types/players';

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
      player
        ? ({
            ...unref(player),
            awards: useCompact([
              (unref(player)?.levels.length || 0) > 2500
                ? { name: '2500 Clears' }
                : (unref(player)?.levels.length || 0) > 1000
                  ? { name: '1000 Clears' }
                  : undefined,
              ...(unref(knownPlayerEntry)?.awards ?? []),
            ]),
            discordName: unref(knownPlayerEntry)?.discord,
            milestones: useConcat<Milestone>(
              milestones.majorMilestones as MajorMilestone[],
              milestones.monthMilestones,
            ).filter(
              ({ firstClearerNnid }) => firstClearerNnid === unref(nnid),
            ),
          } as Player)
        : undefined,
    ),
    pending,
    error,
  };
}
