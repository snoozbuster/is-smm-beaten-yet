import _ from 'lodash';
import Papa from 'papaparse';
import { DateTime } from 'luxon';

export interface LevelData {
  title: string;
  uploadDate: string;
  stars: number;
  players: number;
  clears: number;
  attempts: number;
  creator: string;
  levelId: string;
}

type LevelDataDb = { [K in keyof LevelData]: string };

export default defineEventHandler(async (event) => {
  const db = useStorage('levels');

  const { data: uncleared } = Papa.parse<LevelDataDb>(
    (await db.getItem<string>('all_uncleared.csv'))!,
    {
      header: true,
      transformHeader: _.camelCase,
    },
  );

  return _.sortBy(
    uncleared.map((level) => ({
      ...level,
      stars: parseInt(level.stars, 10),
      players: parseInt(level.players, 10),
      clears: 0,
      attempts: parseInt(level.attempts, 10),
      uploadDate: DateTime.fromFormat(
        level.uploadDate,
        'DDD',
      ).toISODate() as string,
    })),
    'uploadDate',
  );
});
