<template>
  <NuxtLink
    class="font-medium hover:underline"
    active-class="pointer-events-none"
    :to="`/players/${nnid}`"
    >{{ nnid }}</NuxtLink
  >
</template>

<script setup lang="ts">
defineProps({
  nnid: {
    type: String,
    required: true,
  },
});
</script>
