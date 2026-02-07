<template>
  <PrimeTag
    v-tooltip.focus="tooltip"
    class="cursor-default mb-1"
    severity="secondary"
    :value="label"
    tabindex="0"
  />
</template>

<script setup lang="ts">
import type { MajorMilestone, Milestone, MinorMilestone } from '~/types/players';

const props = defineProps<{
  milestone: Milestone;
}>();

const label = computed(() =>
  'month' in props.milestone ? 'Month finale' : 'Category finale',
);

const tooltip = computed(() => {
  if ('month' in props.milestone) {
    const m = props.milestone as MinorMilestone;
    return `Final ${m.year} ${m.month} level to be cleared`;
  }
  const m = props.milestone as MajorMilestone;
  return `Final ${m.year} ${m.style} level to be cleared${m.wasRecleared ? ' (later re-cleared when additional levels were discovered)' : ''}`;
});
</script>
