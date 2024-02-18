<template>
  <div class="bg-course-world text-course-world-contrast">
    <div
      class="grid p-7 grid-flow-row grid-rows-1 md:grid-rows-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full h-full gap-7 overflow-hidden"
      :class="!animationStarted && 'invisible'"
    >
      <template v-if="visible || animationStarted">
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
              {{ formatNumber(uncleared.length) }} levels left to clear
            </h2>
            <span>
              before the server shutdown on {{ formatDate('2024-04-08') }}
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
                Levels are marked as cleared by the community using a
                custom-made Discord bot built by TheCryptan. Around once a
                month, the SMM1 API is scraped for any unreported levels that
                have been cleared.
              </p>
            </PrimeDialog>
          </div>
          <div class="self-end">
            <h4 class="text-xl font-semibold mb-1">Join us today!</h4>
            <p class="mb-2">
              All you have to do to be a part of Team 0% is clear one level.
              Every clear counts!
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stat-section {
  opacity: 0;
  transform: translateY(100%);
  transition: transform, opacity;
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
import { DATA_ROOT_URL } from '~/constants/levelData';
import CourseWorldCard from '~/components/CourseWorldCard';

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

const showFaq = ref(false);

const clearSummary = shallowRef<Partial<ClearedLevelStatSummary>>({});
const animationStarted = ref(false);

const { uncleared, load } = useUnclearedLevels();

onMounted(async () => {
  [clearSummary.value, uncleared.value] = await Promise.all([
    // this seems wrong but it works? what is the nuxt-y way to do this?
    (async () => (await fetch(`${DATA_ROOT_URL}/clear_summary.json`)).json())(),
    load(),
  ]);

  emit('ready');
});

const { formatNumber, formatDate } = useFormatters();

watch(toRef(props, 'visible'), () => {
  if (props.visible && !animationStarted.value) {
    nextTick(() => {
      gsap.to('.stat-section', {
        y: 0,
        opacity: 1,
        stagger: 0.3,
        duration: 0.3,
      });

      animationStarted.value = true;
    });
  }
});
</script>
