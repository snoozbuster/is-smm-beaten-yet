<template>
  <div class="bg-course-world text-course-world-contrast">
    <div
      class="grid p-7 grid-flow-row grid-rows-1 md:grid-rows-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full h-full gap-7 overflow-hidden"
      :class="!visible && !animationStarted && 'invisible'"
    >
      <template v-if="animationStarted">
        <div class="stat-section min-h-[20vh]">
          <PercentClear
            :uncleared-levels="uncleared.length"
            :cleared-levels="clearSummary.clearedTotal ?? 0"
          />
        </div>
        <StatSection class="md:grid-rows-[1fr_2fr_1fr]">
          <div class="placement"></div>
          <div class="self-center">
            <h2
              class="text-4xl md:text-3xl xl:text-4xl font-semibold text-balance"
            >
              {{ formatNumber(uncleared.length) }}
              {{ uncleared.length === 1 ? 'level' : 'levels' }} left to clear
            </h2>
            <span>
              before the server shutdown on {{ formatDate(SHUTDOWN_DATE) }}
            </span>
            <NuxtLink to="/levels">
              <PrimeButton
                label="View uncleared levels"
                class="w-full text-smm uppercase mt-5 mb-3"
                size="large"
                severity="warning"
              />
            </NuxtLink>
            <PrimeButton
              class="text-course-world-contrast"
              link
              label="How is this calculated?"
              @click="showFaq = true"
            />
            <PrimeDialog
              v-model:visible="showFaq"
              class="w-80"
              header="FAQ"
              modal
            >
              <p class="mb-4">
                Percentages calculated out of ~{{ formatNumber(48000) }} levels
                that were still uncleared when level upload was disabled on
                {{ formatDate('2021-04-01') }}.
              </p>
              <p>
                Levels are marked as cleared by the community by running
                commands for a custom-made Discord bot built by TheCryptan.
                Additionally, the uncleared list is refreshed periodically to
                look for any unreported levels that have been cleared.
              </p>
            </PrimeDialog>
          </div>
          <div class="self-end">
            <h4 class="text-xl font-semibold mb-1">Join us today!</h4>
            <p class="mb-2">
              There are still many ways to help out, even if you're not a
              platforming pro. We'd love for you to join our community!
            </p>
            <SocialLinks />
          </div>

          <div class="md:hidden">
            <h3 class="text-2xl font-semibold mt-7">More stats</h3>
          </div>
        </StatSection>
        <StatSection card>
          <UnclearedByDate :uncleared-levels="uncleared" />
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
          />
        </StatSection>
        <StatSection card>
          <StylePieChart :uncleared-levels="uncleared" />
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
    ? h(CourseWorldCard, attrs, slots.default?.())
    : h(
        'div',
        {
          class: ['stat-section grid place-content-center text-center'],
        },
        slots.default?.(),
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

const showFaq = ref(false);
const ready = ref(false);

const clearSummary = shallowRef<Partial<ClearedLevelStatSummary>>({});

const { uncleared, load } = useUnclearedLevels();

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
  [clearSummary.value] = await Promise.all([
    // this seems wrong but it works? what is the nuxt-y way to do this?
    (async () => (await fetch(`${DATA_ROOT_URL}/clear_summary.json`)).json())(),
    load(),
  ]);

  ready.value = true;
  emit('ready');
  startAnimation();
});

const { formatNumber, formatDate } = useFormatters();

watch(toRef(props, 'visible'), startAnimation);
</script>
