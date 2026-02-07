<template>
  <div
    class="flex items-center rounded-lg cursor-pointer shrink-0"
    :class="
      compact
        ? 'gap-2 bg-course-world-card-contrast/10 px-2 py-1.5 hover:bg-course-world-card-contrast/20'
        : 'gap-3 border border-course-world-card-contrast/20 px-3 py-2 hover:bg-course-world-card-contrast/10'
    "
    @click="$emit('click', levelId)"
  >
    <slot name="icon" />
    <div class="min-w-0 flex-1">
      <span class="font-medium" :class="compact ? 'truncate' : ''">
        <slot name="label" />
      </span>
      <span
        v-if="wasRecleared"
        class="ml-1 shrink-0 inline-block"
        @click.stop
      >
        <PrimeTag
          v-tooltip.focus="reclearedTooltip"
          class="cursor-default"
          severity="info"
          value="Re-cleared"
          tabindex="0"
        />
      </span>
    </div>
    <span
      v-if="dateCleared"
      class="shrink-0 text-sm opacity-90"
      :class="compact && 'text-xs'"
    >
      {{ formatDate(dateCleared, compact) }}
    </span>
    <Icon
      name="mdi:chevron-right"
      class="shrink-0 opacity-70"
      :size="compact ? 20 : 24"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    levelId: string;
    dateCleared?: string;
    wasRecleared?: boolean;
    /** Tooltip for the Re-cleared tag when wasRecleared is true */
    reclearedTooltip?: string;
    compact?: boolean;
  }>(),
  {
    wasRecleared: false,
    reclearedTooltip:
      'Category was later re-cleared when additional levels were discovered',
    compact: false,
  },
);

defineEmits<{ (e: 'click', levelId: string): void }>();

const { formatDate } = useFormatters();
</script>
