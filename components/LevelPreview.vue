<template>
  <div class="h-full min-h-0 flex flex-col">
    <div v-if="!error" class="relative mb-3">
      <PrimeTabMenu
        v-model:activeIndex="activeTabIndex"
        class="hidden sm:block"
        :model="tabs"
      />
      <PrimeDropdown
        v-model="tab"
        class="sm:hidden"
        :options="tabs"
        option-label="label"
        option-value="value"
        placeholder="Tile size"
        @change="drawWorlds"
      />
      <div class="absolute right-0 bottom-0 sm:mb-1">
      <PrimeDropdown
        v-model="tileSize"
        :options="tileSizes"
        option-label="label"
        option-value="value"
        placeholder="Tile size"
        @change="drawWorlds"
      />
        <PrimeButton
          class="h-[34px] ml-2"
          icon="pi pi-filter"
          severity="secondary"
          size="small"
          aria-label="Filter course parts"
          @click="toggleFilterMenu"
        />
      </div>
      <PrimeOverlayPanel ref="filterMenu">
        <div
          class="overflow-y-scroll max-h-[50vh] md:overflow-auto md:grid md:grid-flow-col md:gap-2 p-menu p-component p-0 border-0"
        >
          <ul
            v-for="(group, index) in filteredCoursePartOptions"
            :key="group.label"
            class="p-menu-list p-reset md:border-0"
            :class="
              index !== filteredCoursePartOptions.length - 1 &&
              'pb-3 mb-3 lg:pb-0 lg:mb-0 border-solid border-b border-b-slate-300'
            "
          >
            <li class="p-menuitem font-medium text-lg">
              <div class="p-menuitem-content">
                <label class="p-menuitem-link">
                  <PrimeCheckbox
                    v-model="partFilterState[group.label]"
                    class="mr-3"
                    binary
                    @update:model-value="drawWorlds"
                  />
                  {{ group.label }}
                </label>
              </div>
            </li>
            <li
              v-for="item in group.items"
              :key="item.label"
              class="p-menuitem"
            >
              <div class="p-menuitem-content">
                <label class="p-menuitem-link">
                  <PrimeCheckbox
                    v-model="partFilterState[item.label]"
                    binary
                    @update:model-value="drawWorlds"
                  />
                  <img
                    class="mx-2 object-contain object-left"
                    :src="`/layout/draw/${item.iconName}`"
                    width="16"
                    :style="item.iconStyle"
                  />
                  {{ item.label }}
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div class="text-right mt-2">
          <PrimeButton
            type="button"
            icon="pi pi-filter-slash"
            label="Reset filters"
            outlined
            size="small"
            @click="
              () => {
                initPartFilters();
                drawWorlds();
              }
            "
          />
        </div>
      </PrimeOverlayPanel>
    </div>

    <PrimeSkeleton
      v-if="!worldData.main && !error"
      width="100%"
      height="432px"
    />
    <div v-else-if="!worldData.main && error" class="text-xl">
      <Icon name="material-symbols:error" class="text-red-700" /> There was an
      error loading the preview. Please confirm your internet connection and try
      again. If the error continues, the Discord may be able to help.
    </div>

    <div
      id="course-display-main"
      class="overflow-scroll h-full min-h-0 position-relative cursor-move"
      :class="tab !== 'main' && 'hidden'"
      @mousemove="handleMouseover"
      @click="handleClick"
    ></div>
    <div
      id="course-display-sub"
      class="overflow-scroll h-full min-h-0 position-relative cursor-move"
      :class="tab !== 'sub' && 'hidden'"
      @mousemove="handleMouseover"
      @click="handleClick"
    ></div>

    <p class="text-slate-600 italic text-sm mt-1">
      Click and drag to pan. Click or tap doors and pipes to move between pairs.
      <button
        v-tooltip.focus="
          `Tag snooz in the Discord with the level ID and description of the inaccuracy. Include a screenshot (or picture, I'm not judgmental) from the game if possible.`
        "
        class="border-dotted border-b"
      >
        Inaccurate?
      </button>
    </p>
  </div>
</template>

<style lang="scss" scoped>
:deep(.blink) {
  animation: 0.1s infinite alternate linear blink;
}

@keyframes blink {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>

<script setup lang="ts">
import CourseViewer from '~/viewer/SmmCourseViewer';
import { Draw as DrawCourse } from '~/viewer/Draw';
import { DATA_ROOT_URL } from '~/constants/levelData';
import type { Course } from '~/viewer/Course';
import type { CourseObject } from '~/viewer/CourseObject';
import { MonsterObject } from '~/viewer/MonsterObject';
import { BlockObject } from '~/viewer/BlockObject';

const props = defineProps({
  levelId: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['not-found']);

const levelUrl = computed(
  () => `${DATA_ROOT_URL}/course-data/${props.levelId}`,
);

interface LoadedCourseData {
  course: Course;
  objects: CourseObject[];
}

const worldData = reactive<{
  main?: LoadedCourseData;
  sub?: LoadedCourseData;
}>({
  main: undefined,
  sub: undefined,
});

const hasSubworld = computed(() => Boolean(worldData.sub?.objects.length));

const tab = ref<'main' | 'sub'>('main');
function switchWorld(world: 'main' | 'sub') {
  tab.value = world;
  initPartFilters();
  drawWorld(world);
}
const tabs = computed(() =>
  useCompact([
    {
      label: 'Main world',
      value: 'main' as const,
      command: () => switchWorld('main'),
    },
    unref(hasSubworld) && {
      label: 'Subworld',
      value: 'sub' as const,
      command: () => switchWorld('sub'),
    },
  ]),
);
const activeTabIndex = computed({
  get() {
    return tabs.value.findIndex(({ value }) => value === tab.value);
  },
  set(value) {
    switchWorld(tabs.value[value].value);
  },
});

const tileSize = ref(16);
const tileSizes = [
  {
    label: 'Small',
    value: 16,
    command: () => {
      tileSize.value = 16;
      drawWorlds();
    },
  },
  {
    label: 'Medium',
    value: 32,
    command: () => {
      tileSize.value = 32;
      drawWorlds();
    },
  },
  {
    label: 'Large',
    value: 64,
    command: () => {
      tileSize.value = 64;
      drawWorlds();
    },
  },
];

const viewer = new CourseViewer();

const error = ref(false);
const filterMenu = ref();

function toggleFilterMenu(event: Event) {
  unref(filterMenu).toggle(event);
}

const toast = useToast();

onMounted(async () => {
  const getLevelFile = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to GET level file', { cause: response });
    }
    return await response.blob();
  };

  try {
    const [main, sub] = await Promise.all([
      getLevelFile(`${unref(levelUrl)}/course_data.cdt`),
      getLevelFile(`${unref(levelUrl)}/course_data_sub.cdt`),
    ]);

    viewer.read(main, (err: boolean, course: Course, objs: CourseObject[]) => {
      if (err) {
        error.value = true;
        return;
      }
      worldData.main = {
        course,
        objects: objs,
      };
      initPartFilters();
      drawWorld('main');
    });

    viewer.read(sub, (err: boolean, course: Course, objs: CourseObject[]) => {
      if (err) {
        error.value = true;
        return;
      }
      worldData.sub = {
        course,
        objects: objs,
      };
      drawWorld('sub');
    });
  } catch (e) {
    if (
      e instanceof Error &&
      e.cause instanceof Response &&
      [403, 404].includes(e.cause.status)
    ) {
      emit('not-found');
      toast.add({
        severity: 'error',
        summary: 'Not found',
        detail: `No level preview for ${props.levelId} was found.`,
        life: 4000,
      });
      return;
    }
    console.error(e);
    error.value = true;
  }
});

function drawWorld(world: 'main' | 'sub') {
  // eslint-disable-next-line no-new
  new DrawCourse(
    `course-display-${world}`,
    worldData[world]!.course,
    filterCourseParts(worldData[world]!.objects),
    unref(tileSize),
  );
}

function drawWorlds() {
  if (unref(tab) === 'sub') {
    drawWorld('sub');
  }
  drawWorld('main');
  if (unref(tab) === 'main') {
    drawWorld('sub');
  }
}

type CourseObjectCode = number;
type Arrayable<T> = T | T[];
type CourseObjectMatcher = Arrayable<
  | CourseObjectCode
  | ({ type: CourseObjectCode } & (
      | { iconSuffix?: string; tileCoordinates?: never }
      | { iconSuffix?: never; tileCoordinates?: { xT: number; yT: number } }
    ) &
      ({ subType?: 0 | 1 } | { matcher: (obj: CourseObject) => boolean }))
>;
const courseObjectGroups = computed<
  Record<string, Record<string, CourseObjectMatcher>>
>(() => {
  const kutsuKuriboStyleToName: Record<string, string> = {
    WU: 'Yoshi',
    MW: 'Yoshi',
    M1: 'Goomba Shoe',
    M3: 'Goomba Shoe',
  };
  const charaKinokoStyleToName: Record<string, string> = {
    WU: 'Propeller Hat',
    MW: 'Cape',
    M1: 'Costume Mushroom',
    M3: 'Tanooki Suit',
  };
  const charaKinokoStyleToIcon: Record<string, string> = {
    WU: '0d',
    MW: '0c',
    M1: '0',
    M3: '0b',
  };

  return {
    Terrain: {
      [worldData.main?.course.mode === 'MW' ? 'Flip Block' : 'Brick Block']: {
        type: BlockObject.codes.RengaBlock,
        tileCoordinates: { xT: 1, yT: 0 },
      },
      '? Block': {
        type: BlockObject.codes.HatenaBlock,
        tileCoordinates: { xT: 2, yT: 0 },
      },
      'Hard Block': {
        type: BlockObject.codes.HardBlock,
        tileCoordinates: { xT: 6, yT: 0 },
      },
      Ground: {
        type: BlockObject.codes.Ground,
        tileCoordinates: { xT: 0, yT: 13 },
      },
      'Donut Block': {
        type: BlockObject.codes.ChikuwaBlock,
        tileCoordinates: { xT: 0, yT: 4 },
      },
      'Cloud Block': {
        type: BlockObject.codes.KumoBlock,
        tileCoordinates: { xT: 6, yT: 6 },
      },
      'Note Block': {
        type: BlockObject.codes.OnpuBlock,
        tileCoordinates: { xT: 4, yT: 0 },
      },
      'Hidden Block': {
        type: BlockObject.codes.ClearBlock,
        tileCoordinates: { xT: 3, yT: 0 },
      },
      'Spike Block': {
        type: BlockObject.codes.Toge,
        tileCoordinates: { xT: 2, yT: 4 },
      },
      'Ice Block': {
        type: BlockObject.codes.IceBlock,
        tileCoordinates: { xT: 8, yT: 7 },
      },
      Vine: {
        type: BlockObject.codes.Tsuta,
        tileCoordinates: { xT: 14, yT: 7 },
      },
      'Semi-solid Platform': [
        {
          type: BlockObject.codes.GroundMushroom,
          tileCoordinates: { xT: 3, yT: 2 },
        },
        BlockObject.codes.GroundBox,
      ],
      Bridge: {
        type: BlockObject.codes.Bridge,
        tileCoordinates: { xT: 1, yT: 3 },
      },
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
      'Lava Bubble': MonsterObject.codes.Bubble,
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
      Coin: {
        type: BlockObject.codes.Coin,
        subType: 0,
        tileCoordinates: { xT: 7, yT: 0 },
      },
      'Key Coin': {
        type: BlockObject.codes.Coin,
        subType: 1,
        tileCoordinates: { xT: 0, yT: 16 },
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
      '1-UP Mushroom': MonsterObject.codes.UpKinoko,
    },
    Powerups: {
      Mushroom: MonsterObject.codes.SuperKinoko,
      'Spiked Shellmet': {
        type: MonsterObject.codes.Togezo,
        subType: 1,
        tileCoordinates: { xT: 11, yT: 10 },
      },
      Shellmet: {
        type: MonsterObject.codes.Met,
        subType: 1,
        tileCoordinates: { xT: 10, yT: 10 },
      },
      'Fire Flower': MonsterObject.codes.FireFlower,
      Star: MonsterObject.codes.SuperStar,
      [charaKinokoStyleToName[worldData.main?.course.mode] ??
      'Style-specific Powerup']: {
        type: MonsterObject.codes.CharaKinoko,
        iconSuffix: charaKinokoStyleToIcon[worldData.main?.course.mode],
      },
      [kutsuKuriboStyleToName[worldData.main?.course.mode] ?? 'Boot/Yoshi']: {
        type: MonsterObject.codes.KutsuKuribo,
        subType: 0,
        iconSuffix: ['M1', 'M3'].includes(worldData.main?.course.mode)
          ? '0b'
          : '0',
      },
      'Lanky Mushroom': MonsterObject.codes.FunnyKinoko,
      'Giant Mushroom': MonsterObject.codes.DekaKinoko,
    },
    Course: {
      'Pipe (no warp)': {
        type: BlockObject.codes.Dokan,
        matcher(obj) {
          return obj.pipeLink === -1;
        },
      },
      'Warp Pipe': {
        type: BlockObject.codes.Dokan,
        matcher(obj) {
          return obj.pipeLink !== -1;
        },
      },
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
      Saw: {
        type: MonsterObject.codes.Saw,
        subType: 0,
      },
      Skewer: {
        type: MonsterObject.codes.Dossun,
        subType: 1,
      },
      Lift: MonsterObject.codes.Lift,
      Firebar: MonsterObject.codes.FireBar,
      'Skull Platform': MonsterObject.codes.YouganLift,
      'Conveyor Belt': {
        type: BlockObject.codes.BeltConveyor,
        tileCoordinates: { xT: 8, yT: 0 },
      },
      Burner: MonsterObject.codes.Burner,
      'Checkpoint Flag': {
        type: MonsterObject.codes.AirSignBoard,
        subType: 1,
      },
      'One-way Wall': MonsterObject.codes.HalfHitWall,
      Bumper: {
        type: MonsterObject.codes.Saw,
        subType: 1,
      },
      Track: {
        type: BlockObject.codes.Rail,
        tileCoordinates: { xT: 0, yT: 9 },
      },
      'Arrow Sign': {
        type: MonsterObject.codes.AirSignBoard,
        subType: 0,
      },
    },
  };
});

const normalizedCoursePartOptions = computed(() => {
  const createMatchFn = (matcher: CourseObjectMatcher) => {
    const types = Array.isArray(matcher)
      ? matcher
      : typeof matcher === 'number'
        ? [matcher]
        : [matcher.type];

    const matchFn =
      Array.isArray(matcher) || typeof matcher !== 'object'
        ? useStubTrue
        : 'matcher' in matcher
          ? matcher.matcher
          : 'subType' in matcher
            ? (obj: CourseObject) => obj.subType === matcher.subType
            : useStubTrue;

    return (obj: CourseObject) => {
      return types.includes(obj.type) && matchFn(obj);
    };
  };

  const currentWorld = worldData[unref(tab)];

  return Object.keys(unref(courseObjectGroups)).map((groupName) => ({
    label: groupName,
    items: useFlatMap(unref(courseObjectGroups)[groupName], (matchers, name) =>
      (Array.isArray(matchers) ? matchers : [matchers]).map(
        (matcher, index) => {
          const type = typeof matcher === 'number' ? matcher : matcher.type;
          const isObjectMatcher =
            !Array.isArray(matcher) && typeof matcher === 'object';
          const iconSuffix =
            (isObjectMatcher && (matcher.iconSuffix || matcher.subType)) || '0';
          const isBlockObject = type in BlockObject.names;
          const iconName =
            isObjectMatcher && matcher.tileCoordinates && currentWorld
              ? `${isBlockObject ? 'titleset' : 'monster'}/${useCompact([
                  currentWorld.course.mode,
                  isBlockObject && currentWorld.course.themeName,
                  currentWorld.course.mode === 'WU' && '16x16',
                ]).join('-')}.png`
              : `format/${type}-${iconSuffix}.png`;
          const iconStyle =
            isObjectMatcher && matcher.tileCoordinates
              ? `object-fit: none;
                 object-position: -${matcher.tileCoordinates.xT * 16}px -${
                   matcher.tileCoordinates.yT * 16
                 }px;
                 height: 16px`
              : undefined;

          return {
            label: name,
            iconName,
            iconStyle,
            type,
            hidden: index > 0,
            match: createMatchFn(matcher),
          };
        },
      ),
    ),
  }));
});

function makeGroupComputedOption(label: string) {
  return computed({
    get() {
      const items = unref(normalizedCoursePartOptions).find(
        ({ label: l }) => label === l,
      )?.items;
      return items?.every(({ label }) => partFilterState[label]);
    },
    set(value) {
      const items = unref(normalizedCoursePartOptions).find(
        ({ label: l }) => label === l,
      )?.items;
      if (items) {
        items.forEach(({ label }) => (partFilterState[label] = value));
      }
    },
  });
}

const partFilterState: Record<string, boolean> = reactive(
  useMapValues(
    useKeyBy(unref(normalizedCoursePartOptions), 'label'),
    (_, label) => makeGroupComputedOption(label),
  ),
);

function initPartFilters() {
  unref(normalizedCoursePartOptions).forEach(({ items }) => {
    items.forEach(({ label }) => (partFilterState[label] = true));
  });
}

const filteredCoursePartOptions = computed(() => {
  const currentWorld = worldData[unref(tab)];
  if (!currentWorld) {
    return unref(normalizedCoursePartOptions);
  }

  let searchOptions = useFlatMap(unref(normalizedCoursePartOptions), 'items');
  const foundOptions = new Set<string>();
  useForEach(currentWorld.objects, (o) => {
    getCanonicalObjects(o).forEach((obj) => {
    searchOptions.forEach(({ label, match }) => {
      if (match(obj)) {
        foundOptions.add(label);
      }
    });
    searchOptions = searchOptions.filter(
      ({ label }) => !foundOptions.has(label),
    );
    });

    if (searchOptions.length === 0) {
      return false;
    }
  });

  return unref(normalizedCoursePartOptions)
    .map(({ items, ...rest }) => ({
      ...rest,
      items: items.filter(
        ({ label, hidden }) => !hidden && foundOptions.has(label),
      ),
    }))
    .filter(({ items }) => items.length > 0);
});

function getCanonicalObjects(obj: CourseObject) {
    const hasChildObj =
      ![
        BlockObject.codes.Ground,
        BlockObject.codes.HardBlock,
        BlockObject.codes.RengaBlock,
        BlockObject.codes.CastleBridge,
      ].includes(obj.type) && obj.childType in MonsterObject.names;
  return useCompact([
      obj,
      hasChildObj &&
        new MonsterObject({
          ...obj,
          type: obj.childType,
          flags: obj.childFlags,
        }),
    ]);
}

function filterCourseParts(objs: CourseObject[]) {
  const typeMatchers: Record<
    number,
    { label: string; match: (o: CourseObject) => boolean }[]
  > = useGroupBy(
    useFlatMap(unref(normalizedCoursePartOptions), 'items'),
    'type',
  );

  function filterObject(obj: CourseObject) {
    const objs = getCanonicalObjects(obj);
    return objs.some(
      (o) =>
        typeMatchers[o.type]?.some(
          ({ match, label }) => match(o) && partFilterState[label],
        ) ?? true,
    );
  }

  return objs.filter(filterObject);
}

const filteredCurrentWorldObjects = computed(() =>
  filterCourseParts(worldData[unref(tab)]?.objects ?? []),
);

function getCanvasEl() {
  return document.getElementById(`course-display-${unref(tab)}_courseDraw`);
}

function projectMouseEvent(event: MouseEvent) {
  const { clientX, clientY } = event;
  const currentCourseCanvas = getCanvasEl();
  const canvasBoundingRect = currentCourseCanvas?.getBoundingClientRect();

  if (!currentCourseCanvas || !canvasBoundingRect) {
    return;
  }

  const [x, y] = [
    clientX - canvasBoundingRect.left + currentCourseCanvas.clientLeft,
    canvasBoundingRect.bottom - clientY + currentCourseCanvas.clientTop,
  ];

  return { x, y };
}

function getObjectIntersections({ x, y }: { x: number; y: number }) {
  const objs = unref(filteredCurrentWorldObjects);
  const size = unref(tileSize);

  return objs.filter((obj) => {
    if (obj.name !== 'Dokan' || obj.direction === 2)
      // no rotation/top-facing, origin bottom-left
      return (
        obj.x * size < x &&
        x < (obj.x + obj.width) * size &&
        obj.y * size < y &&
        y < (obj.y + obj.height) * size
      );
    else if (obj.direction === 0) {
      // right-facing, origin top-left
      return (
        obj.x * size < x &&
        x < (obj.x + obj.height) * size &&
        (obj.y - obj.width + 1) * size < y &&
        y < (obj.y + 1) * size
      );
    } else if (obj.direction === 3) {
      // bottom-facing, origin top-right
      return (
        (obj.x + 1) * size > x &&
        x > (obj.x - obj.width + 1) * size &&
        (obj.y + 1) * size > y &&
        y > (obj.y - obj.height + 1) * size
      );
    } else if (obj.direction === 1) {
      // left-facing, origin bottom-right
      return (
        (obj.x + 1) * size > x &&
        x > (obj.x - obj.height + 1) * size &&
        obj.y * size < y &&
        y < (obj.y + obj.width) * size
      );
    }
    return false;
  });
}

function blinkObj(obj: CourseObject, { rotation }: { rotation?: number } = {}) {
  const size = unref(tileSize);
  const canvasContainer = document
    .getElementById(`course-display-${unref(tab)}`)!
    .childNodes.item(0);
  const overlay = document.createElement('div');
  overlay.className = 'absolute blink bg-course-world-card';
  overlay.style.left = `${obj.x * size}px`;
  overlay.style.bottom = `${obj.y * size}px`;
  overlay.style.width = `${obj.width * size}px`;
  overlay.style.height = `${obj.height * size}px`;
  if (rotation) {
    // there has _got_ to be a better way to handle these rotations. I can't stand this.
    const transform = useCompact([
      rotation % 180 === 0 && `translateX(${size}px)`,
      rotation <= 180 && `translateY(-${size}px)`,
      rotation > 180 && `translateX(${size}px)`,
      `rotate(${rotation}deg)`,
    ]).join(' ');
    overlay.style.transform = transform;
    overlay.style.transformOrigin = `bottom left`;
  }
  canvasContainer.appendChild(overlay);
  overlay.scrollIntoView({
    behavior: 'instant',
    block: 'center',
    inline: 'center',
  });
  setTimeout(() => overlay.remove(), 500);
}

const objectHandlers = {
  Door: {
    onClick: (obj: MonsterObject, objects: CourseObject[]) => {
      const otherDoor = objects.find(
        (o) =>
          o !== obj &&
          o.name === 'Door' &&
          o.doorLink === obj.doorLink &&
          o.doorType === obj.doorType,
      );

      if (otherDoor) {
        blinkObj(otherDoor);
      }
    },
  },
  Dokan /* Pipe */: {
    hasInteraction: (obj: BlockObject) => {
      return obj.pipeLink !== -1;
    },
    onClick: (obj: BlockObject) => {
      const otherWorldObjs =
        unref(tab) === 'main'
          ? worldData.sub!.objects
          : worldData.main!.objects;

      const otherPipe = otherWorldObjs.find(
        (o) => o.name === 'Dokan' && o.pipeLink === obj.pipeLink,
      );

      if (otherPipe) {
        switchWorld(tab.value === 'main' ? 'sub' : 'main');
        nextTick(() => {
          blinkObj(otherPipe, {
            rotation:
              otherPipe.direction === 0
                ? 90
                : otherPipe.direction === 3
                  ? 180
                  : otherPipe.direction === 1
                    ? 270
                    : 0,
          });
        });
      }
    },
  },
};

function handleMouseover(event: MouseEvent) {
  const coords = projectMouseEvent(event);
  const intersections = getObjectIntersections(coords);

  const canvas = getCanvasEl();
  if (
    intersections.some(
      (obj) =>
        obj.name in objectHandlers &&
        (objectHandlers[obj.name].hasInteraction?.(obj) ?? true),
    )
  ) {
    canvas?.classList.add('cursor-pointer');
  } else {
    canvas?.classList.remove('cursor-pointer');
  }
}

function handleClick(event: MouseEvent) {
  const coords = projectMouseEvent(event);
  const intersections = getObjectIntersections(coords);

  // object lists are sorted in roughly render order (so later in the list
  // renders on top).  by looking for the last match in the list we can usually
  // match the layering on the image itself.
  const target = intersections.findLast(
    (obj) =>
      obj.name in objectHandlers &&
      (objectHandlers[obj.name].hasInteraction?.(obj) ?? true),
  );

  if (target) {
    objectHandlers[target.name].onClick(target, worldData[unref(tab)]?.objects);
  }
}

const pointerScroll = (elem: HTMLElement) => {
  let isDrag = false;

  const dragStart = () => (isDrag = true);
  const dragEnd = () => (isDrag = false);
  const drag = (ev: MouseEvent) => {
    isDrag && (elem.scrollLeft -= ev.movementX);
    isDrag && (elem.scrollTop -= ev.movementY);
  };

  elem.addEventListener('pointerdown', dragStart);
  addEventListener('pointerup', dragEnd);
  addEventListener('pointermove', drag);
};

onMounted(() =>
  nextTick(() => {
    pointerScroll(document.getElementById('course-display-main')!);
    pointerScroll(document.getElementById('course-display-sub')!);
  }),
);
</script>
