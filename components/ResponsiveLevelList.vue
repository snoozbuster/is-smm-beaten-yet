<template>
  <div class="hidden lg:block grow">
    <CourseWorldCard :grid="false" class="h-full">
      <LevelBrowserTable :levels="levels" />
    </CourseWorldCard>
  </div>
  <div class="lg:hidden grow">
    <LevelBrowserList :levels="levels" />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { ClearedLevel } from '~/types/levels';

defineProps({
  levels: {
    type: Array as PropType<ClearedLevel[]>,
    default: () => [],
  },
});
</script>
