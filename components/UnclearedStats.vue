<template>
  <div class="bg-course-world text-course-world-contrast">
    <div
      class="grid p-7 grid-flow-row grid-rows-1 grid-cols-1 md:grid-rows-3 md:grid-cols-2 xl:grid-rows-2 xl:grid-cols-3 w-full h-full gap-7 overflow-hidden"
      :class="!visible && !animationStarted && 'invisible'"
    >
      <template v-if="animationStarted">
        <div class="stat-section min-h-[20vh]">
          <PercentClear
            :uncleared-levels="uncleared.length"
            :cleared-levels="clearSummary.clearedTotal ?? 0"
          />
        </div>
        <StatSection class="md:grid-rows-[1fr_2fr_1fr] reduced-size">
          <p class="self-end mb-6 md:mb-1 text-pretty md:max-xl:hidden">
            On {{ formatDate('2021-03-31') }}, level uploads in Super Mario
            Maker 1 were disabled, making it finally possible to "beat" the game
            by clearing every level. Now, there is only <strong>1</strong> level
            remaining, and we have
          </p>
          <div class="self-center">
            <CountdownClock class="mb-3" />
            <span>
              to clear it before the servers shut down for good on
              {{ formatDate(SHUTDOWN_DATE) }}.
            </span>
            <div class="mt-3">
              <PrimeButton
                label="View the final level"
                class="text-smm uppercase py-2"
                severity="warning"
                @click="showLevel = true"
              />
              <LevelPreviewModal
                v-if="showLevel"
                :level="uncleared[0]"
                @close="showLevel = false"
              />
            </div>
            <a
              class="hover:underline block my-2 text-sm"
              href="https://youtu.be/KmikpEVCuZE?si=uNbXhV1QplXVJVh5"
              target="_blank"
              >What makes this level so hard?
              <i class="pi pi-angle-right -ml-1 text-sm"></i
            ></a>
          </div>
          <div class="self-end">
            <h4 class="text-xl font-semibold mb-1">Join us today!</h4>
            <p class="mb-2 block md:max-xl:hidden text-balance hidden-short">
              Come help cheer us on as our team heads to the garden to take on
              their final challenge: Trimming the Herbs!
            </p>
            <SocialLinks />
          </div>

          <div class="md:hidden">
            <h3 class="text-2xl font-semibold mt-7">More stats</h3>
          </div>
        </StatSection>
        <StatSection card>
          <MostRecentClear
            :clear="clearSummary.mostRecentClear"
            :recent-clears="clearSummary.lastClears"
          />
        </StatSection>
        <StatSection card>
          <ClearsOverTime
            :uncleared-level-count="uncleared.length"
            :clears-by-date="clearSummary.clearsByDate ?? {}"
            :winners="clearSummary.winners ?? ({} as any)"
          />
        </StatSection>
        <StatSection card>
          <ClearLeaderboard
            :clears-by-person="clearSummary.clearsByPerson ?? {}"
            :legacy-clears="clearSummary.legacyClearsByPerson ?? {}"
          />
        </StatSection>
        <StatSection card>
          <UnclearedBreakdown :uncleared="uncleared" />
        </StatSection>
      </template>
      <template v-else>
        <PrimeSkeleton v-for="i in 2" :key="i" class="w-full" height="100%" />
        <StatSection v-for="i in 4" :key="i" class="force-visible" card>
          <PrimeSkeleton class="w-full" height="100%" />
        </StatSection>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stat-section {
  opacity: 0;
  transform: translateY(100%);
  transition: transform, opacity;

  &.force-visible {
    opacity: 1;
  }
}

@media (max-height: 840px) {
  .reduced-size {
    @apply text-sm;
  }

  .hidden-short {
    @apply hidden;
  }
}
</style>

<script setup lang="ts">
import gsap from 'gsap';
import {
  Chart as ChartJS,
  Tooltip,
  type ChartType,
  type TooltipPositionerFunction,
} from 'chart.js';
import type { SetupContext } from 'vue';
import { CHART_MAIN_COLOR, COURSE_WORLD_CARD_TEXT } from '~/constants/colors';
import type { ClearedLevelStatSummary } from '~/types/levels';
import { DATA_ROOT_URL, SHUTDOWN_DATE } from '~/constants/levelData';
import CourseWorldCard from '~/components/CourseWorldCard';
import { PrimeSkeleton } from '#components';

declare module 'chart.js' {
  interface TooltipPositionerMap {
    mouse: TooltipPositionerFunction<ChartType>;
  }
}

ChartJS.register(Tooltip);
ChartJS.defaults.datasets.bar.backgroundColor = CHART_MAIN_COLOR;
ChartJS.defaults.datasets.line.borderColor = CHART_MAIN_COLOR;
ChartJS.defaults.datasets.line.backgroundColor = CHART_MAIN_COLOR;
ChartJS.defaults.color = COURSE_WORLD_CARD_TEXT;
ChartJS.defaults.borderColor = COURSE_WORLD_CARD_TEXT;
Tooltip.positioners.mouse = function (_elements, eventPosition) {
  return eventPosition;
} as TooltipPositionerFunction<ChartType>;
ChartJS.defaults.plugins.tooltip.position = 'mouse';

const StatSection = (
  props: { card?: boolean },
  { slots, attrs }: SetupContext,
) =>
  props.card
    ? h(CourseWorldCard, attrs, { default: slots.default })
    : h(
        'div',
        {
          class: ['stat-section grid place-content-center text-center'],
        },
        { default: slots.default },
      );
StatSection.props = {
  card: {
    type: Boolean,
    default: false,
  },
};

const emit = defineEmits({
  ready: () => true,
});

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const animationStarted = ref(false);

const showLevel = ref(false);
const ready = ref(false);

const {
  data: clearSummary,
  error: clearSummaryError,
  execute: loadClears,
} = useFetch<Partial<ClearedLevelStatSummary>>(
  `${DATA_ROOT_URL}/clear_summary.json`,
  {
    key: 'clear-summary',
    deep: false,
    immediate: false,
    server: false,
    lazy: true,
    default: () => ({}),
  },
);

const {
  uncleared,
  load: loadUncleared,
  error: unclearedError,
} = useUnclearedLevels();

const toast = useToast();

function startAnimation() {
  if (unref(ready) && props.visible && !animationStarted.value) {
    animationStarted.value = true;

    nextTick(() => {
      gsap.to('.stat-section', {
        y: 0,
        opacity: 1,
        stagger: 0.3,
        duration: 0.3,
      });
    });
  }
}

onMounted(async () => {
  let intervalId: NodeJS.Timeout;
  onUnmounted(() => clearInterval(intervalId));

  async function refreshData() {
    await Promise.all([loadClears(), loadUncleared()]);
  }

  await refreshData();

  if (unclearedError.value || clearSummaryError.value) {
    toast.add({
      severity: 'error',
      summary: 'Your princess is in another castle',
      detail:
        'Bowser has kidnapped the rest of the site. Try checking your internet connection and then refreshing the page.',
    });
    return;
  }

  ready.value = true;
  emit('ready');
  startAnimation();

  if (uncleared.value.length) {
    intervalId = setInterval(
      async () => {
        await refreshData();
        if (!uncleared.value.length) {
          const restart = () => {
            window.location.hash = '';
            window.location.reload();
          };
          if (document.hasFocus()) {
            restart();
          } else {
            window.onfocus = restart;
          }
        }
      },
      1000 * 60 * 2,
    );
  }
});

const { formatNumber, formatDate } = useFormatters();

watch(toRef(props, 'visible'), startAnimation);
</script>
