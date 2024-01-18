<template>
  <div>level data</div>
</template>

<script setup lang="ts">
const emit = defineEmits({
  ready: () => true,
});

const cleared = ref();
const uncleared = ref();

onMounted(async () => {
  [cleared.value, uncleared.value] = await Promise.all([
    $fetch('/api/levels/cleared'),
    $fetch('/api/levels/uncleared'),
  ]);

  emit('ready');
});
</script>
