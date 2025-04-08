<template>
  <h3 class="text-xl">Clear breakdown</h3>
  <PrimeTabMenu
    class="mb-3 -mx-2 md:mx-0"
    :model="tabs"
    :pt="{
      action: {
        class:
          'uppercase xl:p-3 lg:p-1.5 p-3 xl:text-base xl:line-height-1 lg:text-sm',
      },
    }"
  />
  <ClearedByDate
    v-if="tab === 'year' || tab === 'month'"
    :cleared-levels="cleared"
    :unit="tab"
  />
  <StylePieChart v-else :cleared-levels="cleared" :style="tab" />
</template>

<script setup lang="ts">
import type { ClearedLevel } from '~/types/levels';

defineProps({
  cleared: {
    type: Array as PropType<ClearedLevel[]>,
    default: () => [],
  },
});

const tab = ref<'year' | 'month' | 'style' | 'theme' | 'countryCode'>('style');

const tabs = [
  { label: 'Style', command: () => (tab.value = 'style') },
  { label: 'Theme', command: () => (tab.value = 'theme') },
  { label: 'Country', command: () => (tab.value = 'countryCode') },
  { label: 'Year', command: () => (tab.value = 'year') },
  { label: 'Month', command: () => (tab.value = 'month') },
];
</script>
