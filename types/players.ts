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
    | '2500 Clears'
    | 'Herb Trimmer';
  awardDate?: string;
  reason?: string | { type: 'level'; levelId: string };
}

interface SniperAward extends BasePlayerAward {
  name: 'Sniper' | 'Big Brain';
  awardDate: string;
  reason: string;
}

interface LevelClearAward extends BasePlayerAward {
  name: 'Human TAS' | 'Choreographer' | 'Herb Trimmer';
  awardDate: string;
  reason: { type: 'level'; levelId: string };
}

interface MiscAward extends BasePlayerAward {
  name: 'Developer' | 'VIP';
  awardDate?: never;
  reason: string;
}

interface MilestoneBase {
  dateCleared: string;
  levelId: string;
  firstClearerNnid: string;
  wasRecleared?: boolean;
}

interface MajorMilestoneBase extends MilestoneBase {
  reason?: string;
}

export interface MajorMilestoneStyle extends MajorMilestoneBase {
  year: string;
  style?: ClearedLevel['style'];
}

export interface MajorMilestoneAutoscroll extends MajorMilestoneBase {
  name: 'Autoscroll';
}

export type MajorMilestone = MajorMilestoneStyle | MajorMilestoneAutoscroll;

export interface MinorMilestone extends MilestoneBase {
  year: string;
  month: string;
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
  stats: Pick<ClearedLevelStatSummary, 'clearsByDate'> & {
    legacyClears: number;
    clearedTotal: number;
  };
}

export interface DecoratedPlayer {
  discordName?: string;
  awards?: PlayerAward[];
  milestones: Milestone[];
}

export type Player = BasePlayer & DecoratedPlayer;
