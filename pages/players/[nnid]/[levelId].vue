<template>
  <LevelPreviewPage
    :level-id="(route.params.levelId as string) ?? ''"
    :return-path="`/players/${route.params.nnid}`"
  />
</template>

<script setup lang="ts">
const route = useRoute();
</script>
