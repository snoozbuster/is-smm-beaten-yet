<template>
  <PrimeTag
    v-if="level.hacked"
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
    <div
      class="w-8/12 mr-2 flex flex-col justify-between"
      :class="!showPreview && 'max-w-[300px]'"
    >
      <div>
        <template v-if="showIcons">
          <button
            v-tooltip.focus.right="`This level uses the ${level.style} style`"
            class="mr-2 align-middle"
          >
            <img
              v-if="level.style"
              :src="styleImages[level.style.toLowerCase()]"
              :width="12"
              :height="12"
            />
          </button>
          <button
            v-tooltip.focus.right="
              `This level uses the ${level.theme.toLowerCase()} theme`
            "
            class="mr-3 align-middle"
          >
            <img
              :src="themeImages[level.theme.toLowerCase().replace(' ', '_')]"
              :width="16"
              :height="16"
            />
          </button>
        </template>

        <slot
          name="title"
          :title="level.title"
          :translation="level.titleTranslation"
        >
          <span
            v-if="translateLevelTitle"
            v-tooltip.focus="`Translated from &quot;${level.title}&quot;`"
            class="cursor-pointer text-left"
            tabindex="1"
          >
            <span class="border-dotted border-black border-b">
              {{ level.titleTranslation }}
            </span>
          </span>
          <span v-else>{{ level.title }}</span>
        </slot>
      </div>
      <div class="mb-1 font-medium">
        <CountryFlag
          v-if="level.countryCode"
          :country-code="level.countryCode"
        />
        {{ level.creator }}
      </div>
      <div v-if="showPreview">
        <NuxtLink
          class="text-sm text-gray-400 font-medium text-nowrap"
          :to="`/levels/${level.levelId}`"
        >
          {{ level.levelId }}
          <Icon
            class="align-middle ml-1 text-blue-600"
            name="icon-park-outline:preview-open"
          />
        </NuxtLink>
      </div>
    </div>

    <div class="ml-auto text-right">
      <template v-if="!('dateCleared' in level)">
        <div class="font-medium text-nowrap">
          <span class="hidden lg:inline">Uploaded on</span>
          {{ level.uploadDate ? formatDate(level.uploadDate, true) : '' }}
        </div>

        <div class="text-nowrap">
          <template v-if="Number.isFinite(level.stars)">
            <span class="pi pi-star"></span>
            {{ formatNumber(level.stars) }}
          </template>

          <span class="pi pi-clock ml-3"></span> {{ level.timer }}
          <button
            v-if="level.autoscroll"
            v-tooltip.left.focus="'Contains auto-scroll'"
            class="ml-2"
          >
            <span class="pi pi-forward"></span>
          </button>
        </div>

        <div>
          <button v-tooltip.focus.left="'Total attempts of this level'">
            <Icon class="-mt-1" name="material-symbols:footprint" />
            {{ formatNumber(level.attempts) }}
          </button>
          <button
            v-if="Number.isFinite(level.players)"
            v-tooltip.focus.left="
              'Number of players that have attempted this level'
            "
            class="ml-3"
          >
            <span class="pi pi-users"></span>
            {{ formatNumber(level.players) }}
          </button>
        </div>
      </template>
      <template v-else>
        <div class="font-medium text-nowrap">
          <span class="hidden lg:inline">Cleared on</span>
          {{ formatDate(level.dateCleared, true) }}
        </div>
        <div class="text-nowrap">
          Achieved by
          <span class="font-semibold">{{ level.firstClearerNnid }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ClearedLevel, UnclearedLevel } from '~/types/levels';

defineProps({
  level: {
    type: Object as PropType<UnclearedLevel | ClearedLevel>,
    required: true,
  },
  translateLevelTitle: {
    type: Boolean,
    default: false,
  },
  showPreview: {
    type: Boolean,
    default: true,
  },
  showIcons: {
    type: Boolean,
    default: true,
  },
});

const { formatDate, formatNumber } = useFormatters();
const { themeImages, styleImages } = useLevelAssets();
</script>
