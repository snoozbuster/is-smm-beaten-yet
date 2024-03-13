import { readFile, writeFile } from 'fs/promises';
import _ from 'lodash';

const outfileArg = process.argv.find((arg) => arg.startsWith('-o='));
const inFileArg = process.argv.find((arg) => arg.startsWith('-i='));
if (!outfileArg || !inFileArg) {
  console.log(
    'Usage: node ./build-static-data -o=output.json -i=course-data.json',
  );
  process.exit(1);
}

const outfile = outfileArg.replace(/^-o=/, '');
const inFile = inFileArg.replace(/^-i=/, '');

const THEME_MAP = {
  ghostHouse: 'Ghost House',
  castle: 'Castle',
  underground: 'Underground',
  overworld: 'Ground',
  airship: 'Airship',
  water: 'Underwater',
};

const STYLE_MAP = {
  M1: 'SMB1',
  M3: 'SMB3',
  MW: 'SMW',
  WU: 'NSMBU',
};

const getCheckpointCount = ({ main, sub }) => {
  return (
    (main.objectSummary['Checkpoint Flag'] ?? 0) +
    (sub.objectSummary['Checkpoint Flag'] ?? 0)
  );
};

const hasSubworld = ({ sub }) => Boolean(sub.course.objectCount);

const isAutoscroll = (world) => {
  return world.course.scrollName !== 'none';
};

const getTimer = ({ main }) => {
  return main.course.timeLimit;
};

const getStyle = ({ main }) => {
  return STYLE_MAP[main.course.mode];
};

const getWorldData = (world) => ({
  autoscroll: isAutoscroll(world),
  theme: THEME_MAP[world.course.themeName],
  worldLength: world.course.widthBlock,
});

const courseData = JSON.parse((await readFile(inFile)).toString('utf-8'));

await writeFile(
  outfile,
  JSON.stringify(
    _.mapValues(courseData, (level) => ({
      ...getWorldData(level.main),
      timer: getTimer(level),
      style: getStyle(level),
      checkpoints: getCheckpointCount(level),
      subworld: hasSubworld(level) ? getWorldData(level.sub) : undefined,
    })),
    undefined,
    2,
  ),
);
