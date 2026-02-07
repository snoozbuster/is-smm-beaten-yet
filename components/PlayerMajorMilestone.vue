<template>
  <BasePlayerMilestone
    :level-id="milestone.levelId"
    :date-cleared="milestone.dateCleared"
    :was-recleared="milestone.wasRecleared"
    :recleared-tooltip="
      milestone.reason ??
      'Later superseded by new information; you were still awarded the milestone at the time.'
    "
    :compact="compact"
    @click="$emit('click', $event)"
  >
    <template #icon>
      <Icon
        v-if="'name' in milestone && milestone.name"
        name="fluent:fast-forward-20-regular"
        class="shrink-0"
        :size="compact ? 20 : 24"
      />
      <StyleIcon
        v-else-if="'style' in milestone && milestone.style"
        class="shrink-0"
        :style="milestone.style"
        :size="compact ? 20 : 24"
      />
      <Icon
        v-else
        name="noto:trophy"
        class="shrink-0"
        :size="compact ? 20 : 24"
      />
    </template>
    <template #label>{{ majorLabel }}</template>
  </BasePlayerMilestone>
</template>

<script setup lang="ts">
import type { MajorMilestone } from '~/types/players';

const props = withDefaults(
  defineProps<{
    milestone: MajorMilestone;
    compact?: boolean;
  }>(),
  { compact: false },
);

defineEmits<{ (e: 'click', levelId: string): void }>();

const majorLabel = computed(() => {
  const m = props.milestone;
  if ('name' in m && m.name) return String(m.name);
  if ('style' in m && m.style) return `${m.year} ${String(m.style)}`;
  if ('year' in m && m.year) return String(m.year);
  return '<Unknown>';
});
</script>
