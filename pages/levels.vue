<template>
  <div class="h-dvh overflow-hidden bg-course-world">
    <div class="h-full max-w-[1800px] mt-auto mx-auto flex flex-col p-5">
      <NuxtLink to="/#stats" class="w-fit text-course-world-contrast text-lg">
        <span class="pi pi-angle-left"></span> Back to stats
      </NuxtLink>
      <h1 class="text-course-world-contrast text-4xl lg:mb-5">
        <span class="hidden lg:inline">
          Cleared Super Mario Maker 1 Levels
        </span>
        <span class="lg:hidden"> Cleared levels </span>
        <button
          v-tooltip.focus="
            'Level list is synced with the game every ~2 minutes.'
          "
          class="ml-2 opacity-50 hover:opacity-100 transition-opacity"
        >
          <span class="text-2xl pi pi-question-circle" />
        </button>
      </h1>
      <p v-if="pending" class="text-course-world-contrast">
        Loading cleared levels…
      </p>
      <p v-else-if="error" class="text-course-world-contrast">
        Failed to load cleared levels.
      </p>
      <ResponsiveLevelList v-else :levels="levels ?? []" />
    </div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { COURSE_WORLD_GREEN } from '~/constants/colors';
import { LEVELS_ROOT_URL } from '~/constants/levelData';
import type { ClearedLevel } from '~/types/levels';

useSeoMeta({
  title: 'SMM1 Cleared Level Browser',
  ogTitle: 'SMM1 Cleared Level Browser',
  themeColor: COURSE_WORLD_GREEN,
});

const {
  data: levels,
  pending,
  error,
} = useAsyncData<ClearedLevel[]>(
  'levels-cleared',
  () => $fetch(`${LEVELS_ROOT_URL}/cleared.json`),
  { deep: false },
);
</script>
