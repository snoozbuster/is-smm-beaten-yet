<template>
  <div class="text-left h-full flex flex-col">
    <span class="text-xl mb-3 text-course-world-contrast">
      {{ formatNumber(levels.length) }} levels from
      {{ formatNumber(creators.length) }} creators
    </span>

    <div
      class="bg-course-world-card text-course-world-card-contrast rounded-lg h-full border shadow-xl"
    >
      <div v-if="!levels.length" class="p-3">Loading levels...</div>
      <div v-else>
        <span class="p-input-icon-left w-full p-2">
          <i class="pi pi-search" />
          <PrimeInputText
            v-model="globalFilter"
            placeholder="Search by level ID, title, creator, and more"
            size="small"
            :pt="{
              root: {
                class: 'w-full',
              },
            }"
          />
        </span>
      </div>
      <PrimeVirtualScroller :items="filteredLevels" :item-size="125">
        <template #item="{ item: data }">
          <div class="p-3 border-b border-collapse">
            <LevelListItem
              :level="data"
              :translate-level-title="shouldShowTranslation(data)"
            />
          </div>
        </template>
      </PrimeVirtualScroller>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLevelBrowserSettings from '~/composables/useLevelBrowserSettings';
import type { UnclearedLevel } from '~/types/levels';

const props = defineProps({
  levels: {
    type: Array as PropType<UnclearedLevel[]>,
    default: () => [],
  },
});

const { formatNumber } = useFormatters();
const { shouldShowTranslation } = useLevelBrowserSettings();

const globalFilter = ref('');

const filteredLevels = computed(() =>
  !unref(globalFilter)
    ? props.levels
    : props.levels.filter((level) => {
        return useSome(
          useCompact([
            level.levelId,
            level.title,
            level.titleTranslation,
            level.creator,
            level.countryCode,
            level.style,
            level.theme,
          ]),
          (searchText) => searchText.includes(unref(globalFilter)),
        );
      }),
);

// copied
const levelsByCreator = computed(() => useGroupBy(props.levels, 'creator'));
const creators = computed(() =>
  useOrderBy(
    useKeys(unref(levelsByCreator)).map((creator) => ({
      value: creator,
      countryCode: unref(levelsByCreator)[creator][0].countryCode,
      levelCount: unref(levelsByCreator)[creator].length,
    })),
    'levelCount',
    'desc',
  ),
);
</script>
