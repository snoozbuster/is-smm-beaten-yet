<template>
  <img
    class="inline"
    :src="styleImages[style.toLowerCase()]"
    :width="size"
    :height="size"
  />
</template>

<script setup lang="ts">
import type { ClearedLevel } from '~/types/levels';

defineProps({
  style: {
    type: String as PropType<NonNullable<ClearedLevel['style']>>,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 16,
  },
});

const { styleImages } = useLevelAssets();
</script>
