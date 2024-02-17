<template>
  <PrimeDialog
    class="w-screen lg:w-3/4"
    :header="`Preview for ${levelId}`"
    :visible="visible"
    :draggable="false"
    modal
    maximizable
    @update:visible="(v) => $emit('update:visible', v)"
  >
    <div class="flex mb-3">
      <PrimeTabMenu class="grow" :model="tabs" />
      <PrimeTabMenu :model="tileSizes" />
    </div>

    <div
      id="course-display-main"
      class="overflow-scroll"
      :class="tab !== 'main' && 'hidden'"
    ></div>
    <div
      id="course-display-sub"
      class="overflow-scroll"
      :class="tab !== 'sub' && 'hidden'"
    ></div>
  </PrimeDialog>
</template>

<script setup lang="ts">
import CourseViewer from '~/viewer/SmmCourseViewer';
import { Draw as DrawCourse } from '~/viewer/Draw';
import { DATA_ROOT_URL } from '~/constants/levelData';
import type { Course } from '~/viewer/Course';
import type { CourseObject } from '~/viewer/CourseObject';

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

defineEmits(['update:visible']);

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

const hasSubworld = computed(() => worldData.sub?.objects.length);

const tab = ref<'main' | 'sub'>('main');
const tabs = computed(() =>
  useCompact([
    { label: 'Main world', command: () => (tab.value = 'main') },
    hasSubworld && { label: 'Subworld', command: () => (tab.value = 'sub') },
  ]),
);

const tileSize = ref(16);
const tileSizes = [
  {
    label: 'Small',
    command: () => {
      tileSize.value = 16;
      drawWorld(unref(tab));
    },
  },
  {
    label: 'Medium',
    command: () => {
      tileSize.value = 32;
      drawWorld(unref(tab));
    },
  },
  {
    label: 'Large',
    command: () => {
      tileSize.value = 64;
      drawWorld(unref(tab));
    },
  },
];

const viewer = new CourseViewer();

onMounted(async () => {
  const [main, sub] = await Promise.all([
    (async () => (await fetch(`${unref(levelUrl)}/course_data.cdt`)).blob())(),
    (async () =>
      (await fetch(`${unref(levelUrl)}/course_data_sub.cdt`)).blob())(),
  ]);
  viewer.read(main, (err: boolean, course: Course, objs: CourseObject[]) => {
    if (err) {
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
      return;
    }
    worldData.sub = {
      course,
      objects: objs,
    };
    drawWorld('sub');
  });
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
</script>
