<template>
  <PrimeDataTable
    :key="keyHack"
    v-model:filters="filters"
    v-model:selection="selected"
    v-model:sort-order="sortOrder"
    v-model:sort-field="sortField"
    :value="preparedLevels"
    data-key="levelId"
    :row-class="getRowClass"
    scrollable
    scroll-height="flex"
    :virtual-scroller-options="{
      itemSize: 100,
    }"
    filter-display="row"
    :global-filter-fields="[
      'levelId',
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
    reorderable-columns
    @value-change="(v) => (currentTableView = v)"
    @column-reorder="handleColumnReorder"
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
          <i class="pi pi-search ml-2" />
          <PrimeInputText
            v-model="filters['global'].value"
            v-tooltip.bottom="
              `Search by level ID, title, creator, country code, style, or theme`
            "
            placeholder="Find any level..."
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
            ({{ formatPercent(numRows, props.levels.length, { precision: 1 }) }}
            of all levels)
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
            <template #end>
              <PrimeButton
                class="ml-2 mt-1"
                label="Reset column order"
                size="small"
                link
                @click="
                  () => {
                    levelBrowserSettings.columnOrder = [
                      ...DEFAULT_COLUMN_ORDER,
                    ];
                    columns = [...DEFAULT_COLUMN_ORDER];
                    // force re-render to reset table internal column order state
                    keyHack++;
                  }
                "
              />
            </template>
          </PrimeMenu>
        </div>
      </div>
    </template>

    <template v-for="column in columns">
      <PrimeColumn
        v-if="columnVisible(column)"
        :key="column"
        :field="column"
        :header="LEVEL_BROWSER_COLUMNS[column]"
        sortable
        v-bind="COLUMN_MAP[column].columnProps"
      >
        <template #body="{ data }">
          <Component :is="COLUMN_MAP[column].body" :data="data" />
        </template>
        <template #filter="props">
          <Component :is="COLUMN_MAP[column].filter" v-bind="props" />
        </template>
      </PrimeColumn>
    </template>

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
        class: isRandomizing && 'hidden',
      },
    }"
  >
    <template v-if="isRandomizing" #message>
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

<script setup lang="tsx">
import { FilterMatchMode, FilterService } from 'primevue/api';
import { DateTime } from 'luxon';
import { useToast } from 'primevue/usetoast';
import { Fragment } from 'vue/jsx-runtime';
import type { Component } from 'vue';
import type { UnclearedLevel } from '~/types/levels';
import { COUNTRIES } from '~/constants/levelData';
import useLevelBrowserSettings, {
  DEFAULT_COLUMN_ORDER,
  LEVEL_BROWSER_COLUMNS,
} from '~/composables/useLevelBrowserSettings';
import {
  PrimeTag,
  NuxtLink,
  PrimeButton,
  PrimeInputText,
  PrimeCalendar,
  PrimeInputNumber,
  Icon,
  CountryFlag,
  PrimeMultiSelect,
  PrimeTriStateCheckbox,
} from '#components';

const props = defineProps({
  levels: {
    type: Array as PropType<UnclearedLevel[]>,
    default: () => [],
  },
});

const keyHack = ref(0);
const sortField = ref('uploadDate');
const sortOrder = ref(1);
const currentTableView = ref<UnclearedLevel[]>([]);

watch(
  toRef(props, 'levels'),
  () => {
    currentTableView.value = props.levels;
  },
  { immediate: true },
);

const { formatDate, formatNumber, formatPercent } = useFormatters();

// #region settings and columns

const { levelBrowserSettings, shouldShowTranslation } =
  useLevelBrowserSettings();

function columnVisible(field: keyof typeof LEVEL_BROWSER_COLUMNS) {
  return unref(levelBrowserSettings).visibleColumns[field] !== false;
}

const columns = ref(
  unref(levelBrowserSettings).columnOrder ?? DEFAULT_COLUMN_ORDER,
);

function handleColumnReorder({
  dragIndex,
  dropIndex,
}: {
  dragIndex: number;
  dropIndex: number;
}) {
  const columnOrder = levelBrowserSettings.value.columnOrder;
  const visibleColumns = columnOrder.filter(columnVisible);
  const trueDragIndex = columnOrder.indexOf(visibleColumns[dragIndex]);
  const trueDropIndex = columnOrder.indexOf(visibleColumns[dropIndex]);
  levelBrowserSettings.value.columnOrder.splice(
    trueDropIndex,
    0,
    ...levelBrowserSettings.value.columnOrder.splice(trueDragIndex, 1),
  );
}

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
    items: useMap(LEVEL_BROWSER_COLUMNS, (title, field) => ({
      label: field === 'autoscroll' ? `${title} (All clear!)` : title,
      field,
      disabled: field === 'title',
    })),
  },
]);

function initColumns(reset = false) {
  if (!unref(levelBrowserSettings).visibleColumns) {
    levelBrowserSettings.value.visibleColumns = {} as any;
  }
  if (!unref(levelBrowserSettings).columnOrder) {
    levelBrowserSettings.value.columnOrder = [...DEFAULT_COLUMN_ORDER];
  }
  useForEach(LEVEL_BROWSER_COLUMNS, (_, field) => {
    if (!(field in levelBrowserSettings.value.visibleColumns) || reset) {
      levelBrowserSettings.value.visibleColumns[
        field as keyof typeof LEVEL_BROWSER_COLUMNS
      ] = true;
    }
  });
}

initColumns();

// #endregion

// #region template computed data

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

const numRows = computed(() => unref(currentTableView).length);

const numHiddenColumns = computed(
  () =>
    useFilter(
      LEVEL_BROWSER_COLUMNS,
      (_, field) => !columnVisible(field as keyof typeof LEVEL_BROWSER_COLUMNS),
    ).length,
);

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
      hasSubworld: Boolean(level.subworld),
      filterDate: new Date(
        DateTime.fromISO(level.uploadDate)
          .setZone(localZone, { keepLocalTime: true })
          .toString(),
      ),
    }),
  );
});

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

const datesWithLevels = computed(
  () => new Set(props.levels.map(({ uploadDate }) => uploadDate)),
);

// #endregion

// #region filters and filter options

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

function applyDisabledOptions<TOption extends { value: string | number }>(
  options: TOption[],
  levelProp: keyof UnclearedLevel,
) {
  return useOrderBy(
    options.map((o) => {
      const count = props.levels.filter((l) => l[levelProp] === o.value).length;
      return {
        ...o,
        disabled: !count,
        count,
      };
    }),
    'count',
    'desc',
  );
}

const countries = computed(() =>
  applyDisabledOptions(COUNTRIES, 'countryCode'),
);

const themes = computed(() =>
  applyDisabledOptions(
    [
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
    ],
    'theme',
  ),
);

const styles = computed(() =>
  applyDisabledOptions(
    [
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
      },
    ],
    'style',
  ),
);

const timerOptions = computed(() =>
  useOrderBy(
    applyDisabledOptions(
      useRange(10, 510, 10).map((timer) => ({
        value: timer,
      })),
      'timer',
    ),
    'value',
    'asc',
  ),
);

const checkpointsOptions = computed(() =>
  useOrderBy(
    applyDisabledOptions(
      [
        { label: 'No checkpoints', value: 0 },
        { label: '1 checkpoint', value: 1 },
        { label: '2 checkpoints', value: 2 },
      ],
      'checkpoints',
    ),
    'value',
    'asc',
  ),
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
    checkpoints: {
      value: null,
      matchMode: FilterMatchMode.IN,
    },
    hasSubworld: { value: null, matchMode: FilterMatchMode.EQUALS },
    autoscroll: { value: null, matchMode: FilterMatchMode.EQUALS },
  };
}

resetFilters();

// #endregion

// #region random level generation

const toast = useToast();
const selected = ref<UnclearedLevel>();
const isRandomizing = ref(false);
const randomProgress = ref<number>(0);

function getRowClass(level: UnclearedLevel) {
  if (level.levelId === selected.value?.levelId) {
    return 'p-highlight';
  }
}

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

// #endregion

// #region column rendering

type DataTableLevel = UnclearedLevel &
  ({ translated: true; originalTitle: string } | { translated: false }) & {
    hasSubworld: boolean;
  };

const { config } = usePrimeVue();
const LevelColumn = defineComponent({
  props: ['data'],
  setup(props: { data: DataTableLevel }) {
    return () => (
      <Fragment>
        {props.data.hacked ? (
          <PrimeTag
            v-tooltip="
            'This level\'s only clears are from known cheaters and still needs to be cleared legitimately'
          "
            class="cursor-default"
            severity="danger"
            icon="pi pi-danger"
            value="Hacked clear"
          />
        ) : undefined}
        <div class="mb-1">
          {props.data.translated ? (
            <span
              v-tooltip={`Translated from "${props.data.originalTitle}"`}
              class="border-dotted border-black border-b cursor-help"
            >
              {props.data.title}
            </span>
          ) : (
            <span>{props.data.title}</span>
          )}
        </div>
        <span class="text-sm text-gray-400 font-medium text-nowrap">
          {props.data.levelId}
        </span>
        <NuxtLink to={`/levels/${props.data.levelId}`}>
          <PrimeButton class="p-0 align-baseline ml-2" link size="small">
            Preview
          </PrimeButton>
        </NuxtLink>
      </Fragment>
    );
  },
});

function makeNumericCol(key: keyof DataTableLevel, ColIcon: Component) {
  return {
    columnProps: {
      dataType: 'numeric',
      style: 'min-width: 150px',
    },
    body: (props: { data: DataTableLevel }) =>
      Number.isFinite(props.data[key]) ? (
        <Fragment>
          <ColIcon />
          {formatNumber(props.data[key] as any)}
        </Fragment>
      ) : undefined,
    filter: (props) => (
      <PrimeInputNumber
        model-value={props.filterModel.value}
        class="p-column-filter"
        onInput={({ value }) => {
          props.filterModel.value = value;
          props.filterCallback();
        }}
      />
    ),
  };
}

function makeMultiselectOption(displayKey: string, OptionIcon?: Component) {
  return function ({ option }) {
    return (
      <Fragment>
        <div class="mr-3">
          {OptionIcon && <OptionIcon option={option} />}
          <span class="font-medium">{option[displayKey]}</span>
          {option.disabled ? (
            <div class="text-xs">All levels completed!</div>
          ) : undefined}
        </div>
        {option.count ? <span class="ml-auto">{option.count}</span> : undefined}
      </Fragment>
    );
  };
}

const COLUMN_MAP: Record<
  keyof typeof LEVEL_BROWSER_COLUMNS,
  { columnProps: object; body: Component; filter: Component }
> = {
  title: {
    columnProps: {
      frozen: true,
      style: 'min-width: 300px',
    },
    body: LevelColumn,
    filter: (props) => (
      <PrimeInputText
        v-model={props.filterModel.value}
        type="text"
        class="p-column-filter"
        placeholder="Search by name"
        onInput={props.filterCallback}
      />
    ),
  },
  uploadDate: {
    columnProps: {
      filterField: 'filterDate',
      class: 'text-nowrap',
      filterMatchModeOptions: [
        ...config.filterMatchModeOptions.date.map((key: string) => {
          return {
            // @ts-expect-error
            label: config.locale[key],
            value: key,
          };
        }),
        { label: 'By year', value: 'year' },
        { label: 'By month', value: 'month' },
      ],
      dataType: 'date',
      style: 'min-width: 200px',
    },
    body: (props: { data: DataTableLevel }) =>
      props.data.uploadDate ? formatDate(props.data.uploadDate) : '',
    filter: (props) => {
      const dateFormat =
        props.filterModel.matchMode === 'year'
          ? 'yy'
          : props.filterModel.matchMode === 'month'
            ? 'mm/yy'
            : 'mm/dd/yy';
      return (
        <PrimeCalendar
          key={props.filterModel.matchMode}
          v-model={props.filterModel.value}
          class="p-column-filter min-w-24"
          view={
            props.filterModel.matchMode === 'year'
              ? 'year'
              : props.filterModel.matchMode === 'month'
                ? 'month'
                : 'date'
          }
          date-format={dateFormat}
          placeholder={dateFormat}
          min-date={new Date('2016-06-01')}
          max-date={new Date('2021-04-01')}
          onDate-select={props.filterCallback}
        >
          {{
            date: ({ date }) =>
              date.selectable &&
              !unref(datesWithLevels).has(
                `${date.year}-${(date.month + 1)
                  .toString()
                  .padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`,
              ) ? (
                <strong class="line-through bg-green">{date.day}</strong>
              ) : (
                date.day
              ),
          }}
        </PrimeCalendar>
      );
    },
  },
  stars: makeNumericCol('stars', () => <span class="pi pi-star mr-1" />),
  players: makeNumericCol('players', () => <span class="pi pi-users mr-1" />),
  attempts: makeNumericCol('attempts', () => (
    <Icon class="-mt-1 mr-1" name="material-symbols:footprint" />
  )),
  creator: {
    columnProps: {
      showFilterMenu: false,
    },
    body: (props: { data: DataTableLevel }) => {
      const creatorLevels = unref(levelsByCreator)[props.data.creator];
      return (
        <Fragment>
          <span class="font-medium">{props.data.creator}</span>
          {!unref(filters).creator.value?.length &&
          creatorLevels?.length > 1 ? (
            <PrimeButton
              class="text-sm p-0 text-left"
              link
              label={`View ${formatNumber(
                creatorLevels.length - 1,
              )} other level${creatorLevels.length > 2 ? 's' : ''}`}
              onClick={() =>
                (filters.value.creator.value = [props.data.creator])
              }
            />
          ) : undefined}
        </Fragment>
      );
    },
    filter: (props) => {
      return (
        <PrimeMultiSelect
          v-model={props.filterModel.value}
          class="p-column-filter"
          options={unref(creators)}
          option-label="value"
          option-value="value"
          placeholder="Any"
          filter
          max-selected-labels={1}
          virtual-scroller-options={{
            itemSize: 56,
          }}
          show-toggle-all={false}
          pt={{ panel: { style: { width: '300px' } } }}
          onChange={props.filterCallback}
        >
          {{
            option({ option }) {
              return (
                <Fragment>
                  <span class="font-medium mr-auto">
                    {option.countryCode ? (
                      <CountryFlag
                        class="mr-2"
                        countryCode={option.countryCode}
                      />
                    ) : undefined}
                    {option.value}
                  </span>
                  {option.levelCount}
                </Fragment>
              );
            },
          }}
        </PrimeMultiSelect>
      );
    },
  },
  countryCode: {
    columnProps: {
      showFilterMenu: false,
    },
    body: (props: { data: DataTableLevel }) => (
      <Fragment>
        {props.data.countryCode ? (
          <CountryFlag class="mr-2" countryCode={props.data.countryCode} />
        ) : undefined}
        {props.data.countryCode}
      </Fragment>
    ),
    filter: (props) => (
      <PrimeMultiSelect
        v-model={props.filterModel.value}
        class="p-column-filter"
        options={unref(countries)}
        option-label="name"
        option-value="value"
        option-disabled="disabled"
        placeholder="Any"
        max-selected-labels={1}
        show-toggle-all={false}
        onChange={props.filterCallback}
      >
        {{
          option: makeMultiselectOption('name', ({ option }) => (
            <CountryFlag class="mr-2" countryCode={option.value} />
          )),
        }}
      </PrimeMultiSelect>
    ),
  },
  style: {
    columnProps: {
      class: 'text-nowrap',
      showFilterMenu: false,
    },
    body: (props: { data: DataTableLevel }) => (
      <Fragment>
        {props.data.style ? (
          <img
            class="inline mr-2"
            src={`/img/${props.data.style.toLowerCase()}.png`}
            width="16"
            height="16"
          />
        ) : undefined}
        {props.data.style}
      </Fragment>
    ),
    filter: (props) => (
      <PrimeMultiSelect
        v-model={props.filterModel.value}
        class="p-column-filter"
        options={unref(styles)}
        option-label="name"
        option-value="value"
        option-disabled="disabled"
        placeholder="Any"
        max-selected-labels={1}
        show-toggle-all={false}
        pt={{ wrapper: { style: { 'max-height': 'fit-content' } } }}
        onChange={props.filterCallback}
      >
        {{
          option: makeMultiselectOption('name', ({ option }) => (
            <img
              class="inline mr-2"
              src={`/img/${option.value.toLowerCase()}.png`}
              width="16"
              height="16"
            />
          )),
        }}
      </PrimeMultiSelect>
    ),
  },
  theme: {
    columnProps: {
      showFilterMenu: false,
    },
    body: (props: { data: DataTableLevel }) => (
      <Fragment>
        {props.data.theme ? (
          <img
            class="inline mr-2"
            src={`/img/themes/${props.data.theme
              .toLowerCase()
              .replace(' ', '_')}.png`}
            width="20"
            height="20"
          />
        ) : undefined}
        {props.data.theme}
      </Fragment>
    ),
    filter: (props) => (
      <PrimeMultiSelect
        v-model={props.filterModel.value}
        class="p-column-filter"
        options={unref(themes)}
        option-label="value"
        option-value="value"
        option-disabled="disabled"
        placeholder="Any"
        max-selected-labels={1}
        show-toggle-all={false}
        pt={{ wrapper: { style: { 'max-height': 'fit-content' } } }}
        onChange={props.filterCallback}
      >
        {{
          option: makeMultiselectOption('value', ({ option }) => (
            <img
              class="inline mr-2"
              src={`/img/themes/${option.value
                .toLowerCase()
                .replace(' ', '_')}.png`}
              width="20"
              height="20"
            />
          )),
        }}
      </PrimeMultiSelect>
    ),
  },
  timer: {
    columnProps: {
      showFilterMenu: false,
    },
    body: (props: { data: DataTableLevel }) => (
      <Fragment>
        <span class="pi pi-clock"></span> {props.data.timer}
      </Fragment>
    ),
    filter: (props) => (
      <PrimeMultiSelect
        v-model={props.filterModel.value}
        class="p-column-filter"
        options={unref(timerOptions)}
        option-label="value"
        option-value="value"
        option-disabled="disabled"
        placeholder="Any"
        max-selected-labels={1}
        show-toggle-all={false}
        onChange={props.filterCallback}
      >
        {{
          option: makeMultiselectOption('value', () => (
            <span class="pi pi-clock mr-1"></span>
          )),
        }}
      </PrimeMultiSelect>
    ),
  },
  checkpoints: {
    columnProps: {
      class: 'text-nowrap',
      showFilterMenu: false,
    },
    body: (props: { data: DataTableLevel }) => (
      <Fragment>
        <Icon class="mr-2" name="tdesign:flag" />
        {props.data.checkpoints}
      </Fragment>
    ),
    filter: (props) => (
      <PrimeMultiSelect
        v-model={props.filterModel.value}
        class="p-column-filter"
        options={unref(checkpointsOptions)}
        option-label="name"
        option-value="value"
        option-disabled="disabled"
        placeholder="Any"
        max-selected-labels={1}
        show-toggle-all={false}
        pt={{ wrapper: { style: { 'max-height': 'fit-content' } } }}
        onChange={props.filterCallback}
      >
        {{
          option: makeMultiselectOption('label', () => (
            <Icon class="mr-2" name="tdesign:flag" />
          )),
        }}
      </PrimeMultiSelect>
    ),
  },
  hasSubworld: {
    columnProps: {
      dataType: 'boolean',
      pt: {
        filterInput: {
          class: 'leading-[18px]',
        },
      },
      sortable: false,
    },
    body: (props: { data: DataTableLevel }) => (
      <i
        class={[
          'pi',
          {
            'pi-check-circle text-green-500': props.data.hasSubworld,
            'pi-times-circle text-red-400': !props.data.hasSubworld,
          },
        ]}
      ></i>
    ),
    filter: (props) => (
      <PrimeTriStateCheckbox
        v-model={props.filterModel.value}
        onChange={props.filterCallback}
      />
    ),
  },
  autoscroll: {
    columnProps: {
      dataType: 'boolean',
      pt: {
        filterInput: {
          class: 'leading-[18px]',
        },
      },
      sortable: false,
    },
    body: (props: { data: DataTableLevel }) => (
      <i
        class={[
          'pi',
          {
            'pi-check-circle text-green-500': props.data.autoscroll,
            'pi-times-circle text-red-400': !props.data.autoscroll,
          },
        ]}
      ></i>
    ),
    filter: (props) => (
      <PrimeTriStateCheckbox
        v-model={props.filterModel.value}
        onChange={props.filterCallback}
      />
    ),
  },
};

// #endregion
</script>
