<template>
  <BasePlayerMilestone
    :level-id="milestone.levelId"
    :date-cleared="milestone.dateCleared"
    :was-recleared="milestone.wasRecleared"
    :compact="compact"
    @click="$emit('click', $event)"
  >
    <template #icon>
      <Icon
        name="noto:trophy"
        class="shrink-0"
        :size="compact ? 20 : 24"
      />
    </template>
    <template #label>
      {{ formatMonthYear(milestone.year, milestone.month) }}
    </template>
  </BasePlayerMilestone>
</template>

<script setup lang="ts">
import type { MinorMilestone } from '~/types/players';

const props = withDefaults(
  defineProps<{
    milestone: MinorMilestone;
    compact?: boolean;
  }>(),
  { compact: false },
);

defineEmits<{ (e: 'click', levelId: string): void }>();

const { formatMonthYear } = useFormatters();
</script>
