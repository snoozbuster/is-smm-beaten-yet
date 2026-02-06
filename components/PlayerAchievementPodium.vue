<template>
  <BasePodium :podium-placements="podiumPlacements">
    <template #first-caption>
      <span>{{ count1 }} {{ pluralize('leaderboard', count1) }}</span>
    </template>
    <template #second-caption>
      <span>{{ count2 }} {{ pluralize('leaderboard', count2) }}</span>
    </template>
    <template #third-caption>
      <span>{{ count3 }} {{ pluralize('leaderboard', count3) }}</span>
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </BasePodium>
</template>

<script lang="ts" setup>
import pluralize from 'pluralize';

const props = defineProps({
  count1: { type: Number, required: true },
  count2: { type: Number, required: true },
  count3: { type: Number, required: true },
});

const podiumPlacements = computed((): [string, string, string] => [
  String(props.count1),
  String(props.count2),
  String(props.count3),
]);
</script>
