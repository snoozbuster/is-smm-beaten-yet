<template>
  <h3
    v-if="title || $slots.title"
    class="text-xl font-semibold flex justify-center items-center"
  >
    <span class="mx-auto">
      <slot name="title">
        {{ title }}
      </slot>
    </span>
  </h3>
  <div
    class="flex flex-row-reverse flex-wrap lg:flex-nowrap justify-center mb-8"
  >
    <svg
      width="200"
      height="150"
      viewBox="0 0 200 150"
      preserve-aspect-ratio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="100"
        y="40"
        font-family="Arial"
        font-size="20"
        text-anchor="middle"
        fill="#000"
      >
        {{ LEADERBOARD_RANK_MEDALS[1] }}
      </text>
      <rect x="75" y="50" width="50" height="100" fill="#DAA520" />
      <text
        x="100"
        y="70"
        font-family="Arial"
        font-size="16"
        text-anchor="middle"
        font-weight="700"
        fill="#000"
      >
        {{ podiumPlacements[0] }}
      </text>

      <text
        x="50"
        y="65"
        font-family="Arial"
        font-size="20"
        text-anchor="middle"
        fill="#000"
      >
        {{ LEADERBOARD_RANK_MEDALS[2] }}
      </text>
      <rect x="25" y="75" width="50" height="75" fill="#d0d0d0" />
      <text
        x="50"
        y="95"
        font-family="Arial"
        font-size="16"
        text-anchor="middle"
        font-weight="700"
        fill="#000"
      >
        {{ podiumPlacements[1] }}
      </text>

      <text
        x="150"
        y="90"
        font-family="Arial"
        font-size="20"
        text-anchor="middle"
        fill="#000"
      >
        {{ LEADERBOARD_RANK_MEDALS[3] }}
      </text>
      <rect x="125" y="100" width="50" height="50" fill="#A56F2B" />
      <text
        x="150"
        y="120"
        font-family="Arial"
        font-size="16"
        text-anchor="middle"
        font-weight="700"
        fill="#000"
      >
        {{ podiumPlacements[2] }}
      </text>
    </svg>
    <div class="text-left self-center mt-4">
      <div
        v-for="(slotName, i) in captionSlotNames"
        :key="slotName"
        class="flex items-center text-lg"
      >
        <span class="text-xl mr-1">
          {{ LEADERBOARD_RANK_MEDALS[i + 1] }}
        </span>
        <slot :name="slotName" :medal="LEADERBOARD_RANK_MEDALS[i + 1]" />
      </div>
    </div>
  </div>
  <div v-if="$slots.footer" class="pt-2 border-t -mx-3 px-3 -mb-2">
    <slot name="footer" />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { LEADERBOARD_RANK_MEDALS } from '~/constants/leaderboards';

defineProps({
  /** Optional heading text. Omit when title area is provided via #title slot. */
  title: {
    type: String,
    default: '',
  },
  /** Values shown in the three podium boxes: [1st, 2nd, 3rd]. Use #first-caption, #second-caption, #third-caption for the descriptive content beside each place. */
  podiumPlacements: {
    type: Array as unknown as PropType<[string, string, string]>,
    required: true,
  },
});

const captionSlotNames = [
  'first-caption',
  'second-caption',
  'third-caption',
] as const;
</script>
