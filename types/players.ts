import type { ClearedLevel, ClearedLevelStatSummary } from './levels';

interface BasePlayerAward {
  name:
    | 'Sniper'
    | 'Human TAS'
    | 'VIP'
    | 'Big Brain'
    | 'Leprechaun'
    | 'Choreographer'
    | 'Developer'
    | 'Edgelord'
    | '1000 Clears'
    | '2500 Clears';
  awardDate?: string;
  reason?: string | { type: 'level'; levelId: string };
}

interface SniperAward extends BasePlayerAward {
  name: 'Sniper' | 'Big Brain';
  awardDate: string;
  reason: string;
}

interface LevelClearAward extends BasePlayerAward {
  name: 'Human TAS' | 'Choreographer';
  awardDate: string;
  reason: { type: 'level'; levelId: string };
}

interface MiscAward extends BasePlayerAward {
  name: 'Developer' | 'VIP';
  awardDate?: never;
  reason: string;
}

export interface MajorMilestone {
  year: string;
  style?: ClearedLevel['style'];
  dateCleared: string;
  levelId: string;
  firstClearerNnid: string;
  wasRecleared?: boolean;
  reason?: string;
}

export interface MinorMilestone {
  year: string;
  month: string;
  dateCleared: string;
  levelId: string;
  firstClearerNnid: string;
  wasRecleared?: boolean;
}

export type Milestone = MajorMilestone | MinorMilestone;

export type PlayerAward =
  | SniperAward
  | LevelClearAward
  | MiscAward
  | BasePlayerAward;

export interface BasePlayer {
  levels: ClearedLevel[];
  countryCode: string;
  stats: Pick<
    ClearedLevelStatSummary,
    'clearsByDate' | 'clearedTotal' | 'mostRecentClear' | 'lastClears'
  >;
}

export interface Player extends BasePlayer {
  discordName?: string;
  awards?: PlayerAward[];
  milestones: Milestone[];
}
