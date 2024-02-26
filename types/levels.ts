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

export interface HackedClear
  extends Omit<LevelData, 'clears' | 'players' | 'stars'>,
    Partial<Pick<LevelData, 'clears' | 'players' | 'stars'>> {
  hacked: true;
}

export type UnclearedLevel = HackedClear | LevelData;

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
}
