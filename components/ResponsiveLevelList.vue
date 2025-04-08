<template>
  <div class="hidden lg:block grow" v-bind="$attrs">
    <CourseWorldCard :grid="false" class="h-full">
      <LevelBrowserTable :levels="levels" />
    </CourseWorldCard>
  </div>
  <div class="lg:hidden grow" v-bind="$attrs">
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
