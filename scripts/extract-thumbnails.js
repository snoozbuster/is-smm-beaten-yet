import { readdir, writeFile, readFile } from 'fs/promises';
import path from 'path';
import _ from 'lodash';

async function listDirectories(pth) {
  const directories = (await readdir(pth, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dir) => dir.name);
  return directories;
}

const inputDirArg = process.argv.find((arg) => arg.startsWith('-d='));
if (!inputDirArg) {
  console.log('Usage: node ./extract-thumbnails -d=/path/to/level/dirs');
  process.exit(1);
}

const inputDir = inputDirArg.replace(/^-d=/, '');

const levelDirs = await listDirectories(inputDir);

const thumbnails = ['thumbnail0.tnl', 'thumbnail1.tnl'];

async function extractThumbnail(thumbPath) {
  const outPath = path.join(
    path.dirname(thumbPath),
    `${path.basename(thumbPath, 'tnl')}jpg`,
  );
  await writeFile(outPath, (await readFile(thumbPath)).slice(8));
}

for (const levelId of levelDirs) {
  console.log(`Extracting ${levelId}`);
  const levelPath = path.join(inputDir, levelId);
  await Promise.all(
    thumbnails.map((file) => extractThumbnail(path.join(levelPath, file))),
  );
}
