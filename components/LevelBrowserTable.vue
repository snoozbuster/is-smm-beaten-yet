<template>
  <PrimeDataTable
    v-model:filters="filters"
    v-model:selection="selected"
    :value="preparedLevels"
    data-key="levelId"
    sort-field="uploadDate"
    selection-mode="single"
    :row-class="getRowClass"
    :sort-order="1"
    scrollable
    scroll-height="flex"
    :virtual-scroller-options="{
      itemSize: 100,
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
      bodyRow: {
        style: {
          height: '100px',
        },
      },
      virtualScroller: {
        root: {
          class: 'table-scroller-root min-h-full',
        },
      },
    }"
    row-hover
    @value-change="(v) => (currentTableView = v)"
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
        <PrimeButton
          type="button"
          icon="pi pi-question"
          label="Random level"
          outlined
          size="small"
          :disabled="isRandomizing || currentTableView.length < 2"
          @click="selectRandomLevel()"
        />
        <span class="text-xl self-center ml-5">
          {{ formatNumber(numRows) }} levels
          <span
            v-show="props.levels.length && numRows !== props.levels.length"
            class="font-normal"
          >
            ({{ formatPercent(numRows, props.levels.length, 1) }} of all levels)
          </span>
        </span>

        <div class="ml-auto">
          <span v-if="numHiddenColumns" class="mr-3">
            {{ formatNumber(numHiddenColumns) }}
            {{ numHiddenColumns === 1 ? 'column' : 'columns' }} hidden
          </span>

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
            <template #submenuheader="{ item }">
              <div class="flex items-center">
                {{ item.label }}

                <PrimeButton
                  v-if="numHiddenColumns"
                  class="ml-auto"
                  link
                  size="small"
                  label="Show all"
                  @click.stop="initColumns(true)"
                />
              </div>
            </template>
            <template #item="{ item, props: { action } }">
              <label v-if="item.prop" v-bind="action" @click.stop>
                <PrimeInputSwitch
                  v-model="
                    // @ts-expect-error
                    levelBrowserSettings[item.prop]
                  "
                  class="mr-3"
                />
                {{ item.label }}
              </label>
              <label v-else v-bind="action" @click.stop>
                <PrimeCheckbox
                  v-model="
                    // @ts-expect-error
                    levelBrowserSettings.visibleColumns[item.field]
                  "
                  class="mr-3"
                  binary
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
      frozen
      style="min-width: 300px"
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
      v-if="columnVisible('uploadDate')"
      field="uploadDate"
      filter-field="filterDate"
      class="text-nowrap"
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
        >
          <template #date="{ date }">
            <strong
              v-if="
                date.selectable &&
                !datesWithLevels.has(
                  `${date.year}-${(date.month + 1)
                    .toString()
                    .padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`,
                )
              "
              class="line-through bg-green"
              >{{ date.day }}</strong
            >
            <template v-else>{{ date.day }}</template>
          </template>
        </PrimeCalendar>
      </template>
    </PrimeColumn>
    <PrimeColumn
      v-if="columnVisible('stars')"
      field="stars"
      header="Stars"
      data-type="numeric"
      sortable
      style="min-width: 150px"
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
      v-if="columnVisible('players')"
      field="players"
      header="Players"
      data-type="numeric"
      sortable
      style="min-width: 150px"
    >
      <template #body="{ data }">
        {{ data.players ? formatNumber(data.players) : data.players ?? '' }}
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
      v-if="columnVisible('attempts')"
      field="attempts"
      header="Attempts"
      data-type="numeric"
      sortable
      style="min-width: 150px"
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
      v-if="columnVisible('creator')"
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
      v-if="columnVisible('countryCode')"
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
      v-if="columnVisible('style')"
      field="style"
      header="Style"
      class="text-nowrap"
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
      v-if="columnVisible('theme')"
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
      v-if="columnVisible('timer')"
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
      v-if="columnVisible('autoscroll')"
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
  <PrimeToast
    position="bottom-center"
    :pt="{
      buttonContainer: {
        class: 'hidden',
      },
    }"
  >
    <template #message>
      <div>
        {{ randomProgress < 100 ? 'Picking a random level...' : 'Done!' }}
        <PrimeProgressBar
          v-if="randomProgress < 100"
          :value="randomProgress"
          :show-value="false"
        />
      </div>
    </template>
  </PrimeToast>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterService } from 'primevue/api';
import { useStorage } from '@vueuse/core';
import { DateTime } from 'luxon';
import { useToast } from 'primevue/usetoast';
import type { UnclearedLevel } from '~/types/levels';
import { COUNTRIES } from '~/constants/levelData';

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

const columns = {
  title: 'Level name',
  uploadDate: 'Upload date',
  stars: 'Stars',
  players: 'Players',
  attempts: 'Attempts',
  creator: 'Creator',
  countryCode: 'Country',
  style: 'Style',
  theme: 'Theme',
  timer: 'Timer',
  autoscroll: 'Autoscroll',
};

const levelBrowserSettings = useStorage('levelBrowser', {
  includeHackedClears: true,
  enableTranslation: true,
  disableRouletteAnimation: false,
  visibleColumns: useMapValues(columns, () => true),
});

function initColumns(reset = false) {
  if (!unref(levelBrowserSettings).visibleColumns) {
    levelBrowserSettings.value.visibleColumns = {} as any;
  }
  useForEach(columns, (_, field) => {
    if (!(field in levelBrowserSettings.value.visibleColumns) || reset) {
      levelBrowserSettings.value.visibleColumns[field as keyof typeof columns] =
        true;
    }
  });
}

function columnVisible(field: keyof typeof columns) {
  return unref(levelBrowserSettings).visibleColumns[field] !== false;
}

initColumns();

const numHiddenColumns = computed(
  () =>
    useFilter(
      columns,
      (_, field) => !columnVisible(field as keyof typeof columns),
    ).length,
);

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
  {
    label: 'Fast random levels',
    prop: 'disableRouletteAnimation',
  },
  {
    label: 'Columns',
    items: useMap(columns, (title, field) => ({
      label: title,
      field,
      disabled: field === 'title',
    })),
  },
]);

const currentTableView = ref<UnclearedLevel[]>([]);
const numRows = computed(() => unref(currentTableView).length);

watch(
  toRef(props, 'levels'),
  () => {
    currentTableView.value = props.levels;
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

const preparedLevels = computed(() => {
  // all my homies hate JS dates
  const localZone = DateTime.local().zone;
  return translateLevels(
    unref(levelBrowserSettings).includeHackedClears
      ? props.levels
      : props.levels.filter(({ hacked }) => !hacked),
  ).map((level) =>
    markRaw({
      ...level,
      filterDate: new Date(
        DateTime.fromISO(level.uploadDate)
          .setZone(localZone, { keepLocalTime: true })
          .toString(),
      ),
    }),
  );
});

const { formatDate, formatNumber, formatPercent } = useFormatters();

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

const countries = COUNTRIES;

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

const datesWithLevels = computed(
  () => new Set(props.levels.map(({ uploadDate }) => uploadDate)),
);

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

const toast = useToast();
const selected = ref<UnclearedLevel>();
const isRandomizing = ref(false);
const randomProgress = ref<number>(0);

function selectRandomLevel() {
  let lastIndex: number = selected.value
    ? // start with current selection index to avoid selecting the same value
      // that's already selected
      currentTableView.value.indexOf(selected.value)
    : -1;

  const isSmallSelection = () => unref(currentTableView).length <= 10;
  const getRandomIndex = () => {
    let newIndex: number;
    do {
      newIndex = useRandom(0, unref(currentTableView).length - 1);
    } while (unref(currentTableView).length > 1 && lastIndex === newIndex);
    return newIndex;
  };

  const finalIndex = getRandomIndex();
  const numRandomChoices = unref(levelBrowserSettings).disableRouletteAnimation
    ? 0
    : useRandom(22, 26);

  if (isSmallSelection()) {
    // work backwards to generate starting index based on number of roulette
    // iterations. there must be a way to do this in a single expression but I
    // couldn't figure it out :(
    const startingIndex =
      finalIndex - (numRandomChoices % unref(currentTableView).length) - 1;
    lastIndex =
      startingIndex < 0
        ? startingIndex + unref(currentTableView).length
        : startingIndex;
  }
  let remainingChoices = numRandomChoices;

  selected.value = undefined;
  isRandomizing.value = true;
  if (!unref(levelBrowserSettings).disableRouletteAnimation) {
    toast.add({ severity: 'success' }); // show progress toast
  }

  let timer = 0;
  let timerVelocity = 5;
  const timerAcceleration = 3;

  // define and invoke recursive function
  return (function highlightRandomLevel() {
    let index: number;

    // for small sets, it's more aesthetic to have the roulette wheel forwards
    // through the rows, wrapping around at the end. for larger sets that's impractical,
    // so we just flip through random indicies during the animation
    if (remainingChoices === 0) {
      index = finalIndex;
    } else if (isSmallSelection()) {
      index = (lastIndex + 1) % unref(currentTableView).length;
    } else {
      index = getRandomIndex();
    }

    lastIndex = index;
    selected.value = unref(currentTableView)[index];

    const tableScrollRoot = document.getElementsByClassName(
      'table-scroller-root',
    )[0];

    const viewportHeight =
      tableScrollRoot.clientHeight - /* height of header area */ 108;
    const randOffsetFactor = useRandom(-viewportHeight + 100, 0); // choose a random section of the viewport for the level to appear in
    const scrollPos = Math.min(
      Math.max(0, index * 100 + randOffsetFactor),
      unref(currentTableView).length * 100,
    );
    tableScrollRoot.scroll({
      top: scrollPos,
      behavior: 'instant',
    });

    if (remainingChoices > 0) {
      // slow down timer and reset
      timer += timerVelocity;
      timerVelocity += timerAcceleration;
      randomProgress.value =
        ((numRandomChoices - remainingChoices) / numRandomChoices) * 100;
      remainingChoices--;

      setTimeout(highlightRandomLevel, timer);
    } else {
      randomProgress.value = 100;
      setTimeout(
        () => {
          toast.removeAllGroups();
          isRandomizing.value = false;
        },
        unref(levelBrowserSettings).disableRouletteAnimation ? 0 : 2500,
      );
    }
  })();
}

function getRowClass(level: UnclearedLevel) {
  if (level.levelId === selected.value?.levelId) {
    return 'p-highlight';
  }
}
</script>
