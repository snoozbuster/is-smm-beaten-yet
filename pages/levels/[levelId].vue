<template>
  <div>
    <PrimeDialog
      class="w-screen lg:w-3/4"
      :header="`Preview for ${levelId}`"
      visible
      :draggable="false"
      modal
      maximizable
      :pt="{
        content: {
          class: 'flex flex-col',
        },
      }"
      @update:visible="(v) => !v && navigateTo({ path: '/levels' })"
    >
      <ClientOnly>
        <LevelPreview
          v-if="!invalidLevelId"
          :level-id="levelId"
          @not-found="navigateTo({ path: '/levels' })"
        />

        <template #fallback> Loading levels... </template>
      </ClientOnly>
    </PrimeDialog>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';

const route = useRoute();
const levelId = computed(
  () => (route.params.levelId as string)?.trim().toUpperCase(),
);

const invalidLevelId = ref(false);
onBeforeMount(() => {
  if (!levelId.value.match(/^([0-9A-F]{4}-){3}[0-9A-F]{4}$/i)) {
    invalidLevelId.value = true;
    navigateTo({
      path: '/levels',
    });
  }
});
</script>
