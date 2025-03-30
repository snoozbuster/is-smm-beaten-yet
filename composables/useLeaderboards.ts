import type { NuxtError } from '#app';
import { DateTime } from 'luxon';
import { LEADERBOARDS_ROOT_URL } from '~/constants/levelData';
import {
  type AllLeaderboards,
  type ClearCountLeaderboard,
  type Leaderboard,
  type LeaderboardEntry,
  type LegacySupportedLeaderboardEntry,
  type SubGroupedClearCountLeaderboard,
  type UngroupedClearCountLeaderboard,
  type ValidLeaderboardGroups,
} from '~/types/leaderboards';

export function useAllLeaderboards() {
  const {
    data: leaderboards,
    pending,
    error,
  } = useAsyncData<AllLeaderboards, NuxtError, AllLeaderboards>(
    `leaderboards`,
    () => $fetch(`${LEADERBOARDS_ROOT_URL}/list.json`),
    {
      deep: false,
      immediate: true,
      server: false,
      lazy: true,
    },
  );

  return {
    leaderboards,
    pending,
    error,
  };
}

type LeaderboardMapper<T> = (
  leaderboard: Leaderboard<boolean>,
  group: ClearCountLeaderboard,
  subgroup?: ValidLeaderboardGroups[keyof ValidLeaderboardGroups],
) => T;
const mapLeaderboard = <T>(
  leaderboards: AllLeaderboards,
  fn: LeaderboardMapper<T>,
) => {
  return useFlatMap(leaderboards?.clearCounts, (leaderboard, group) => {
    if (Array.isArray(leaderboard)) {
      return fn(leaderboard, group as UngroupedClearCountLeaderboard);
    }

    return useValues(
      useMapValues(leaderboard, (leaderboard, subgroup) => {
        return fn(
          leaderboard,
          group as SubGroupedClearCountLeaderboard,
          subgroup,
        );
      }),
    );
  });
};

export function useRankedLeaderboards(includeLegacy: MaybeRef<boolean> = true) {
  const { leaderboards, pending, error } = useAllLeaderboards();

  const getLeaderboardName = useLeaderboardNames();

  const rankedLeaderboards = computed(() => {
    const _includeLegacy = unref(includeLegacy);
    return mapLeaderboard(
      unref(leaderboards)!,
      (leaderboard, group, subgroup) => {
        const name = getLeaderboardName(group, subgroup);
        return {
          name,
          rankings: getRankedLeaderboard(leaderboard, _includeLegacy),
        };
      },
    );
  });

  return {
    rankedLeaderboards,
    pending,
    error,
  };
}

const isSubgroupedLeaderboard = (
  leaderboardName: ClearCountLeaderboard,
): leaderboardName is SubGroupedClearCountLeaderboard =>
  ['year', 'month', 'theme', 'style', 'country', 'timer'].includes(
    leaderboardName,
  );

export type RankedLeaderboard<SupportsLegacy extends boolean> =
  ((SupportsLegacy extends true
    ? LegacySupportedLeaderboardEntry
    : LeaderboardEntry) & { rank: number; score: number })[];

export function useLeaderboardNames() {
  const { formatDate, formatCountryName } = useFormatters();
  return <
    TLeaderboard extends ClearCountLeaderboard,
    TGrouping extends TLeaderboard extends SubGroupedClearCountLeaderboard
      ? ValidLeaderboardGroups[TLeaderboard]
      : never,
  >(
    leaderboardName: TLeaderboard,
    grouping?: TGrouping,
  ): string => {
    switch (leaderboardName) {
      case 'year':
        return `Uploaded in ${DateTime.fromISO(grouping as string).toLocaleString({ year: 'numeric' })}`;
      case 'month': {
        return `Uploaded in ${DateTime.fromISO(grouping as string).toLocaleString({ year: 'numeric', month: 'long' })}`;
      }
      case 'country': {
        return formatCountryName(grouping as string);
      }
      case 'timer': {
        return `Timer: ${grouping}`;
      }
      case 'style':
      case 'theme': {
        return grouping as string;
      }
      case 'total': {
        return 'Overall';
      }
      case 'hacked': {
        return 'Hacked Clears';
      }
      case 'autoscroll': {
        return 'Autoscroll';
      }
      case 'legacy': {
        return 'Legacy Clears';
      }
      default:
        throw new Error(`No name for ${leaderboardName}`);
    }
  };
}

export function getRankedLeaderboard<TLegacy extends boolean>(
  leaderboard: Leaderboard<TLegacy>,
  includeLegacy?: TLegacy extends true ? boolean : undefined,
): RankedLeaderboard<TLegacy> {
  const deductLegacy = unref(includeLegacy) === false;
  const getScore = (
    entry: LeaderboardEntry | LegacySupportedLeaderboardEntry,
  ) => {
    if ('legacy' in entry && deductLegacy) {
      return entry.total - entry.legacy;
    }
    return entry.total;
  };

  let lastRank = 1;
  let lastScore = leaderboard?.[0] && getScore(leaderboard![0]);
  return useOrderBy(
    leaderboard?.map((entry, i) => {
      const score = getScore(entry);
      const rank = lastScore === score ? lastRank : i + 1;
      if (rank !== lastRank) {
        // not pure. too bad!
        lastRank = rank;
        lastScore = score;
      }
      return {
        ...entry,
        rank,
        score,
      };
    }),
    'rank',
    'asc',
  ) as any;
}

export function useClearCountLeaderboard<
  TLeaderboard extends ClearCountLeaderboard,
  TGrouping extends TLeaderboard extends SubGroupedClearCountLeaderboard
    ? ValidLeaderboardGroups[TLeaderboard]
    : never,
>(
  leaderboardName: MaybeRef<TLeaderboard>,
  grouping: MaybeRef<TGrouping>,
  includeLegacy: MaybeRef<boolean> = true,
): {
  leaderboard: RankedLeaderboard<TLeaderboard extends 'legacy' ? false : true>;
  pending: Ref<boolean>;
} {
  const { leaderboards, pending } = useAllLeaderboards();

  const selectedLeaderboard = computed(() => {
    const _leaderboardName = unref(leaderboardName);
    if (isSubgroupedLeaderboard(_leaderboardName)) {
      return useGet(unref(leaderboards), [
        'clearCounts',
        _leaderboardName,
        unref(grouping),
      ]) as Leaderboard<true>;
    }
    return unref(leaderboards)?.clearCounts[
      _leaderboardName as UngroupedClearCountLeaderboard
    ];
  });

  const rankedLeaderboard = computed(() =>
    getRankedLeaderboard(unref(selectedLeaderboard)!, unref(includeLegacy)),
  );

  return {
    leaderboard: rankedLeaderboard as any,
    pending,
  };
}

export function usePlayerLeaderboardRanks(
  nnid: MaybeRef<string>,
  includeLegacy: MaybeRef<boolean> = true,
) {
  const { rankedLeaderboards, pending } = useRankedLeaderboards(includeLegacy);

  const extractPlayerRank = (leaderboard: RankedLeaderboard<any>) => {
    return useFind(leaderboard, { nnid: unref(nnid) });
  };

  const ranks = computed(() =>
    useOrderBy(
      useOrderBy(
        useCompact(
          unref(rankedLeaderboards).map(({ name, rankings }) => {
            const rank = extractPlayerRank(rankings);
            return rank
              ? {
                  ...rank,
                  name,
                }
              : undefined;
          }),
        ),
        'score',
        'desc',
      ),
      'rank',
      'asc',
    ),
  );

  return {
    ranks,
    pending,
  };
}
