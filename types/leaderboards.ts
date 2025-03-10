import type { ClearedLevel } from './levels';

export interface LeaderboardEntry {
  nnid: string;
  total: number;
}

export interface LegacySupportedLeaderboardEntry extends LeaderboardEntry {
  legacy: number;
}

export type Leaderboard<LegacySupported extends boolean = true> =
  LegacySupported extends true
    ? LegacySupportedLeaderboardEntry[]
    : LeaderboardEntry[];

export type SubGroupedClearCountLeaderboard =
  | 'year'
  | 'month'
  | 'theme'
  | 'style'
  | 'country'
  | 'timer';
export type UngroupedClearCountLeaderboard =
  | 'total'
  | 'autoscroll'
  | 'hacked'
  | 'legacy';
export type ClearCountLeaderboard =
  | SubGroupedClearCountLeaderboard
  | UngroupedClearCountLeaderboard;

type ValidLeaderboardGroups = {
  year: '2016' | '2017' | '2018' | '2019' | '2020' | '2021';
  month: string; // YYYY-MM
  theme: NonNullable<ClearedLevel['theme']>;
  style: NonNullable<ClearedLevel['style']>;
  country: string; // two-letter CC
  timer: number; // 10-500 step 10
};

type GroupedLeaderboards = {
  [K in keyof ValidLeaderboardGroups]: Record<
    ValidLeaderboardGroups[K],
    Leaderboard<true>
  >;
};

export interface ClearCountLeaderboards extends GroupedLeaderboards {
  total: Leaderboard<true>;
  autoscroll: Leaderboard<true>;
  hacked: Leaderboard<true>;
  legacy: Leaderboard<false>;
}

export interface MvpLeaderboards {
  /**
   * Number of times the player was MVP ("most clears") in a day/week
   */
  times: Leaderboard<false>;
  /**
   * Longest day/week streak the player held MVP ("most clears") for
   */
  streak: Leaderboard<false>;
  /**
   * Most clears in a single day/week across all MVP players
   */
  biggest: Leaderboard<false>;
}

export interface AllLeaderboards {
  clearCounts: ClearCountLeaderboard;
  winners: {
    daily: MvpLeaderboards;
    weekly: MvpLeaderboards;
  };
}
