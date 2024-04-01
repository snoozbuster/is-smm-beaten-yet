const { createHash, createHmac } = require('crypto');
const _ = require('lodash');

function convertId(id) {
  const hash = createHash('md5');
  hash.update('9f2b4678');
  const key = hash.digest();

  const data = Buffer.alloc(8);
  data.writeUInt32LE(id);

  const hmac = createHmac('md5', key);
  hmac.update(data);
  const checksum = hmac.digest('hex');

  const parts = [
    `${checksum.substring(6, 8)}${checksum.substring(4, 6)}`,
    ..._.chunk(id.toString(16).padStart(12, '0'), 4).map((s) => s.join('')),
  ];

  return parts.join('-').toUpperCase();
}

module.exports = convertId;
