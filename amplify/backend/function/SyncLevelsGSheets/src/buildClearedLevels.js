const _ = require('lodash');
const { downloadCsv, getSheetDownloadUrl } = require('./gsheets.js');
const { getS3Json } = require('./s3.js');
const retry = require('async-retry');

const CLEARS_SPREADSHEET_ID = '1D7C_Qj7HbbnF7CiEABcr1VUPu2peQfkPfJPRr1Vuwag';

const CLEARED_TITLE_TO_KEY = {
  'Upload Date': 'uploadDate',
  Stars: 'stars',
  Players: 'players',
  Attempts: 'attempts',
  Creator: 'creator',
  'Level ID': 'levelId',
  Clears: 'clears',
  'Level Name': 'title',
  'First Clearer NNID': 'firstClearerNnid',
  'Date Cleared': 'dateCleared',
  'True clear?': 'hacked',
};

function cleanList(levels, allowedProps) {
  return levels.map((level) => _.pick(level, allowedProps));
}

function parseLevelProperties(level) {
  const hasValue = (v) => !_.isNil(v) && v !== '';

  return {
    levelId: hasValue(level.levelId) ? level.levelId : undefined,
    creator: hasValue(level.creator) ? level.creator : undefined,
    stars: hasValue(level.stars)
      ? parseInt(level.stars.replace(/[^\d]/g, ''), 10)
      : undefined,
    players: hasValue(level.players)
      ? parseInt(level.players.replace(/[^\d]/g, ''), 10)
      : undefined,
    clears: hasValue(level.clears)
      ? parseInt(level.clears.replace(/[^\d]/g, ''), 10)
      : undefined,
    attempts: hasValue(level.attempts)
      ? parseInt(level.attempts.replace(/[^\d]/g, ''), 10)
      : undefined,
    uploadDate: hasValue(level.uploadDate) ? level.uploadDate : undefined,
    dateCleared: level.dateCleared,
    hacked: Boolean(level.hacked),
  };
}

/**
 *
 * @returns {Promise<{
 *   [levelId: string]: {
 *     autoscroll: boolean;
 *     theme: string;
 *     worldLength: number;
 *     timer: number;
 *     style: string;
 *     checkpoints: number;
 *     subworld?: {
 *       autoscroll: boolean;
 *       theme: string;
 *       worldLength: number;
 *     }
 *   }
 * }>}
 */
async function getStaticLevelData() {
  // return {};
  return getS3Json('static/static_level_data.json');
}

/**
 * @returns {Promise<Record<string, string>>}
 */
async function getPlayerCountryCodes() {
  // return {};
  return getS3Json('static/user_country_codes.json');
}

/**
 * @returns {Promise<Array<{
 *   levelId?: string;
 *   stars?: number;
 *   players?: number;
 *   attempts?: number;
 *   creator?: string;
 *   clears: number;
 *   title: string;
 *   firstClearerNnid: string;
 *   dateCleared: string;
 *   hacked?: boolean;
 * }>>}
 */
async function getClearedLevelSheet() {
  const clearedLevels = await downloadCsv(
    getSheetDownloadUrl(
      CLEARS_SPREADSHEET_ID,
      'All Team 0% Clears (by clear date)',
    ),
    CLEARED_TITLE_TO_KEY,
  );

  if (clearedLevels.length < 80000) {
    // sometimes the download endpoint just doesn't return anything,
    // do a basic sanity check. the full dataset is about 85000 levels
    throw new Error(
      `CSV only has ${clearedLevels.length} level(s), expected at least 80,000`,
    );
  }

  console.log('Downloaded cleared levels CSV');

  return cleanList(clearedLevels, Object.values(CLEARED_TITLE_TO_KEY));
}

async function buildClearedLevels() {
  console.log('Downloading input files');
  const [clearedLevels, levelMeta, playerCountries] = await Promise.all([
    retry(getClearedLevelSheet, {
      retries: 3,
      onRetry: (e) =>
        console.log('Retrying cleared level CSV download:', e.message),
    }),
    getStaticLevelData(),
    getPlayerCountryCodes(),
  ]);

  const getLevelMeta = (level) => ({
    ..._.omit(levelMeta[level.levelId], 'id'),
    countryCode: playerCountries[level.creator],
    firstClearerCountryCode: playerCountries[level.firstClearerNnid],
  });

  const joinedClears = clearedLevels.map((level) => ({
    ...level,
    ...parseLevelProperties(level),
    ...getLevelMeta(level),
  }));

  return _.sortBy(joinedClears, 'dateCleared', 'asc');
}

module.exports = {
  buildClearedLevels,
};
