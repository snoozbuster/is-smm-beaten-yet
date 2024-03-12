export interface LevelData {
  title: string;
  titleTranslation?: string;
  description?: string;
  uploadDate: string;
  uploadDateEstimated?: boolean;
  timer: number;
  stars: number;
  players: number;
  clears: number;
  attempts: number;
  checkpoints?: number;
  creator: string;
  levelId: string;
  countryCode: string;
  style: 'SMW' | 'NSMBU' | 'SMB1' | 'SMB3';
  theme: 'Castle' | 'Ground' | 'Underground' | 'Ghost House' | 'Airship';
  autoscroll: boolean;
  hacked?: boolean;
  worldLength: number;
  subworld?: {
    theme: 'Castle' | 'Ground' | 'Underground' | 'Ghost House' | 'Airship';
    autoscroll: boolean;
    worldLength: number;
  } | null;
}

// this is not a good name, but it is a punny name
type PartialPartial<TT, TP extends keyof TT> = Omit<TT, TP> &
  Partial<Pick<TT, TP>>;

export interface HackedClear
  extends PartialPartial<LevelData, 'clears' | 'players' | 'stars'> {
  hacked: true;
}

export type UnclearedLevel = HackedClear | LevelData;

export interface ClearedLevel
  extends PartialPartial<
    LevelData,
    'worldLength' | 'autoscroll' | 'style' | 'theme' | 'countryCode' | 'timer'
  > {
  firstClearerNnid: string;
  dateCleared: string;
  clearDateEstimated?: boolean;
}

export interface DailyWinner {
  creators: string[];
  levels: number;
}

export interface ClearedLevelStatSummary {
  clearsByDate: Record<string, number>;
  clearsByPerson: Record<string, number>;
  winners: {
    weekly: Record<string, DailyWinner>;
    daily: Record<string, DailyWinner>;
  };
  clearedTotal: number;
  mostRecentClear: ClearedLevel;
  lastClears: ClearedLevel[];
}
