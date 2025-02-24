const Papa = require('papaparse');
const _ = require('lodash');
const axios = require('axios');
const fs = require('fs');

// lazy programmer moment:
const courseData = require('./all-course-data.json'); // generated with scripts/extract-course-data.js
const staticData = require('./static_level_data.json'); // generated with scripts/build-static-data.js

const CLEARS_SPREADSHEET_ID = '1D7C_Qj7HbbnF7CiEABcr1VUPu2peQfkPfJPRr1Vuwag';

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

const CLEARED_TITLE_TO_KEY = {
  ...COMMON_TITLE_TO_KEY,
  Clears: 'clears',
  'Level Name': 'title',
  'First Clearer NNID': 'firstClearerNnid',
  'Date Cleared': 'dateCleared',
};
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

const allLevels = await downloadCsv(
  getSheetDownloadUrl(
    CLEARS_SPREADSHEET_ID,
    'All Team 0% Clears (by clear date)',
  ),
  CLEARED_TITLE_TO_KEY,
);

mismatchLevels = allLevels.filter(
  (level) =>
    level.levelId in courseData &&
    level.title !== courseData[level.levelId].main.course.name,
);

const merged = _.map(allLevels, (l) => ({
  ...l,
  ...(staticData[l.levelId] ?? {}),
}));

const years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021'];
const months = _.range(0, 12).map((i) => (i + 1).toString().padStart(2, '0'));
const styles = ['SMB1', 'SMB3', 'SMW', 'NSMBU'];
const preHackedClearMilestones = [
  {
    year: '2015',
    reason:
      "Some time after the last 2015 level was marked cleared by TheCryptan's Discord bot, a database search for levels with hacked clears discovered the final five levels for 2015.",
  },
  { year: '2016', style: 'SMB1' },
  { year: '2016', style: 'SMB3' },
  { year: '2020', style: 'SMB1' },
  { year: '2020', style: 'SMB3' },
  { year: '2021', style: 'SMW' },
  { year: '2021', style: 'SMB1' },
  { year: '2020', style: 'SMW' },

  { year: '2015', month: '09' },
  { year: '2015', month: '11' },
  { year: '2015', month: '12' },
  { year: '2016', month: '01' },
  { year: '2017', month: '01' },
  { year: '2016', month: '02' },
  { year: '2021', month: '01' },
  { year: '2021', month: '02' },
];

const withoutTrueClears = (levels) =>
  _.filter(levels, (level) => !level['True clear?']);
const extractStats = (levels, excludeTrueClears) => ({
  ..._.pick(_.last(excludeTrueClears ? withoutTrueClears(levels) : levels), [
    'dateCleared',
    'levelId',
    'firstClearerNnid',
  ]),
  wasRecleared: excludeTrueClears,
});

const bigMilestones = _.flatMap(years, (year) => {
  const yearLevels = merged.filter(({ uploadDate }) =>
    uploadDate.startsWith(year),
  );

  const byStyle = _.groupBy(yearLevels, 'style');

  const extraMilestones = preHackedClearMilestones.filter(
    (m) => m.year === year && !m.month,
  );

  const generateStyleMilestone = (style, excludeTrueClears) => ({
    year,
    style,
    ...extractStats(byStyle[style], excludeTrueClears),
  });
  const generateYearMilestone = (year, excludeTrueClears) => ({
    year,
    ...extractStats(yearLevels, excludeTrueClears),
  });

  return [
    ...styles.map((style) => generateStyleMilestone(style)),
    ...extraMilestones.flatMap(({ style, reason }) =>
      (style
        ? [generateStyleMilestone(style, true)]
        : styles.map((style) => generateStyleMilestone(style, true))
      ).map((m) => ({ ...m, reason })),
    ),
    // positioning is intentional - for the final year/style combo (eg, final SMB1
    // level which is also the final 2017 level), the deduped milestone list should
    // have an object with both keys.
    generateYearMilestone(year),
  ];
});

const monthMilestones = _.flatMap(
  _.keyBy(
    _.flatMap(years, (year) =>
      _.map(months, (month) => [year, month].join('-')),
    ).filter((yearMonth) => yearMonth >= '2015-09' && yearMonth <= '2021-03'),
  ),
  (yearMonth) => {
    const monthLevels = merged.filter(({ uploadDate }) =>
      uploadDate.startsWith(yearMonth),
    );

    const extraMilestones = preHackedClearMilestones.filter(
      (m) => yearMonth === [m.year, m.month].join('-'),
    );

    const generateMonthMilestone = (yearMonth, excludeTrueClears) => ({
      year: yearMonth.split('-')[0],
      month: yearMonth.split('-')[1],
      ...extractStats(monthLevels, excludeTrueClears),
    });

    return [
      generateMonthMilestone(yearMonth),
      ...extraMilestones.map(({ year, month }) =>
        generateMonthMilestone([year, month].join('-'), true),
      ),
    ];
  },
);

// special additional milestone: original jan 2016 clear on 2022-04-30
monthMilestones.push({
  year: '2016',
  month: '01',
  levelId: '07FA-0000-01A7-70F5',
  firstClearerNnid: 'tatiaus',
  dateCleared: '2022-05-01T01:06:04Z',
  wasRecleared: true,
  reason:
    'Some time after this level was cleared, it was discovered that the original bot had missed a couple of levels.',
});

const yearStyleMilestones = [
  ...bigMilestones,
  // special additional milestone: original 2015 clear on 2018-08-12
  {
    year: '2015',
    levelId: '8509-0000-011C-7E41',
    firstClearerNnid: 'lil_drummer_boi',
    dateCleared: '2018-08-13T04:30:51Z',
    wasRecleared: true,
    reason:
      'Some time after this level was cleared, it was discovered that the original bot had missed a couple of 2015 levels.',
  },
];

const dedupedBigMilestones = _.uniqBy(
  _.sortBy(yearStyleMilestones, 'dateCleared', 'desc'),
  'levelId',
);

// we add this one at the end to prevent it from being deduped, since it's a unique milestone not tied to a style or month
dedupedBigMilestones.push({
  name: 'Autoscroll',
  levelId: 'BBCA-0000-0347-9205',
  firstClearerNnid: 'Fritzef',
  dateCleared: '2024-02-14T21:02:58Z',
});

const milestones = {
  majorMilestones: dedupedBigMilestones,
  monthMilestones: monthMilestones,
};

fs.writeFileSync(
  './milestones.json',
  JSON.stringify(
    _.mapValues(milestones, (mstones) =>
      _.sortBy(mstones, 'dateCleared', 'asc'),
    ),
    undefined,
    2,
  ),
);
