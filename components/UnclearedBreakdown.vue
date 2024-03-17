<template>
  <h3 class="text-lg">Trimming the Herbs breakdown</h3>
  <PrimeTabMenu
    class="mb-3 -mx-2 md:mx-0"
    :model="tabs"
    :pt="{ action: { class: 'uppercase px-2 py-2' } }"
  />
  <UnclearedByDate v-if="isDateTab" :uncleared-levels="uncleared" :unit="tab" />
  <StylePieChart v-else :uncleared-levels="uncleared" :style="tab" />
</template>

<script setup lang="ts">
import type { UnclearedLevel } from '~/types/levels';

const props = defineProps({
  uncleared: {
    type: Array as PropType<UnclearedLevel[]>,
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

const isDateTab = computed(() => tab.value === 'year' || tab.value === 'month');
</script>
