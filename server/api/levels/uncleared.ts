import _ from 'lodash';
import Papa from 'papaparse';
import { DateTime } from 'luxon';

export default defineEventHandler(async (event) => {
  const db = useStorage('levels');

  const { data: uncleared } = Papa.parse(
    await db.getItem('all_uncleared.csv'),
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
      uploadDate: DateTime.fromFormat(level.uploadDate, 'DDD').toISODate(),
    })),
    'uploadDate',
  );
});
