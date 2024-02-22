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
      <PrimeDropdown
        v-model="tileSize"
        class="absolute right-0 bottom-0 sm:mb-1"
        :options="tileSizes"
        option-label="label"
        option-value="value"
        placeholder="Tile size"
        @change="drawWorlds"
      />
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
import type { MonsterObject } from '~/viewer/MonsterObject';
import type { BlockObject } from '~/viewer/BlockObject';

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
const tabs = computed(() =>
  useCompact([
    {
      label: 'Main world',
      value: 'main' as const,
      command: () => {
        tab.value = 'main';
      },
    },
    unref(hasSubworld) && {
      label: 'Subworld',
      value: 'sub' as const,
      command: () => {
        tab.value = 'sub';
      },
    },
  ]),
);
const activeTabIndex = computed({
  get() {
    return tabs.value.findIndex(({ value }) => value === tab.value);
  },
  set(value) {
    tab.value = tabs.value[value].value;
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
    worldData[world]!.objects,
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
  const objs = worldData[unref(tab)]?.objects ?? [];
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
        x < (obj.x + obj.width) * size &&
        (obj.y - obj.height / 2) * size < y &&
        y < (obj.y + obj.height / 2) * size
      );
    } else if (obj.direction === 3) {
      // bottom-facing, origin top-right
      return (
        (obj.x + obj.width / 2) * size > x &&
        x > (obj.x - obj.width / 2) * size &&
        (obj.y - obj.height / 2) * size < y &&
        y < (obj.y + obj.height / 2) * size
      );
    } else if (obj.direction === 1) {
      // left-facing, origin bottom-right
      return (
        (obj.x + obj.width / 2) * size > x &&
        x > (obj.x - obj.width / 2) * size &&
        obj.y * size < y &&
        y < (obj.y + obj.height) * size
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
        tab.value = tab.value === 'main' ? 'sub' : 'main';
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

  const target = intersections.find(({ name }) => name in objectHandlers);

  if (
    target?.name in objectHandlers &&
    (objectHandlers[target.name].hasInteraction?.(target) ?? true)
  ) {
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
