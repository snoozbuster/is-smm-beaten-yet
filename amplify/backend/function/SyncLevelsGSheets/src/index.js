/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require('@aws-sdk/client-s3');
const Papa = require('papaparse');
const _ = require('lodash');
const axios = require('axios');
const { DateTime } = require('luxon');

const BUCKET_ID = 'is-smm-beaten-yet-public-data';
const CLEARS_SPREADSHEET_ID = '1PMNsDoZqYd4261FRmEZSo3SkcnqcvfbKDTQMAJaw6ws';
const UNCLEARED_SHEET_ID = '11dV6SHOIBzHjIqacQyG8Hsnynydg3h7MBLsFoDwA5KA';

const UNCLEARED_LEVEL_COUNT_API =
  'https://mite-natural-silkworm.ngrok-free.app/mm1/uncleared_count';

function getSheetDownloadUrl(sheetId, sheetName) {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
    sheetName,
  )}`;
}

const COMMON_TITLE_TO_KEY = {
  'Upload Date': 'uploadDate',
  Stars: 'stars',
  Players: 'players',
  Attempts: 'attempts',
  Creator: 'creator',
  'Level ID': 'levelId',
};

const UNCLEARED_TITLE_TO_KEY = {
  ...COMMON_TITLE_TO_KEY,
  Title: 'title',
  Code: 'countryCode',
  Style: 'style',
  Theme: 'theme',
  AutoScroll: 'autoscroll',
  Hacked: 'hacked',
  Timer: 'timer',
};

const CLEARED_TITLE_TO_KEY = {
  ...COMMON_TITLE_TO_KEY,
  Clears: 'clears',
  'Level Name': 'title',
  'First Clearer NNID': 'firstClearerNnid',
  'Date Cleared': 'dateCleared',
};

// known hackers. no soup for you
const BANNED_NNIDS = new Set([
  'Zappy7',
  'BechPlayz69',
  'noncaringstarman',
  'JustNull.38',
  'SRA.DOOM',
  'olamo67',
  'vergo811',
  'mrksikou0118',
  'Unbanned1',
  'ryanrocks462',
  'pooody',
  'Zormam',
  '0thekid0',
  'cardigacimeira',
  'aeswokm3092',
  'teamzero16',
]);

async function getS3File(s3, filename) {
  const response = await s3.send(
    new GetObjectCommand({
      Bucket: BUCKET_ID,
      Key: filename,
    }),
  );
  const chunks = [];
  for await (const chunk of response.Body) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString();
}

async function uploadToS3(s3, filename, data) {
  console.log(`Uploading "${filename}" to S3`);
  await s3.send(
    new PutObjectCommand({
      Body: JSON.stringify(data),
      Bucket: BUCKET_ID,
      Key: filename,
      ContentType: 'application/json',
    }),
  );
}

async function parseCsv(csv, transformer) {
  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      header: true,
      transformHeader: (title) => transformer[title] ?? title,
      complete: ({ data }) => resolve(data),
      error: (e) => reject(e),
    });
  });
}

async function downloadCsv(downloadUrl, transformer) {
  const { data } = await axios.get(downloadUrl);

  return parseCsv(data, transformer);
}

function cleanList(levels, allowedProps) {
  return levels.map((level) => _.pick(level, allowedProps));
}

function parseDate(date) {
  return DateTime.fromFormat(date, 'DDD').toISODate();
}

function parseLevelCommon(level) {
  const hasValue = (v) => !_.isNil(v) && v !== '';

  return {
    stars: hasValue(level.stars)
      ? parseInt(level.stars.replace(/[^\d]/g, ''), 10)
      : level.stars,
    players: hasValue(level.players)
      ? parseInt(level.players.replace(/[^\d]/g, ''), 10)
      : level.players,
    clears: hasValue(level.clears)
      ? parseInt(level.clears.replace(/[^\d]/g, ''), 10)
      : level.clears,
    attempts: hasValue(level.attempts)
      ? parseInt(level.attempts.replace(/[^\d]/g, ''), 10)
      : level.attempts,
    uploadDate: parseDate(level.uploadDate),
  };
}

function generateClearSummary(clearedLevels, firstClearerSummaries = true) {
  const clearsByDate = _.mapValues(
    _.groupBy(clearedLevels, 'dateCleared'),
    'length',
  );

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

  const dailyWinners = _.mapValues(
    _.groupBy(clearedLevels, 'dateCleared'),
    getWinner,
  );

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
          clearsByPerson: clearsByPerson,
          winners: {
            daily: dailyWinners,
            weekly: weeklyWinners,
          },
        }
      : {}),
  };
}

async function uploadGroups(s3, prefix, clearedLevelGroups) {
  console.log('Uploading groups for', prefix);
  const summaries = _.mapValues(clearedLevelGroups, generateClearSummary);

  await uploadToS3(s3, [prefix, 'list.json'].join('/'), summaries);

  for (const [name, levels] of Object.entries(clearedLevelGroups)) {
    await uploadToS3(s3, [prefix, `${name}.json`].join('/'), {
      levels,
      summary: summaries[name],
    });
  }
}

async function buildGroupings(s3, clearedLevels) {
  console.log('Building groupings');
  const byYear = _.groupBy(
    clearedLevels,
    ({ uploadDate }) => DateTime.fromISO(uploadDate).year,
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

  await Promise.all(
    [
      ['levels/year', byYear],
      ['levels/style', byStyle],
      ['levels/country', byCountry],
      ['levels/theme', byTheme],
    ].map(([prefix, levels]) => uploadGroups(s3, prefix, levels)),
  );
}

async function uploadPlayerStats(
  s3,
  clearedLevels,
  legacyClears,
  playerCountries,
) {
  console.log('Uploading player stats');
  const byPlayer = _.groupBy(clearedLevels, 'firstClearerNnid');

  const playerList = _.mapValues(byPlayer, (levels, name) => ({
    ...generateClearSummary(levels, false),
    legacyClears: legacyClears[name] ?? 0,
  }));

  await uploadToS3(
    s3,
    'players/list.json',
    _.mapValues(playerList, (summary, name) => ({
      countryCode: playerCountries[name],
      ..._.omit(summary, ['clearsByDate', 'lastClears']),
    })),
  );

  for (const [name, levels] of Object.entries(byPlayer)) {
    await uploadToS3(s3, ['players', `${name}.json`].join('/'), {
      levels,
      countryCode: playerCountries[name],
      stats: playerList[name],
    });
  }
}

async function uploadCreatorStats(s3, clearedLevels, playerCountries) {
  console.log('Uploading creator stats');
  const byCreator = _.groupBy(clearedLevels, 'creator');

  const creatorList = _.mapValues(byCreator, (levels) =>
    generateClearSummary(levels),
  );

  await uploadToS3(
    s3,
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
    await uploadToS3(s3, ['creators', `${name}.json`].join('/'), {
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
  const s3 = new S3Client();

  console.log('Queue static GETs');

  const archivedClearsPromise = getS3File(s3, 'static/clears_archive.csv');
  const levelMetaPromise = getS3File(s3, 'static/static_level_data.json');
  const translationsPromise = getS3File(s3, 'static/jp_en_translations.json');
  const uploadOverridesPromise = getS3File(
    s3,
    'static/upload_date_overrides.json',
  );
  const hackedClearPromise = getS3File(s3, 'static/hacked_clears.json');
  const legacyClearsPromise = getS3File(s3, 'static/legacy_clears.json');
  const playerCountriesPromise = getS3File(
    s3,
    'static/user_country_codes.json',
  );

  console.log('Downloading gsheets');
  const [unclearedLevels, clearedLevels] = await Promise.all([
    downloadCsv(
      getSheetDownloadUrl(UNCLEARED_SHEET_ID, 'By Date'),
      UNCLEARED_TITLE_TO_KEY,
    ),
    downloadCsv(
      getSheetDownloadUrl(CLEARS_SPREADSHEET_ID, 'Cleared Levels'),
      CLEARED_TITLE_TO_KEY,
    ),
  ]);

  const unclearedClean = cleanList(
    unclearedLevels,
    Object.values(UNCLEARED_TITLE_TO_KEY),
  );
  const clearedClean = cleanList(
    clearedLevels.concat(
      await parseCsv(await archivedClearsPromise, CLEARED_TITLE_TO_KEY),
    ),
    Object.values(CLEARED_TITLE_TO_KEY),
  );

  console.log('Compiling uncleared levels');
  const translations = JSON.parse(await translationsPromise);
  const levelMeta = JSON.parse(await levelMetaPromise);
  const playerCountries = JSON.parse(await playerCountriesPromise);

  const getLevelTranslation = (level) =>
    level.countryCode === 'JP' && level.levelId in translations
      ? { titleTranslation: translations[level.levelId] }
      : {};

  const getLevelMeta = (level) => ({
    ..._.omit(levelMeta[level.levelId], 'id'),
    countryCode: playerCountries[level.creator],
  });

  const unclearedFinal = _.sortBy(
    unclearedClean.map((level) => ({
      ...getLevelMeta(level),
      ...level,
      ...parseLevelCommon(level),
      ...getLevelTranslation(level),
      hacked: Boolean(level.hacked),
      autoscroll: Boolean(level.autoscroll),
      timer: parseInt(level.timer, 10),
    })),
    'uploadDate',
  );

  console.log('Compiling cleared levels');
  const uploadDateOverrides = JSON.parse(await uploadOverridesPromise);
  const hackedClears = new Set(JSON.parse(await hackedClearPromise));

  const getClearDate = (level) => {
    if (level.levelId in uploadDateOverrides) {
      return {
        dateCleared: uploadDateOverrides[level.levelId],
        clearDateEstimated: true,
      };
    }
    return {
      dateCleared: parseDate(level.dateCleared),
    };
  };

  const joinedClears = clearedClean
    .map((level) => ({
      ...level,
      ...parseLevelCommon(level),
      ...getLevelMeta(level),
      ...getClearDate(level),
      ...getLevelTranslation(level),
      firstClearerCountryCode: playerCountries[level.firstClearerNnid],
    }))
    .map((level) => ({
      ...level,
      hacked: hackedClears.has(level.levelId),
    }));

  const sortedClears = _.sortBy(
    joinedClears.filter(
      ({ firstClearerNnid }) => !BANNED_NNIDS.has(firstClearerNnid),
    ),
    'dateCleared',
  );

  const clearedFinal = _.uniqBy(sortedClears, 'levelId');

  const filteredClearCount = joinedClears.length - sortedClears.length;
  const dedupedCount = sortedClears.length - clearedFinal.length;
  console.log('Removed', filteredClearCount, 'cleared from banned NNIDs');
  console.log('Removed', dedupedCount, 'duplicate clears');

  console.log(
    'UNCLEARED:',
    unclearedFinal.length,
    unclearedFinal[0],
    unclearedFinal[Math.round((unclearedFinal.length - 1) / 2)],
    unclearedFinal[unclearedFinal.length - 1],
  );
  console.log(
    'CLEARED:',
    clearedFinal.length,
    clearedFinal[0],
    clearedFinal[Math.round((clearedFinal.length - 1) / 2)],
    clearedFinal[clearedFinal.length - 1],
  );

  if (unclearedFinal.length === 0) {
    const trueUnclearedCountRes = await axios.get(UNCLEARED_LEVEL_COUNT_API);
    const trueUnclearedCount = trueUnclearedCountRes.data[0].UnclearedCourses;
    if (trueUnclearedCount !== 0) {
      throw new Error(
        `TheCryptan's API response does not match the spreadsheet. Delaying 0% celebrations! Expected to find ${unclearedFinal.length} uncleared levels in the DB but got ${trueUnclearedCount}.`,
      );
    }
  }

  if (!event.localrun) {
    await Promise.all([
      uploadToS3(s3, 'levels/uncleared.json', unclearedFinal),
      uploadToS3(s3, 'levels/cleared.json', clearedFinal),
    ]);
  } else {
    console.log('Skipping S3 upload due to local run');
  }

  console.log('Creating master clear summary data');

  const legacyClears = JSON.parse(await legacyClearsPromise);
  const clearStats = {
    ...generateClearSummary(clearedFinal),
    legacyClearsByPerson: legacyClears,
  };

  if (!event.localrun) {
    await uploadToS3(s3, 'levels/clear_summary.json', clearStats);
  } else {
    console.log('Skipping S3 upload due to local run');
  }

  // await buildGroupings(s3, clearedFinal);
  // await uploadPlayerStats(s3, clearedFinal, legacyClears, playerCountries);
  // await uploadCreatorStats(s3, clearedFinal, playerCountries);

  const results = {
    processedUncleareds: unclearedClean.length,
    processedCleareds: clearedClean.length,

    totalUncleared: unclearedFinal.length,
    totalCleared: clearedFinal.length,

    filteredClears: filteredClearCount,
    dedupedCount,
  };

  console.log('Results:', results);

  return {
    statusCode: 200,
    body: results,
  };
};
