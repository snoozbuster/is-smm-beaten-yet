// Compiles level JSON files outputted by download-level-meta.py into a CSV
import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import _ from 'lodash';
import Papa from 'papaparse';
import { Duration } from 'luxon';

async function listFiles(pth) {
  const directories = await readdir(pth);
  return await Promise.all(
    directories.map(async (f) => ({
      id: path.basename(f, '.json'),
      contents: JSON.parse(await readFile(path.join(pth, f))),
    })),
  );
}

const outfileArg = process.argv.find((arg) => arg.startsWith('-o='));
const inputDirArg = process.argv.find((arg) => arg.startsWith('-d='));
if (!outfileArg || !inputDirArg) {
  console.log(
    'Usage: node ./compile-level-json -o=output.csv -d=/path/to/level/records',
  );
  process.exit(1);
}

const outfile = outfileArg.replace(/^-o=/, '');
const inputDir = inputDirArg.replace(/^-d=/, '');

await writeFile(
  outfile,
  Papa.unparse(
    (await listFiles(inputDir)).map(({ id, contents: record }) => ({
      Title: record.course_name,
      'Upload Date': record.create_time,
      Stars: record.stars,
      Players: record.user_plays,
      Clears: record.clears,
      Attempts: record.total_attempts,
      Creator: record.miis.creator.nnid,
      'Level ID': id,
      'Cleared By': record.miis.first_clear.nnid,
      'Clear Date': record.world_record.created_time,
      'World Record Holder': record.miis.world_record.nnid,
      'World Record Date': record.world_record.updated_time,
      'World Record Time': Duration.fromMillis(
        record.world_record.time_milliseconds,
      ).toISOTime(),
    })),
    { header: true },
  ),
);
