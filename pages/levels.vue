<template>
  <div class="h-dvh overflow-hidden bg-course-world">
    <div class="h-full max-w-[1800px] mt-auto mx-auto flex flex-col p-5">
      <NuxtLink to="/#stats" class="w-fit text-course-world-contrast text-lg">
        <span class="pi pi-angle-left"></span> Back to stats
      </NuxtLink>
      <h1 class="text-course-world-contrast text-4xl lg:mb-5">
        <span class="hidden lg:inline">
          Uncleared Super Mario Maker 1 Levels
        </span>
        <span class="lg:hidden"> Uncleared levels </span>
        <button
          v-tooltip.focus="
            'Level list is synced with the game every ~2 minutes.'
          "
          class="ml-2 opacity-50 hover:opacity-100 transition-opacity"
        >
          <span class="text-2xl pi pi-question-circle" />
        </button>
      </h1>
      <div class="hidden lg:block grow">
        <CourseWorldCard :grid="false" class="h-full">
          <LevelBrowserTable :levels="uncleared" @refresh="refreshLevels" />
        </CourseWorldCard>
      </div>
      <div class="lg:hidden grow">
        <LevelBrowserList :levels="uncleared" />
      </div>
    </div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { COURSE_WORLD_GREEN } from '~/constants/colors';

useSeoMeta({
  title: 'SMM1 Uncleared Level Browser',
  ogTitle: 'SMM1 Uncleared Level Browser',
  themeColor: COURSE_WORLD_GREEN,
});

const toast = useToast();

const { uncleared, load } = useUnclearedLevels();

const { formatNumber } = useFormatters();

onMounted(load);

async function refreshLevels() {
  const previousLevelCount = uncleared.value.length;
  await load();
  const newLevelCount = uncleared.value.length;
  const levelsRemoved = previousLevelCount - newLevelCount;
  toast.add({
    severity: 'success',
    summary: 'Table refreshed',
    detail: levelsRemoved
      ? `${formatNumber(
          levelsRemoved,
        )} levels have been cleared since last update`
      : 'No levels cleared since last update. Note that the level list may be up to 2 minutes behind.',
    life: 4000,
  });
}
</script>
