<template>
  <PrimeDataTable
    v-model:filters="filters"
    :value="preparedLevels"
    data-key="levelId"
    sort-field="uploadDate"
    :sort-order="1"
    scrollable
    scroll-height="flex"
    :virtual-scroller-options="{
      itemSize: 104,
    }"
    filter-display="row"
    :global-filter-fields="[
      'title',
      'titleTranslation',
      'creator',
      'country',
      'style',
      'theme',
    ]"
    :pt="{
      table: {
        class: 'border-separate',
      },
      header: {
        class: 'bg-inherit pt-0 px-0',
      },
      virtualScroller: {
        root: {
          class: 'min-h-full',
        },
      },
    }"
    row-hover
    @filter="({ filteredValue }) => (numRows = filteredValue.length)"
  >
    <template #header>
      <div class="flex gap-4">
        <PrimeButton
          type="button"
          icon="pi pi-filter-slash"
          label="Reset filters"
          outlined
          size="small"
          @click="resetFilters()"
        />
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <PrimeInputText
            v-model="filters['global'].value"
            placeholder="Keyword search"
            size="small"
          />
        </span>
        <span class="text-xl self-center ml-5">
          {{ formatNumber(numRows) }} levels
          <span
            v-show="props.levels.length && numRows !== props.levels.length"
            class="font-normal"
          >
            ({{ formatPercent(numRows, props.levels.length) }} of all levels)
          </span>
        </span>

        <div class="ml-auto">
          <PrimeButton
            type="button"
            icon="pi pi-cog"
            aria-haspopup="true"
            aria-controls="table-settings"
            severity="secondary"
            size="small"
            @click="toggle"
          />
          <PrimeMenu
            id="table-settings"
            ref="menu"
            :model="settingsMenuItems"
            popup
          >
            <template #item="{ item, props: { action } }">
              <label v-bind="action" @click.stop>
                <PrimeInputSwitch
                  v-model="
                    // @ts-expect-error
                    levelBrowserSettings[item.prop]
                  "
                  class="mr-3"
                />
                {{ item.label }}
              </label>
            </template>
          </PrimeMenu>
        </div>
      </div>
    </template>

    <PrimeColumn
      field="title"
      header="Level name"
      sortable
      style="min-width: 250px"
    >
      <template #body="{ data }">
        <PrimeTag
          v-if="data.hacked"
          v-tooltip="
            'This level\'s only clears are from known cheaters and still needs to be cleared legitimately'
          "
          class="cursor-default"
          severity="danger"
          icon="pi pi-danger"
          value="Hacked clear"
        />
        <div class="mb-1">
          <span
            v-if="data.translated"
            v-tooltip="`Translated from &quot;${data.originalTitle}&quot;`"
            class="border-dotted border-black border-b cursor-help"
          >
            {{ data.title }}
          </span>
          <span v-else>{{ data.title }}</span>
        </div>
        <div class="text-sm text-gray-400 font-medium text-nowrap">
          {{ data.levelId }}
        </div>
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <PrimeInputText
          v-model="filterModel.value"
          type="text"
          class="p-column-filter"
          placeholder="Search by name"
          @input="filterCallback()"
        />
      </template>
    </PrimeColumn>
    <PrimeColumn
      class="text-nowrap"
      field="uploadDate"
      filter-field="filterDate"
      :filter-match-mode-options="[
        ...$primevue.config.filterMatchModeOptions.date.map((key: string) => {
          return {
            // @ts-expect-error
            label: $primevue.config.locale[key],
            value: key,
          };
        }),
        { label: 'By year', value: 'year' },
        { label: 'By month', value: 'month' },
      ]"
      header="Upload date"
      data-type="date"
      sortable
      style="min-width: 200px"
    >
      <template #body="{ data }">
        {{ data.uploadDate ? formatDate(data.uploadDate) : '' }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <PrimeCalendar
          :key="filterModel.matchMode"
          v-model="filterModel.value"
          class="p-column-filter min-w-24"
          :view="
            filterModel.matchMode === 'year'
              ? 'year'
              : filterModel.matchMode === 'month'
                ? 'month'
                : 'date'
          "
          :date-format="
            filterModel.matchMode === 'year'
              ? 'yy'
              : filterModel.matchMode === 'month'
                ? 'mm/yy'
                : 'mm/dd/yy'
          "
          :placeholder="
            filterModel.matchMode === 'year'
              ? 'yy'
              : filterModel.matchMode === 'month'
                ? 'mm/yy'
                : 'mm/dd/yyyy'
          "
          :min-date="new Date('2016-06-01')"
          :max-date="new Date('2021-04-01')"
          @date-select="filterCallback()"
        />
      </template>
    </PrimeColumn>
    <PrimeColumn
      field="stars"
      header="Stars"
      data-type="numeric"
      sortable
      style="min-width: 100px"
    >
      <template #body="{ data }">
        {{ data.stars ? formatNumber(data.stars) : data.stars ?? '' }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <PrimeInputNumber
          :model-value="filterModel.value"
          class="p-column-filter"
          @input="
            ({ value }) => {
              filterModel.value = value;
              filterCallback();
            }
          "
        />
      </template>
    </PrimeColumn>
    <PrimeColumn
      field="players"
      header="Players"
      data-type="numeric"
      sortable
      style="min-width: 100px"
    >
      <template #body="{ data }">
        {{ data.stars ? formatNumber(data.players) : data.players ?? '' }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <PrimeInputNumber
          :model-value="filterModel.value"
          class="p-column-filter"
          @input="
            ({ value }) => {
              filterModel.value = value;
              filterCallback();
            }
          "
        />
      </template>
    </PrimeColumn>
    <PrimeColumn
      field="attempts"
      header="Attempts"
      data-type="numeric"
      sortable
      style="min-width: 100px"
    >
      <template #body="{ data }">
        {{ data.attempts ? formatNumber(data.attempts) : data.attempts ?? '' }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <PrimeInputNumber
          :model-value="filterModel.value"
          class="p-column-filter"
          @input="
            ({ value }) => {
              filterModel.value = value;
              filterCallback();
            }
          "
        />
      </template>
    </PrimeColumn>
    <PrimeColumn
      field="creator"
      header="Creator"
      sortable
      :show-filter-menu="false"
    >
      <template #body="{ data }">
        <span class="font-medium">
          {{ data.creator }}
        </span>
        <PrimeButton
          v-if="
            !filters.creator.value?.length &&
            levelsByCreator[data.creator]?.length > 1
          "
          class="text-sm p-0 text-left"
          link
          :label="`View ${formatNumber(
            levelsByCreator[data.creator].length - 1,
          )} other level${levelsByCreator[data.creator].length > 2 ? 's' : ''}`"
          @click="filters.creator.value = [data.creator]"
        />
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <PrimeMultiSelect
          v-model="filterModel.value"
          :options="creators"
          option-label="value"
          option-value="value"
          placeholder="Any"
          filter
          :max-selected-labels="1"
          :virtual-scroller-options="{
            itemSize: 56,
          }"
          :show-toggle-all="false"
          :pt="{ panel: { style: { width: '300px' } } }"
          class="p-column-filter"
          @change="filterCallback()"
        >
          <template #option="{ option }">
            <span class="font-medium mr-auto">
              <CountryFlag
                v-if="option.countryCode"
                :country-code="option.countryCode"
              />
              {{ option.value }}</span
            >
            {{ option.levelCount }}
          </template>
        </PrimeMultiSelect>
      </template>
    </PrimeColumn>
    <PrimeColumn
      field="countryCode"
      header="Country"
      :show-filter-menu="false"
      sortable
    >
      <template #body="{ data }">
        <CountryFlag v-if="data.countryCode" :country-code="data.countryCode" />
        {{ data.countryCode }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <PrimeMultiSelect
          v-model="filterModel.value"
          :options="countries"
          option-label="name"
          option-value="value"
          placeholder="Any"
          class="p-column-filter"
          :max-selected-labels="1"
          :show-toggle-all="false"
          @change="filterCallback()"
        >
          <template #option="{ option }">
            <CountryFlag class="pr-1" :country-code="option.value" />
            <div>{{ option.name }}</div>
          </template>
        </PrimeMultiSelect>
      </template>
    </PrimeColumn>
    <PrimeColumn
      class="text-nowrap"
      field="style"
      header="Style"
      :show-filter-menu="false"
      sortable
    >
      <template #body="{ data }">
        <img
          v-if="data.style"
          class="inline"
          :src="`/img/${data.style.toLowerCase()}.png`"
          :width="16"
          :height="16"
        />
        {{ data.style }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <PrimeMultiSelect
          v-model="filterModel.value"
          :options="styles"
          option-label="name"
          option-value="value"
          placeholder="Any"
          class="p-column-filter"
          option-disabled="disabled"
          :max-selected-labels="1"
          :show-toggle-all="false"
          :pt="{ wrapper: { style: { 'max-height': 'fit-content' } } }"
          @change="filterCallback()"
        >
          <template #option="{ option }">
            <img
              class="inline mr-1"
              :src="`/img/${option.value.toLowerCase()}.png`"
              :width="16"
              :height="16"
            />
            <div>
              {{ option.name }}
              <div v-if="option.disabled" class="text-xs">
                All levels completed!
              </div>
            </div>
          </template>
        </PrimeMultiSelect>
      </template>
    </PrimeColumn>
    <PrimeColumn
      field="theme"
      header="Theme"
      :show-filter-menu="false"
      sortable
    >
      <template #body="{ data }">
        <img
          v-if="data.theme"
          class="inline"
          :src="`/img/themes/${data.theme.toLowerCase().replace(' ', '_')}.png`"
          :width="20"
          :height="20"
        />
        {{ data.theme }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <PrimeMultiSelect
          v-model="filterModel.value"
          :options="themes"
          option-label="value"
          option-value="value"
          placeholder="Any"
          class="p-column-filter"
          :max-selected-labels="1"
          :show-toggle-all="false"
          :pt="{ wrapper: { style: { 'max-height': 'fit-content' } } }"
          @change="filterCallback()"
        >
          <template #option="{ option }">
            <img
              class="inline mr-1"
              :src="`/img/themes/${option.value
                .toLowerCase()
                .replace(' ', '_')}.png`"
              :width="16"
              :height="16"
            />
            <div>{{ option.value }}</div>
          </template>
        </PrimeMultiSelect>
      </template>
    </PrimeColumn>
    <PrimeColumn
      field="timer"
      header="Timer"
      :show-filter-menu="false"
      sortable
    >
      <template #filter="{ filterModel, filterCallback }">
        <PrimeMultiSelect
          v-model="filterModel.value"
          :options="timerOptions"
          option-label="value"
          option-value="value"
          placeholder="Any"
          class="p-column-filter"
          :max-selected-labels="1"
          :show-toggle-all="false"
          @change="filterCallback()"
        />
      </template>
    </PrimeColumn>
    <PrimeColumn
      field="autoscroll"
      header="Autoscroll"
      data-type="boolean"
      :pt="{
        filterInput: {
          class: 'leading-[18px]',
        },
      }"
    >
      <template #body="{ data }">
        <i
          class="pi"
          :class="{
            'pi-check-circle text-green-500': data.autoscroll,
            'pi-times-circle text-red-400': !data.autoscroll,
          }"
        ></i>
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <PrimeTriStateCheckbox
          v-model="filterModel.value"
          @change="filterCallback()"
        />
      </template>
    </PrimeColumn>

    <template #empty>
      <div class="text-center">
        <span v-if="!props.levels.length">
          <PrimeSkeleton
            v-for="i in 10"
            :key="i"
            class="mb-2"
            width="100%"
            height="73px"
          />
        </span>
        <template v-else>
          <span class="mr-2"> No levels match current filters. </span>
          <PrimeButton
            class="align-baseline"
            type="button"
            icon="pi pi-filter-slash"
            label="Reset filters"
            size="small"
            outlined
            @click="resetFilters()"
          />
        </template>
      </div>
    </template>
  </PrimeDataTable>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';
import { FilterMatchMode, FilterService } from 'primevue/api';
import { useStorage } from '@vueuse/core';
import type { UnclearedLevel } from '~/types/levels';

const props = defineProps({
  levels: {
    type: Array as PropType<UnclearedLevel[]>,
    default: () => [],
  },
});

// @ts-expect-error
FilterService.filters.year = (value: Date, filter: Date) => {
  return value.getFullYear() === filter.getFullYear();
};
// @ts-expect-error
FilterService.filters.month = (value: Date, filter: Date) => {
  return (
    value.getFullYear() === filter.getFullYear() &&
    value.getMonth() === filter.getMonth()
  );
};

const levelBrowserSettings = useStorage('levelBrowser', {
  includeHackedClears: true,
  enableTranslation: true,
});

const menu = ref();
const toggle = (event: MouseEvent) => {
  menu.value.toggle(event);
};
const settingsMenuItems = computed(() => [
  {
    label: 'Show hacked clears',
    prop: 'includeHackedClears',
  },
  {
    label: 'Translate level titles',
    prop: 'enableTranslation',
  },
]);

const numRows = ref(0);

watch(
  toRef(props, 'levels'),
  () => {
    numRows.value = props.levels.length;
  },
  { immediate: true },
);

function translateLevels(levels: UnclearedLevel[]) {
  if (!unref(levelBrowserSettings).enableTranslation) {
    return levels;
  }

  return levels.map((level) => {
    if (!shouldShowTranslation(level)) {
      return level;
    }

    return markRaw({
      ...level,
      title: level.titleTranslation,
      originalTitle: level.title,
      translated: true,
    });
  });
}

const preparedLevels = computed(() =>
  translateLevels(
    unref(levelBrowserSettings).includeHackedClears
      ? props.levels
      : props.levels.filter(({ hacked }) => !hacked),
  ).map((level) =>
    markRaw({ ...level, filterDate: new Date(level.uploadDate) }),
  ),
);

const formatDate = (d: string) => DateTime.fromISO(d).toFormat('DDD');

const formatter = new Intl.NumberFormat();
const formatNumber = (n: number) => formatter.format(n);

const formatPercent = (numerator: number, denominator: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(numerator / denominator);

const styles = [
  {
    value: 'SMB1',
    name: 'Super Mario Bros.',
  },
  {
    value: 'SMW',
    name: 'Super Mario World',
  },
  {
    value: 'NSMBU',
    name: 'New Super Mario Bros. U',
  },
  {
    value: 'SMB3',
    name: 'Super Mario Bros. 3',
    disabled: true,
  },
];

const themes = [
  {
    value: 'Castle',
  },
  {
    value: 'Ground',
  },
  {
    value: 'Underground',
  },
  {
    value: 'Ghost House',
  },
  {
    value: 'Airship',
  },
  {
    value: 'Underwater',
  },
];

const countries = [
  { value: 'JP', name: 'Japan' },
  { value: 'US', name: 'United States' },
  { value: 'NL', name: 'Netherlands' },
  { value: 'SE', name: 'Sweden' },
  { value: 'DE', name: 'Germany' },
  { value: 'FR', name: 'France' },
  { value: 'ES', name: 'Spain' },
  { value: 'GB', name: 'Great Britain' },
  { value: 'NO', name: 'Norway' },
  { value: 'MX', name: 'Mexico' },
  { value: 'CA', name: 'Canada' },
  { value: 'AU', name: 'Australia' },
  { value: 'AT', name: 'Austria' },
  { value: 'NZ', name: 'New Zealand' },
];

const levelsByCreator = computed(() => useGroupBy(props.levels, 'creator'));

const timerOptions = computed(() =>
  useOrderBy(
    useUniq(props.levels.map(({ timer }) => timer)),
    useIdentity,
    'asc',
  ).map((timer) => ({ value: timer })),
);

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

function shouldShowTranslation(level: UnclearedLevel) {
  return (
    unref(levelBrowserSettings).enableTranslation &&
    (level.countryCode === 'JP' || level.hacked) &&
    level.titleTranslation &&
    level.title.localeCompare(level.titleTranslation, 'en', {
      sensitivity: 'accent',
    })
  );
}

const filters = ref();
function resetFilters() {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    filterDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
    stars: { value: null, matchMode: FilterMatchMode.EQUALS },
    players: { value: null, matchMode: FilterMatchMode.EQUALS },
    attempts: { value: null, matchMode: FilterMatchMode.EQUALS },
    creator: { value: null, matchMode: FilterMatchMode.IN },
    countryCode: {
      value: null,
      matchMode: FilterMatchMode.IN,
    },
    theme: {
      value: null,
      matchMode: FilterMatchMode.IN,
    },
    style: {
      value: null,
      matchMode: FilterMatchMode.IN,
    },
    timer: {
      value: null,
      matchMode: FilterMatchMode.IN,
    },
    autoscroll: { value: null, matchMode: FilterMatchMode.EQUALS },
  };
}

resetFilters();
</script>
