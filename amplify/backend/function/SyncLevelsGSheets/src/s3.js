const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require('@aws-sdk/client-s3');
const fs = require('fs/promises');
const path = require('path');

const BUCKET_ID = 'is-smm-beaten-yet-public-data';

const LOCAL_OUTPUT_FOLDER = process.env.LOCAL_OUTPUT_FOLDER;

/**
 * @type {S3Client}
 */
let s3;

/**
 * @type {boolean}
 */
let isLocalRun;

async function initS3Client({ localrun }) {
  isLocalRun = localrun;
  if (
    LOCAL_OUTPUT_FOLDER &&
    !(
      await fs.stat(path.join(process.cwd(), LOCAL_OUTPUT_FOLDER))
    ).isDirectory()
  ) {
    throw new Error(
      `Invalid environment variable LOCAL_OUTPUT_FOLDER="${LOCAL_OUTPUT_FOLDER}" (should be directory)`,
    );
  }

  return (s3 = new S3Client());
}

async function getS3File(filename) {
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

async function uploadToS3(filename, data) {
  if (isLocalRun) {
    if (LOCAL_OUTPUT_FOLDER) {
      const location = `./${LOCAL_OUTPUT_FOLDER}/${filename}`;
      console.log(`Dry run: writing "${location}"`);
      await fs.mkdir(path.dirname(location), { recursive: true });
      await fs.writeFile(
        path.join(LOCAL_OUTPUT_FOLDER, filename),
        JSON.stringify(data),
        { encoding: 'utf-8' },
      );
    } else {
      console.log(`Dry run: not uploading "${filename}" to S3`);
    }

    return;
  }

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

async function getS3Json(filename) {
  const data = await getS3File(filename);
  console.log(`Downloaded ${filename}`);
  return JSON.parse(data);
}

module.exports = {
  initS3Client,
  getS3File,
  getS3Json,
  uploadToS3,
};
