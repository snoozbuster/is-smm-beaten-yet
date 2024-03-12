<template>
  <template v-if="clear">
    <h2>
      <span class="text-xl">
        The most recent
        <img
          class="inline"
          src="~/assets/img/first_clear.png"
          alt="First Clear"
          title="First Clear"
          width="40"
        />
        was:
      </span>
      <button
        class="text-2xl md:max-xl:text-xl mb-2 font-semibold text-balance"
        @click="viewing = clear"
      >
        {{ clear.title }}
      </button>
    </h2>
    <span>
      Achieved by
      <span class="font-semibold">
        {{ clear.firstClearerNnid }}
      </span>
      on <span class="font-semibold">{{ formatDate(clear.dateCleared) }}</span>
    </span>
    <template v-if="others.length">
      <h3 class="text-lg font-semibold">Other recent clears</h3>
      <div class="overflow-auto text-left">
        <div
          v-for="(level, i) in others"
          :key="level.levelId"
          class="mb-2 pb-2 border-b border-course-world-card-contrast mr-2"
          :class="i === 0 && 'border-t border-course-world-card-contrast pt-2'"
        >
          <LevelListItem
            :level="level"
            :show-preview="false"
            :show-icons="false"
          >
            <template #title="{ title }">
              <button class="text-left" @click="viewing = level">
                {{ title }}
                <Icon
                  class="align-middle ml-1 text-blue-600"
                  name="icon-park-outline:preview-open"
                />
              </button>
            </template>
          </LevelListItem>
        </div>
      </div>
    </template>
  </template>

  <PrimeDialog
    v-if="viewing"
    class="w-screen lg:w-3/4"
    :header="`Preview for ${viewing?.levelId}`"
    :visible="!!viewing"
    :draggable="false"
    modal
    maximizable
    :pt="{
      content: {
        class: 'flex flex-col',
      },
    }"
    @update:visible="(v) => !v && (viewing = undefined)"
  >
    <div class="mb-3">
      <LevelListItem
        :level="viewing"
        :translate-level-title="shouldShowTranslation(viewing)"
        :show-preview="false"
        :show-icons="false"
      />
    </div>

    <LevelPreview
      :level-id="viewing.levelId"
      @not-found="viewing = undefined"
    />
  </PrimeDialog>
</template>

<script setup lang="ts">
import type { ClearedLevel } from '~/types/levels';

const props = defineProps({
  clear: {
    type: Object as PropType<ClearedLevel>,
    default: null,
  },
  recentClears: {
    type: Object as PropType<ClearedLevel[]>,
    default: () => [],
  },
});

const others = computed(() =>
  props.recentClears
    .filter(({ levelId }) => levelId !== props.clear?.levelId)
    .reverse(),
);

const viewing = ref<ClearedLevel>();
const { shouldShowTranslation } = useLevelBrowserSettings();
const { formatDate } = useFormatters();
</script>
