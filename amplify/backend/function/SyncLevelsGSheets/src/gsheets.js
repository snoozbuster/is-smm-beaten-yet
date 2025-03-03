const Papa = require('papaparse');
const axios = require('axios');

function parseCsv(csv, transformer) {
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

function getSheetDownloadUrl(sheetId, sheetName) {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
    sheetName,
  )}`;
}

module.exports = {
  downloadCsv,
  getSheetDownloadUrl,
};
