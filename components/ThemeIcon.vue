<template>
  <img
    class="inline"
    :src="themeImages[theme.toLowerCase().replace(' ', '_')]"
    :width="size"
    :height="size"
  />
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { ClearedLevel } from '~/types/levels';

defineProps({
  theme: {
    type: String as PropType<NonNullable<ClearedLevel['theme']>>,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 20,
  },
});

const { themeImages } = useLevelAssets();
</script>
