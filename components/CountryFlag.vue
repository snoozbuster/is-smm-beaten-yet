<template>
  <img
    :class="[
      'inline',
      'border',
      countryCode !== 'JP' ? 'border-transparent' : 'border-black/25',
    ]"
    :src="images[countryCode.toLowerCase()]"
    width="24"
    height="16"
    alt="flag"
  />
</template>

<script setup lang="ts">
import { filename } from 'pathe/utils';

defineProps({
  countryCode: {
    type: String,
    required: true,
  },
});

const glob = import.meta.glob('~/assets/img/flags/*.gif', { eager: true });
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default]),
);
</script>
