<template>
  <div class="hidden lg:block grow" v-bind="$attrs">
    <CourseWorldCard :grid="false" class="h-full">
      <LevelBrowserTable
        :levels="levels"
        :hide-columns="hideColumns"
      />
    </CourseWorldCard>
  </div>
  <div class="lg:hidden grow" v-bind="$attrs">
    <LevelBrowserList :levels="levels" />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { ClearedLevel } from '~/types/levels';
import { LEVEL_BROWSER_COLUMNS } from '~/composables/useLevelBrowserSettings';

defineProps({
  levels: {
    type: Array as PropType<ClearedLevel[]>,
    default: () => [],
  },
  hideColumns: {
    type: Array as PropType<(keyof typeof LEVEL_BROWSER_COLUMNS)[]>,
    default: () => [],
  },
});
</script>
