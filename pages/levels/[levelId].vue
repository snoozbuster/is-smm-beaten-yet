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
      <div v-if="level" class="mb-3">
        <LevelListItem
          :level="level"
          :translate-level-title="shouldShowTranslation(level)"
          :show-preview="false"
          :show-icons="false"
        />
      </div>
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
import useLevelBrowserSettings from '~/composables/useLevelBrowserSettings';
import { DATA_ROOT_URL } from '~/constants/levelData';

const route = useRoute();
const levelId = computed(
  () => (route.params.levelId as string)?.trim().toUpperCase(),
);

const { level } = useUnclearedLevel(levelId);

const { shouldShowTranslation } = useLevelBrowserSettings();
const { formatDate } = useFormatters();

const levelName = computed(
  () =>
    level.value &&
    (shouldShowTranslation(level.value)
      ? level.value.titleTranslation
      : level.value.title),
);

const thumbnailUrl = computed(
  () => `${DATA_ROOT_URL}/course-data/${unref(levelId)}/thumbnail0.jpg`,
);

useSeoMeta({
  title: () =>
    `SMM1 Uncleared Level Browser - ${
      level.value ? levelName.value : 'Not Found (or already cleared)'
    }`,
  ogTitle: () =>
    `SMM1 Uncleared Level Browser - ${
      level.value ? levelName.value : 'Not Found (or already cleared)'
    }`,
  description: () =>
    !level.value
      ? undefined
      : `View course data for this ${
          level.value.style
        } level uploaded on ${formatDate(level.value.uploadDate)}`,
  ogDescription: () =>
    !level.value
      ? undefined
      : `View course data for this ${
          level.value.style
        } level uploaded on ${formatDate(level.value.uploadDate)}`,
  ogImage: {
    url: unref(thumbnailUrl),
    alt: `Level thumbnail for ${unref(levelId)}`,
    type: 'image/jpeg',
  },
  ogImageSecureUrl: () => unref(thumbnailUrl),
  twitterCard: 'summary_large_image',
});

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
