/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const _ = require('lodash');
const { DateTime } = require('luxon');
const { initS3Client, uploadToS3 } = require('./s3.js');
const { buildClearedLevels } = require('./buildClearedLevels.js');

const LEGACY_DATE = '2023-01-28T00:00:00Z';
function isLegacy({ dateCleared }) {
  return dateCleared <= LEGACY_DATE;
}

function generateClearSummary(clearedLevels, firstClearerSummaries = true) {
  const groupedByDate = _.groupBy(clearedLevels, ({ dateCleared }) =>
    DateTime.fromISO(dateCleared).startOf('day').toISODate(),
  );
  const clearsByDate = _.mapValues(groupedByDate, 'length');

  const getWinner = (levels) => {
    const clearsByCreator = _.countBy(levels, 'firstClearerNnid');
    const ranked = _.orderBy(_.toPairs(clearsByCreator), '1', 'desc');
    const winners = _.takeWhile(
      ranked,
      ([_, levels]) => levels === ranked[0][1],
    );
    return {
      creators: _.map(winners, '0'),
      levels: winners[0][1],
    };
  };

  const dailyWinners = _.mapValues(groupedByDate, getWinner);

  const weeklyWinners = _.mapValues(
    _.groupBy(clearedLevels, ({ dateCleared }) =>
      DateTime.fromISO(dateCleared).startOf('week').toISOWeekDate(),
    ),
    getWinner,
  );

  const clearsByPerson = _.mapValues(
    _.groupBy(clearedLevels, 'firstClearerNnid'),
    'length',
  );

  return {
    clearsByDate,
    clearedTotal: clearedLevels.length,
    mostRecentClear: _.last(
      clearedLevels.filter(({ dateCleared }) => dateCleared),
    ),
    lastClears: _.takeRight(
      clearedLevels.filter(({ dateCleared }) => dateCleared),
      10,
    ),
    ...(firstClearerSummaries
      ? {
          clearsByPerson,
          winners: {
            daily: dailyWinners,
            weekly: weeklyWinners,
          },
        }
      : {}),
  };
}

async function uploadGroups(prefix, clearedLevelGroups) {
  console.log('Uploading groups for', prefix);
  const summaries = _.mapValues(clearedLevelGroups, generateClearSummary);

  await uploadToS3([prefix, 'list.json'].join('/'), summaries);

  for (const [name, levels] of Object.entries(clearedLevelGroups)) {
    await uploadToS3([prefix, `${name}.json`].join('/'), {
      levels,
      summary: summaries[name],
    });
  }
}

function generateAllPivots(clearedLevels) {
  const byYear = _.groupBy(
    clearedLevels.filter(({ uploadDate }) => uploadDate),
    ({ uploadDate }) => DateTime.fromISO(uploadDate).year,
  );
  const byMonth = _.groupBy(
    clearedLevels.filter(({ uploadDate }) => uploadDate),
    ({ uploadDate }) => uploadDate.slice(0, 7),
  );
  const byTheme = _.omit(_.groupBy(clearedLevels, 'theme'), [
    'undefined',
    'null',
  ]);
  const byStyle = _.omit(_.groupBy(clearedLevels, 'style'), [
    'undefined',
    'null',
  ]);
  const byCountry = _.omit(_.groupBy(clearedLevels, 'countryCode'), [
    'undefined',
    'null',
  ]);
  const byTimer = _.omit(_.groupBy(clearedLevels, 'timer'), [
    'undefined',
    'null',
  ]);
  const byCheckpointCount = _.omit(_.groupBy(clearedLevels, 'checkpoints'), [
    'undefined',
    'null',
  ]);
  const autoscroll = _.filter(clearedLevels, 'autoscroll');
  const trueClear = _.filter(clearedLevels, 'hacked');
  const [legacyClears, botClears] = _.partition(clearedLevels, isLegacy);

  return {
    byYear,
    byMonth,
    byTheme,
    byStyle,
    byCountry,
    byTimer,
    byCheckpointCount,
    autoscroll,
    trueClear,
    legacyClears,
    botClears,
  };
}

async function buildGroupings(clearedLevels) {
  console.log('Building groupings');
  const {
    byYear,
    byMonth,
    byTheme,
    byStyle,
    byCountry,
    byTimer,
    autoscroll,
    trueClear,
    legacyClears,
    botClears,
  } = generateAllPivots(clearedLevels);

  await Promise.all(
    [
      ['levels/year', byYear],
      ['levels/month', byMonth],
      ['levels/style', byStyle],
      ['levels/country', byCountry],
      ['levels/theme', byTheme],
      ['levels/timer', byTimer],
    ].map(([prefix, levels]) => uploadGroups(prefix, levels)),
  );
  await Promise.all([
    uploadToS3('levels/autoscroll.json', autoscroll),
    uploadToS3('levels/hacked.json', trueClear),
    uploadToS3('levels/legacy.json', legacyClears),
    uploadToS3('levels/botClears.json', botClears),
  ]);
}


async function uploadPlayerStats(clearedLevels) {
  console.log('Uploading player stats');
  const byPlayer = _.groupBy(clearedLevels, 'firstClearerNnid');

  const playerList = _.mapValues(byPlayer, (levels, name) => ({
    clearedTotal: levels.length,
    countryCode: levels[0]?.countryCode,
    legacyClears: levels?.filter(isLegacy).length,
  }));

  await uploadToS3('players/list.json', playerList);

  for (const [name, levels] of Object.entries(byPlayer)) {
    await uploadToS3(['players', `${name}.json`].join('/'), {
      levels,
      countryCode: playerList[name].countryCode,
      stats: {
        ..._.omit(playerList[name], 'countryCode'),
        ..._.pick(generateClearSummary(byPlayer[name], false), [
          'clearsByDate',
        ]),
      },
    });
  }
}

async function uploadCreatorStats(clearedLevels, playerCountries) {
  console.log('Uploading creator stats');
  const byCreator = _.groupBy(clearedLevels, 'creator');

  const creatorList = _.mapValues(byCreator, (levels) =>
    generateClearSummary(levels),
  );

  await uploadToS3(
    'creators/list.json',
    _.mapValues(creatorList, (summary, name) => ({
      countryCode: playerCountries[name],
      ..._.omit(summary, [
        'clearsByDate',
        'lastClears',
        'clearsByPerson',
        'winners',
      ]),
    })),
  );

  for (const [name, levels] of Object.entries(byCreator)) {
    await uploadToS3(['creators', `${name}.json`].join('/'), {
      levels,
      countryCode: playerCountries[name],
      stats: creatorList[name],
    });
  }
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  console.log('Init S3');
  await initS3Client(event);

  const clearedLevels = await buildClearedLevels();

  console.log('Creating master clear summary data');

  // TODO: how to model legacy clears?
  const [legacyClears, botClears] = _.partition(clearedLevels, isLegacy);
  const clearStats = {
    ...generateClearSummary(botClears),
    legacyClearsByPerson: _.mapValues(
      _.groupBy(legacyClears, 'firstClearerNnid'),
      'length',
    ),
  };

  await Promise.all([
    uploadToS3('levels/cleared.json', clearedLevels),
    uploadToS3('levels/clear_summary.json', clearStats),
  ]);

  await buildGroupings(clearedLevels);
  await uploadPlayerStats(clearedLevels);
  // await uploadCreatorStats(clearedFinal, playerCountries);

  const results = {
    totalCleared: clearedLevels.length,
  };

  console.log('Results:', results);

  return {
    statusCode: 200,
    body: results,
  };
};
