// jank script. run with node 21 and requires minor modifications to level
// viewer source to work.
import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import _ from 'lodash';
import CourseViewer from '../viewer/SmmCourseViewer.js';

async function listDirectories(pth) {
  const directories = (await readdir(pth, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dir) => dir.name);
  return directories;
}

const outfileArg = process.argv.find((arg) => arg.startsWith('-o='));
const inputDirArg = process.argv.find((arg) => arg.startsWith('-d='));
if (!outfileArg || !inputDirArg) {
  console.log(
    'Usage: node ./extract-course-data -o=output.json -d=/path/to/level/dirs',
  );
  process.exit(1);
}

const outfile = outfileArg.replace(/^-o=/, '');
const inputDir = inputDirArg.replace(/^-d=/, '');

const levelDirs = await listDirectories(inputDir);

const courseData = {};

function loadCourseFiles(pth) {
  return Promise.all([
    readFile(path.join(pth, 'course_data.cdt')),
    readFile(path.join(pth, 'course_data_sub.cdt')),
  ]);
}

const viewer = new CourseViewer();

const NAME_TYPE_MAP = {
  Nokonoko: {
    0: 'Green Koopa',
    1: 'Red Koopa',
  },
  Pakkun: {
    0: 'Piranha Plant',
    1: 'Fire Piranha',
  },
  Dossun: {
    0: 'Thwomp',
    1: 'Skewer',
  },
  PSwitch: {
    0: 'P-Switch',
    1: 'Key',
  },
  Door: {
    0: 'Door',
    1: 'P Door',
    2: 'Key Door',
  },
  Koopa: {
    0: 'Bowser',
    1: 'Bowser Jr.',
  },
  AirSignBoard: {
    0: 'Arrow Signboard',
    1: 'Checkpoint Flag',
  },
  Saw: {
    0: 'Saw',
    1: 'Bumper',
  },
};

function computeObjectSummary(objs) {
  return _.countBy(objs, (obj) => {
    if (!(obj.name in NAME_TYPE_MAP)) {
      return obj.name;
    }
    if (typeof NAME_TYPE_MAP[obj.name] === 'string') {
      return NAME_TYPE_MAP[obj.name];
    }
    return NAME_TYPE_MAP[obj.name][obj.subType] ?? obj.name;
  });
}

function readCourse(levelId, courseData) {
  return new Promise((resolve, reject) => {
    viewer.read(courseData, (err, course, objs) => {
      if (err) {
        reject(new Error(`Err in read: ${levelId}`));
      }

      resolve({
        course,
        objectSummary: computeObjectSummary(objs),
      });
    });
  });
}

for (const levelId of levelDirs) {
  console.log(`Reading ${levelId}`);
  const levelPath = path.join(inputDir, levelId);
  const [main, sub] = await loadCourseFiles(levelPath);
  const [mainRes, subRes] = await Promise.all([
    readCourse(levelId, main),
    readCourse(levelId, sub),
  ]);
  courseData[levelId] = {
    main: mainRes,
    sub: subRes,
  };
}

await writeFile(outfile, JSON.stringify(courseData, undefined, 2));
