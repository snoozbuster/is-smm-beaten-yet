export interface LevelData {
  title: string;
  titleTranslation?: string;
  description?: string;
  uploadDate: string;
  stars: number;
  players: number;
  clears: number;
  attempts: number;
  creator: string;
  levelId: string;
  countryCode: string;
  style: 'SMW' | 'NSMBU' | 'SMB1' | 'SMB3';
  theme: 'Castle' | 'Ground' | 'Underground' | 'Ghost House' | 'Airship';
  autoscroll: boolean;
  hacked?: boolean;
}

export interface HackedClear
  extends Omit<LevelData, 'clears' | 'players' | 'stars'> {
  hacked: true;
}

export type UnclearedLevel = HackedClear | LevelData;

export interface ClearedLevelStatSummary {
  clearsByDate: Record<string, number>;
  clearsByPerson: Record<string, number>;
  clearedTotal: number;
}
