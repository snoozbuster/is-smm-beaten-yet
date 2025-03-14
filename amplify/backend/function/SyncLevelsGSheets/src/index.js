/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const _ = require('lodash');
const { DateTime } = require('luxon');
const { initS3Client, uploadToS3 } = require('./s3.js');
const { buildClearedLevels } = require('./buildClearedLevels.js');

const LEADERBOARD_NUM_CLEAR_THRESHOLD = 5;
const LEADERBOARD_NUM_PLACES_MINIMUM = 3;

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

async function uploadGroups(prefix, clearedLevelGroups, leaderboards) {
  console.log('Uploading groups for', prefix);
  const summaries = _.mapValues(clearedLevelGroups, (levels, key) => {
    return {
      clearedTotal: levels.length,
      leaderboardPreview: _.takeWhile(
        leaderboards[key],
        (entry, i) =>
          i < LEADERBOARD_NUM_PLACES_MINIMUM ||
          entry.total ===
            leaderboards[key][LEADERBOARD_NUM_PLACES_MINIMUM - 1].total,
      ),
    };
  });

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

async function buildGroupings(clearedLevels, clearLeaderboards) {
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
      ['levels/year', byYear, clearLeaderboards.year],
      ['levels/month', byMonth, clearLeaderboards.month],
      ['levels/style', byStyle, clearLeaderboards.style],
      ['levels/country', byCountry, clearLeaderboards.country],
      ['levels/theme', byTheme, clearLeaderboards.theme],
      ['levels/timer', byTimer, clearLeaderboards.timer],
    ].map(([prefix, levels, leaderboard]) =>
      uploadGroups(prefix, levels, leaderboard),
    ),
  );
  await Promise.all([
    uploadToS3('levels/autoscroll.json', autoscroll),
    uploadToS3('levels/hacked.json', trueClear),
    uploadToS3('levels/legacy.json', legacyClears),
    uploadToS3('levels/botClears.json', botClears),
  ]);
}

async function buildLeaderboards(clearedLevels) {
  console.log('Building leaderboards');
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
  } = generateAllPivots(clearedLevels);

  const trimLeaderboard = (leaderboard) =>
    _.takeWhile(
      leaderboard,
      ({ total }, i, list) =>
        // always take top N
        i < LEADERBOARD_NUM_PLACES_MINIMUM ||
        // until no longer above threshold
        total >= LEADERBOARD_NUM_CLEAR_THRESHOLD ||
        // unless tied with Nth place
        total === list[LEADERBOARD_NUM_PLACES_MINIMUM - 1]?.total,
    );

  const buildClearCountLeaderboard = (levels) => {
    return trimLeaderboard(
      _.orderBy(
        _.map(
          _.groupBy(levels, 'firstClearerNnid'),
          (playerClears, firstClearerNnid) => {
            const legacyClears = _.filter(playerClears, isLegacy).length;
            return {
              nnid: firstClearerNnid,
              total: playerClears.length,
              legacy: legacyClears,
            };
          },
        ),
        'total',
        'desc',
      ),
    );
  };

  const groupedLeaderboards = {
    year: byYear,
    month: byMonth,
    theme: byTheme,
    style: byStyle,
    country: byCountry,
    timer: byTimer,
  };
  const flatLeaderboards = {
    total: clearedLevels,
    autoscroll,
    hacked: trueClear,
    legacy: legacyClears,
  };

  const leaderboards = {
    ..._.mapValues(groupedLeaderboards, (group) =>
      _.mapValues(group, buildClearCountLeaderboard),
    ),
    ..._.mapValues(flatLeaderboards, buildClearCountLeaderboard),
  };
  leaderboards.legacy = leaderboards.legacy.map(({ legacy, ...rest }) => rest);

  const { winners } = generateClearSummary(clearedLevels);
  const invertWinners = (winnersByDate) => {
    const byPlayer = {};
    _.forEach(winnersByDate, ({ creators, levels }, date) => {
      _.forEach(creators, (creator) => {
        if (!(creator in byPlayer)) {
          byPlayer[creator] = {};
        }
        byPlayer[creator][date] = levels;
      });
    });
    return byPlayer;
  };
  const buildWinnerTimesLeaderboard = (winnersByDate) =>
    _.orderBy(
      _.map(invertWinners(winnersByDate), (dates, nnid) => ({
        nnid,
        total: _.keys(dates).length,
      })),
      'total',
      'desc',
    );
  const buildWinnerStreakLeaderboard = (winnersByDate) => {
    const streakByPlayer = {};
    let lastDate;
    _.forEach(winnersByDate, ({ creators }) => {
      _.forEach(creators, (creator) => {
        if (!(creator in streakByPlayer)) {
          streakByPlayer[creator] = { current: 0, best: 0 };
        }
        streakByPlayer[creator].current++;
      });

      if (!lastDate) {
        lastDate = creators;
        return;
      }

      const endStreak = _.difference(lastDate, creators);
      _.forEach(endStreak, (creator) => {
        streakByPlayer[creator].best = Math.max(
          streakByPlayer[creator].current,
          streakByPlayer[creator].best,
        );
        streakByPlayer[creator].current = 0;
      });

      lastDate = creators;
    });

    return _.orderBy(
      _.map(streakByPlayer, ({ best, current }, nnid) => ({
        nnid,
        total: Math.max(best, current),
      })),
      'total',
      'desc',
    );
  };
  const buildBiggestWinnersLeaderboard = (winnersByDate) => {
    return _.uniqBy(
      _.orderBy(
        _.map(invertWinners(winnersByDate), (dates, nnid) => ({
          nnid,
          total: _.max(_.values(dates)),
        })),
        'total',
        'desc',
      ),
      'nnid',
    );
  };

  const buildWinnerLeaderboards = (winnersByDate) =>
    _.mapValues(
      {
        times: buildWinnerTimesLeaderboard,
        streak: buildWinnerStreakLeaderboard,
        biggest: buildBiggestWinnersLeaderboard,
      },
      (fn) => trimLeaderboard(fn(winnersByDate)),
    );

  const winnerLeaderboards = _.mapValues(winners, buildWinnerLeaderboards);

  const finalLeaderboards = {
    clearCounts: leaderboards,
    winners: winnerLeaderboards,
  };

  await uploadToS3('leaderboards/list.json', finalLeaderboards);

  return finalLeaderboards;
}

async function uploadPlayerStats(clearedLevels) {
  console.log('Uploading player stats');
  const byPlayer = _.groupBy(clearedLevels, 'firstClearerNnid');

  const playerList = _.mapValues(byPlayer, (levels, name) => ({
    clearedTotal: levels.length,
    countryCode: levels[0]?.firstClearerCountryCode,
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

  const { clearCounts: clearCountLeaderboards } =
    await buildLeaderboards(clearedLevels);
  await buildGroupings(clearedLevels, clearCountLeaderboards);
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
