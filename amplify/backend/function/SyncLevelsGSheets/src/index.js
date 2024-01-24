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
const MAIN_SPREADSHEET_ID = '1PMNsDoZqYd4261FRmEZSo3SkcnqcvfbKDTQMAJaw6ws';
const SHEETS = ['By Date', 'Hacked Clears By Date', 'Cleared Levels'];

function getSheetDownloadUrl(sheetName) {
  return `https://docs.google.com/spreadsheets/d/${MAIN_SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
    sheetName,
  )}`;
}

const UNCLEARED_TITLE_TO_KEY = {
  Title: 'title',
  'Upload Date': 'uploadDate',
  Stars: 'stars',
  Players: 'players',
  Attempts: 'attempts',
  Creator: 'creator',
  'Level ID': 'levelId',
};

const HACKED_CLEAR_TITLE_TO_KEY = {
  'Hacked Clears by Date Level Name': 'title',
  'Upload Date': 'uploadDate',
  Attempts: 'attempts',
  Creator: 'creator',
  'Level ID': 'levelId',

  Hacker: 'hackedBy',
  'Level Description': 'description',
};

const CLEARED_TITLE_TO_KEY = {
  ...UNCLEARED_TITLE_TO_KEY,
  'First Clearer NNID': 'firstClearerNnid',
  'Date Cleared': 'dateCleared',
};

const SHEET_NAME_TO_HEADER_TRANSFORMER = {
  [SHEETS[0]]: (title) => UNCLEARED_TITLE_TO_KEY[title] ?? title,
  // gsheets downloads this CSV really weird because of the double header
  [SHEETS[1]]: (title) =>
    title.match(/Remaining: \d* Upload Date/)
      ? 'uploadDate'
      : HACKED_CLEAR_TITLE_TO_KEY[title] ?? title,
  [SHEETS[2]]: (title) => CLEARED_TITLE_TO_KEY[title] ?? title,
};

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
  await s3.send(
    new PutObjectCommand({
      Body: JSON.stringify(data),
      Bucket: BUCKET_ID,
      Key: filename,
      Metadata: {
        'Content-Type': 'application/json',
      },
    }),
  );
}

async function downloadCsv(sheetName) {
  const { data } = await axios.get(getSheetDownloadUrl(sheetName));

  return new Promise((resolve, reject) => {
    Papa.parse(data, {
      header: true,
      transformHeader: SHEET_NAME_TO_HEADER_TRANSFORMER[sheetName],
      complete: ({ data }) => resolve(data),
      error: (e) => reject(e),
    });
  });
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
    stars: hasValue(level.stars) ? parseInt(level.stars, 10) : level.stars,
    players: hasValue(level.players)
      ? parseInt(level.players, 10)
      : level.players,
    clears: hasValue(level.clears) ? parseInt(level.clears, 10) : level.clears,
    attempts: hasValue(level.attempts)
      ? parseInt(level.attempts, 10)
      : level.attempts,
    // uploadDate should always be here but there is something really wonked
    // up about the hacked clear CSV download
    uploadDate: hasValue(level.uploadDate)
      ? parseDate(level.uploadDate)
      : level.uploadDate,
  };
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  console.log('Init S3');
  const s3 = new S3Client();

  console.log('Queue static GETs');
  const legacyClearsPromise = getS3File(s3, 'static/legacy_clears.json');

  const levelMetaPromise = getS3File(s3, 'static/static_level_data.json');
  const uploadOverridesPromise = getS3File(
    s3,
    'static/upload_date_overrides.json',
  );

  console.log('Downloading gsheets');
  const [unclearedLevels, hackedClears, clearedLevels] = await Promise.all(
    SHEETS.map(downloadCsv),
  );

  const unclearedClean = cleanList(
    unclearedLevels,
    Object.values(UNCLEARED_TITLE_TO_KEY),
  );
  const hackedClearsClean = cleanList(
    hackedClears,
    Object.values(HACKED_CLEAR_TITLE_TO_KEY),
  ).map((l) => ({ ...l, hacked: true }));
  const clearedClean = cleanList(
    clearedLevels,
    Object.values(CLEARED_TITLE_TO_KEY),
  );

  console.log('Compiling uncleared levels');
  const levelMeta = JSON.parse(await levelMetaPromise);

  const getLevelMeta = (level) => _.omit(levelMeta[level.levelId], 'id');

  const unclearedFinal = _.sortBy(
    [...unclearedClean, ...hackedClearsClean].map((level) => ({
      ...level,
      ...parseLevelCommon(level),
      ...getLevelMeta(level),
    })),
    'uploadDate',
  );

  console.log('Compiling cleared levels');
  const uploadDateOverrides = JSON.parse(await uploadOverridesPromise);

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

  const clearedFinal = _.sortBy(
    clearedClean
      .map((level) => ({
        ...level,
        ...parseLevelCommon(level),
        ...getLevelMeta(level),
        ...getClearDate(level),
      }))
      .concat(JSON.parse(await legacyClearsPromise)),
    'dateCleared',
  );

  console.log(
    'UNCLEARED:',
    unclearedFinal.length,
    unclearedFinal[0],
    unclearedFinal[unclearedFinal.length - 1],
  );
  console.log(
    'CLEARED:',
    clearedFinal.length,
    clearedFinal[0],
    clearedFinal[clearedFinal.length - 1],
  );

  if (!event.localrun) {
    await Promise.all([
      uploadToS3(s3, 'levels/uncleared.json', unclearedFinal),
      uploadToS3(s3, 'levels/cleared.json', clearedFinal),
    ]);
  } else {
    console.log('Skipping S3 upload due to local run');
  }

  console.log('Creating clear summary data');

  const clearsByDate = _.mapValues(
    _.groupBy(clearedFinal, 'dateCleared'),
    'length',
  );

  const clearsByPerson = _.mapValues(
    _.groupBy(clearedFinal, 'firstClearerNnid'),
    'length',
  );

  const clearStats = {
    clearsByDate,
    clearsByPerson,
  };

  if (!event.localrun) {
    await uploadToS3(s3, 'levels/clear_summary.json', clearStats);
  } else {
    console.log('Skipping S3 upload due to local run');
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      processedUncleareds: unclearedClean.length,
      processedHackedClears: hackedClearsClean.length,
      processedCleareds: clearedLevels.length,

      totalUncleared: unclearedFinal.length,
      totalCleared: clearedFinal.length,
    }),
  };
};
