import _ from 'lodash';
import Papa from 'papaparse';
import { DateTime } from 'luxon';
import type { LevelData } from './uncleared';

interface ClearInfo {
  firstClearerNnid: string;
  dateCleared: string;
}

export interface ClearedLevel extends LevelData, ClearInfo {}

type ClearedLevelDb = { [K in keyof ClearedLevel]: string };

export default defineEventHandler(async (event) => {
  const db = useStorage('levels');

  const { data: oldClears } = Papa.parse<ClearedLevelDb>(
    (await db.getItem<string>('legacy_cleared_levels.csv'))!,
    {
      header: true,
      transformHeader: _.camelCase,
    },
  );
  const { data: currentClears } = Papa.parse<ClearedLevelDb>(
    (await db.getItem<string>('current_cleared_levels.csv'))!,
    {
      header: true,
      transformHeader: _.camelCase,
    },
  );
  const clearedLevels = oldClears.concat(currentClears);

  return _.sortBy(
    clearedLevels.map((level) => ({
      ...level,
      stars: parseInt(level.stars, 10),
      players: parseInt(level.players, 10),
      clears: parseInt(level.clears, 10),
      attempts: parseInt(level.attempts, 10),
      uploadDate: DateTime.fromFormat(
        level.uploadDate,
        'DDD',
      ).toISODate() as string,
      dateCleared: DateTime.fromFormat(
        level.dateCleared,
        'DDD',
      ).toISODate() as string,
    })),
    'dateCleared',
  );
});
