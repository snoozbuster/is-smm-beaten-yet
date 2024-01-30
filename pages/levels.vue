<template>
  <div class="h-screen overflow-hidden bg-course-world">
    <div class="h-full max-w-[1800px] mt-auto mx-auto flex flex-col py-5">
      <PrimeMessage class="md:hidden" severity="warn" :closable="false">
        Sorry, this page is still under construction for devices of this size.
        Use a wider screen for best results.
      </PrimeMessage>
      <NuxtLink to="/#stats" class="w-fit text-course-world-contrast text-lg">
        <span class="pi pi-angle-left"></span> Back to stats
      </NuxtLink>
      <h1 class="text-course-world-contrast text-4xl mb-5">
        Uncleared Super Mario Maker 1 Levels
        <span
          v-tooltip="'Level list is refreshed every 2 hours.'"
          class="pi pi-question-circle text-2xl ml-2 text-slate-400 opacity-50 hover:opacity-100 transition-opacity"
        ></span>
      </h1>
      <CourseWorldCard :grid="false" class="grow mb-5">
        <LevelBrowserTable :levels="uncleared" />
      </CourseWorldCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { COURSE_WORLD_GREEN } from '~/constants/colors';

useSeoMeta({
  title: 'Super Mario Maker 1 Uncleared Level Browser',
  ogTitle: 'Super Mario Maker 1 Uncleared Level Browser',
  themeColor: COURSE_WORLD_GREEN,
});

const { uncleared, load } = useUnclearedLevels();

onMounted(load);
</script>
