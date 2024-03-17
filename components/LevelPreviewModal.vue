<template>
  <PrimeDialog
    class="w-screen lg:w-3/4"
    :header="`Preview for ${level.levelId}`"
    :draggable="false"
    modal
    maximizable
    visible
    :pt="{
      content: {
        class: 'flex flex-col',
      },
    }"
    @update:visible="$emit('close')"
  >
    <div class="mb-3">
      <LevelListItem
        :level="level"
        :translate-level-title="shouldShowTranslation(level)"
        :show-preview="false"
        :show-icons="false"
      />
    </div>

    <LevelPreview :level-id="level.levelId" @not-found="$emit('close')" />
  </PrimeDialog>
</template>

<script lang="ts" setup>
import type { ClearedLevel, UnclearedLevel } from '~/types/levels';

defineProps({
  level: {
    type: Object as PropType<UnclearedLevel | ClearedLevel>,
    required: true,
  },
});

defineEmits(['close']);

const { shouldShowTranslation } = useLevelBrowserSettings();
</script>
