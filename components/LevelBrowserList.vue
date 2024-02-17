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

      <PrimeVirtualScroller :items="levels" :item-size="125">
        <template #item="{ item: data }">
          <div class="p-3 border-b border-collapse">
            <PrimeTag
              v-if="data.hacked"
              v-tooltip.focus="
                'This level\'s only clears are from known cheaters and still needs to be cleared legitimately'
              "
              class="cursor-default mb-1"
              severity="danger"
              icon="pi pi-danger"
              value="Hacked clear"
              tabindex="1"
            />
            <div class="flex">
              <div class="w-8/12 mr-2">
                <div class="items-start">
                  <button
                    v-tooltip.focus.right="
                      `This level uses the ${data.style} style`
                    "
                    class="mr-2 align-middle"
                  >
                    <img
                      v-if="data.style"
                      :src="`/img/${data.style.toLowerCase()}.png`"
                      :width="12"
                      :height="12"
                    />
                  </button>
                  <button
                    v-tooltip.focus.right="
                      `This level uses the ${data.theme.toLowerCase()} theme`
                    "
                    class="mr-3 align-middle"
                  >
                    <img
                      :src="`/img/themes/${data.theme
                        .toLowerCase()
                        .replace(' ', '_')}.png`"
                      :width="16"
                      :height="16"
                    />
                  </button>

                  <span
                    v-if="shouldShowTranslation(data)"
                    v-tooltip.focus="
                      `Translated from &quot;${data.title}&quot;`
                    "
                    class="cursor-help text-left"
                    tabindex="1"
                  >
                    <span class="border-dotted border-black border-b">
                      {{ data.titleTranslation }}
                    </span>
                  </span>
                  <span v-else>{{ data.title }}</span>
                </div>
                <div class="mb-1 font-medium">
                  <CountryFlag :country-code="data.countryCode" />
                  {{ data.creator }}
                </div>
                <div>
                  <NuxtLink
                    class="text-sm text-gray-400 font-medium text-nowrap"
                    :to="`/levels/${data.levelId}`"
                  >
                    {{ data.levelId }}
                    <Icon
                      class="align-middle ml-1 text-blue-600"
                      name="icon-park-outline:preview-open"
                    />
                  </NuxtLink>
                </div>
              </div>

              <div class="ml-auto text-right">
                <div class="font-medium text-nowrap">
                  {{ data.uploadDate ? formatDate(data.uploadDate, true) : '' }}
                </div>
                <div class="text-nowrap">
                  <template v-if="Number.isFinite(data.stars)">
                    <span class="pi pi-star"></span>
                    {{ formatNumber(data.stars) }}
                  </template>

                  <span class="pi pi-clock ml-3"></span> {{ data.timer }}
                  <button
                    v-if="data.autoscroll"
                    v-tooltip.left.focus="'Contains auto-scroll'"
                    class="ml-2"
                  >
                    <span class="pi pi-forward"></span>
                  </button>
                </div>
                <div>
                  <button v-tooltip.focus.left="'Total attempts of this level'">
                    <Icon class="-mt-1" name="material-symbols:footprint" />
                    {{ formatNumber(data.attempts) }}
                  </button>
                  <button
                    v-if="Number.isFinite(data.players)"
                    v-tooltip.focus.left="
                      'Number of players that have attempted this level'
                    "
                    class="ml-3"
                  >
                    <span class="pi pi-users"></span>
                    {{ formatNumber(data.players) }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </PrimeVirtualScroller>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UnclearedLevel } from '~/types/levels';

const props = defineProps({
  levels: {
    type: Array as PropType<UnclearedLevel[]>,
    default: () => [],
  },
});

const { formatNumber, formatDate } = useFormatters();

// copied
function shouldShowTranslation(level: UnclearedLevel) {
  return (
    (level.countryCode === 'JP' || level.hacked) &&
    level.titleTranslation &&
    level.title.localeCompare(level.titleTranslation, 'en', {
      sensitivity: 'accent',
    })
  );
}

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
