// jank script. run with node 21 and requires minor modifications to level
// viewer source to work.
import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import _ from 'lodash';
import CourseViewer from '../viewer/SmmCourseViewer.js';
import { BlockObject } from '../viewer/BlockObject.js';
import { MonsterObject } from '../viewer/MonsterObject.js';

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

function loadCourseFiles(pth) {
  return Promise.all([
    readFile(path.join(pth, 'course_data.cdt')),
    readFile(path.join(pth, 'course_data_sub.cdt')),
  ]);
}

// copied and adapted from LevelPreview.vue. should maybe consider re-use?
const getCourseObjectMappers = (mode) => {
  const kutsuKuriboStyleToName = {
    WU: 'Yoshi',
    MW: 'Yoshi',
    M1: 'Goomba Shoe',
    M3: 'Goomba Shoe',
  };
  const charaKinokoStyleToName = {
    WU: 'Propeller Hat',
    MW: 'Cape',
    M1: 'Costume Mushroom',
    M3: 'Tanooki Suit',
  };

  return {
    Terrain: {
      [mode === 'MW' ? 'Flip Block' : 'Brick Block']:
        BlockObject.codes.RengaBlock,
      '? Block': BlockObject.codes.HatenaBlock,
      'Hard Block': BlockObject.codes.HardBlock,
      Ground: BlockObject.codes.Ground,
      'Semi-solid Platform': [
        BlockObject.codes.GroundMushroom,
        BlockObject.codes.GroundBox,
      ],
      'Donut Block': BlockObject.codes.ChikuwaBlock,
      'Cloud Block': BlockObject.codes.KumoBlock,
      'Note Block': BlockObject.codes.OnpuBlock,
      'Kaizo Block': BlockObject.codes.ClearBlock,
      'Spike Block': BlockObject.codes.Toge,
      'Ice Block': BlockObject.codes.IceBlock,
    },
    Enemies: {
      Goomba: MonsterObject.codes.Kuribo,
      'Koopa Troopa': MonsterObject.codes.Nokonoko,
      'Piranha Plant': MonsterObject.codes.Pakkun,
      'Hammer Bro': {
        type: MonsterObject.codes.HammerBro,
        subType: 0,
      },
      'Sledge Bro': {
        type: MonsterObject.codes.HammerBro,
        subType: 1,
      },
      Thwomp: {
        type: MonsterObject.codes.Dossun,
        subType: 0,
      },
      'Bill Blaster': MonsterObject.codes.KillerHoudai,
      'Bob-omb': MonsterObject.codes.Bombhei,
      Spiny: {
        type: MonsterObject.codes.Togezo,
        subType: 0,
      },
      'Buzzy Beetle': {
        type: MonsterObject.codes.Met,
        subType: 0,
      },
      Lakitu: MonsterObject.codes.Jugem,
      Magikoopa: MonsterObject.codes.Kameck,
      'Spike Top': MonsterObject.codes.Togemet,
      Boo: MonsterObject.codes.Teresa,
      'Dry/Fish Bones': MonsterObject.codes.Karon,
      Cannon: MonsterObject.codes.SenkanHoudai,
      Blooper: MonsterObject.codes.Gesso,
      Wiggler: MonsterObject.codes.Hanachan,
      'Cheep Cheep': MonsterObject.codes.Pukupuku,
      Muncher: MonsterObject.codes.BlackPakkun,
      'Rocky Wrench': {
        type: MonsterObject.codes.Poo,
        subType: 0,
      },
      'Monty Mole': {
        type: MonsterObject.codes.Poo,
        subType: 1,
      },
      Podoboo: MonsterObject.codes.Bubble,
      'Chain Chomp': MonsterObject.codes.Wanwan,
      Bowser: {
        type: MonsterObject.codes.Koopa,
        subType: 0,
      },
      'Bowser Jr.': {
        type: MonsterObject.codes.Koopa,
        subType: 1,
      },
    },
    Items: {
      'Key Coin': {
        type: BlockObject.codes.Coin,
        subType: 1,
      },
      Trampoline: { type: MonsterObject.codes.JumpStep, subType: 0 },
      'Sideways Trampoline': { type: MonsterObject.codes.JumpStep, subType: 1 },
      'P-Switch': {
        type: MonsterObject.codes.PSwitch,
        subType: 0,
      },
      Key: {
        type: MonsterObject.codes.PSwitch,
        subType: 1,
      },
      'POW Block': MonsterObject.codes.PowBlock,
      'Lakitu Cloud': MonsterObject.codes.JugemCloud,
      'Clown Car': MonsterObject.codes.KoopaClown,
    },
    Powerups: {
      Coin: {
        type: BlockObject.codes.Coin,
        subType: 0,
      },
      Mushroom: MonsterObject.codes.SuperKinoko,
      'Spiked Shellmet': {
        type: MonsterObject.codes.Togezo,
        subType: 1,
      },
      Shellmet: {
        type: MonsterObject.codes.Met,
        subType: 1,
      },
      '1-UP Mushroom': MonsterObject.codes.UpKinoko,
      'Fire Flower': MonsterObject.codes.FireFlower,
      Star: MonsterObject.codes.SuperStar,
      [charaKinokoStyleToName[mode] ?? 'Style-specific Powerup']:
        MonsterObject.codes.CharaKinoko,
      [kutsuKuriboStyleToName[mode] ?? 'Boot/Yoshi']:
        MonsterObject.codes.KutsuKuribo,
      'Lanky Mushroom': MonsterObject.codes.FunnyKinoko,
      'Giant Mushroom': MonsterObject.codes.DekaKinoko,
    },
    Course: {
      Skewer: {
        type: MonsterObject.codes.Dossun,
        subType: 1,
      },
      'Warp Pipe': BlockObject.codes.Dokan,
      Lift: MonsterObject.codes.Lift,
      Bridge: {
        type: BlockObject.codes.Bridge,
        subType: 0,
      },
      Firebar: MonsterObject.codes.FireBar,
      Vine: {
        type: BlockObject.codes.Tsuta,
        subType: 0,
      },
      'Skull Platform': MonsterObject.codes.YouganLift,
      'Conveyor Belt': BlockObject.codes.BeltConveyor,
      Burner: MonsterObject.codes.Burner,
      Door: {
        type: MonsterObject.codes.Door,
        matcher(obj) {
          return obj.doorType === 0;
        },
      },
      'P-Door': {
        type: MonsterObject.codes.Door,
        iconSuffix: '1',
        matcher(obj) {
          return obj.doorType === 1;
        },
      },
      'Key Door': {
        type: MonsterObject.codes.Door,
        iconSuffix: '2',
        matcher(obj) {
          return obj.doorType === 2;
        },
      },
      Track: {
        type: BlockObject.codes.Rail,
        subType: 0,
      },
      'Arrow Sign': {
        type: MonsterObject.codes.AirSignBoard,
        subType: 0,
      },
      'Checkpoint Flag': {
        type: MonsterObject.codes.AirSignBoard,
        subType: 1,
      },
      'One-way Wall': MonsterObject.codes.HalfHitWall,
      Saw: {
        type: MonsterObject.codes.Saw,
        subType: 0,
      },
      Bumper: {
        type: MonsterObject.codes.Saw,
        subType: 1,
      },
    },
  };
};

const createMatchFn = (matcher) => {
  const types = Array.isArray(matcher)
    ? matcher
    : typeof matcher === 'number'
      ? [matcher]
      : [matcher.type];

  const matchFn =
    Array.isArray(matcher) || typeof matcher !== 'object'
      ? _.stubTrue
      : 'matcher' in matcher
        ? matcher.matcher
        : (obj) => obj.subType === matcher.subType;

  return (obj) => {
    return types.includes(obj.type) && matchFn(obj);
  };
};

const genMatchers = (mode) => {
  return _.groupBy(
    _.flatMap(getCourseObjectMappers(mode), (group) =>
      _.flatMap(group, (matchers, name) =>
        (Array.isArray(matchers) ? matchers : [matchers]).map((matcher) => {
          const type = typeof matcher === 'number' ? matcher : matcher.type;

          return {
            name,
            type,
            match: createMatchFn(matcher),
          };
        }),
      ),
    ),
    'type',
  );
};

const OBJECTS_BY_MODE = {
  WU: genMatchers('WU'),
  MW: genMatchers('MW'),
  M3: genMatchers('M3'),
  M1: genMatchers('M1'),
};

function computeObjectSummary(mode, objs) {
  const matchers = OBJECTS_BY_MODE[mode];

  const expandedObjs = _.flatMap(objs, (obj) => {
    const hasChildObj =
      ![
        BlockObject.codes.Ground,
        BlockObject.codes.HardBlock,
        BlockObject.codes.CastleBridge,
      ].includes(obj.type) && obj.childType in MonsterObject.names; // this won't detect coins inside brick/? blocks (ten coin blocks)

    return _.compact([
      obj,
      hasChildObj &&
        new MonsterObject({
          ...obj,
          type: obj.childType,
          flags: obj.childFlags,
        }),
    ]);
  });

  return _.countBy(
    expandedObjs,
    (obj) =>
      matchers[obj.type]?.find(({ match }) => match(obj))?.name ?? obj.name,
  );
}

function readCourse(levelId, courseData) {
  return new Promise((resolve, reject) => {
    new CourseViewer().read(courseData, (err, course, objs) => {
      if (err) {
        reject(new Error(`Err in read: ${levelId}`));
      }

      resolve({
        course,
        objectSummary: computeObjectSummary(course.mode, objs),
      });
    });
  });
}

const courseData = {};

const errors = [];

for (const levelId of levelDirs) {
  console.log(`Reading ${levelId}`);
  const levelPath = path.join(inputDir, levelId);
  try {
    const [main, sub] = await loadCourseFiles(levelPath);
    const [mainRes, subRes] = await Promise.all([
      readCourse(levelId, main),
      readCourse(levelId, sub),
    ]);
    courseData[levelId] = {
      main: mainRes,
      sub: subRes,
    };
  } catch (e) {
    console.error(e);
    errors.push(levelId);
  }
}

console.error('Errors in:', errors);

await writeFile(outfile, JSON.stringify(courseData, undefined, 2));
