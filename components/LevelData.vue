<template>
  <div class="bg-course-world text-course-world-contrast md:h-screen">
    <div
      class="grid p-7 grid-flow-row grid-rows-1 md:grid-rows-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full h-full gap-7 overflow-hidden"
      :class="!animationStarted && 'invisible'"
    >
      <template v-if="visible || animationStarted">
        <div class="stat-section">
          <PercentClear
            :uncleared-levels="uncleared.length"
            :cleared-levels="clearSummary.clearedTotal ?? 0"
          />
        </div>
        <StatSection>
          <h2 class="text-4xl font-semibold mb-5">
            {{ formatNumber(uncleared.length) }} levels left to clear
          </h2>
          <NuxtLink to="/levels">
            <PrimeButton
              label="View uncleared levels"
              class="w-full text-smm uppercase"
              size="large"
              severity="warning"
            />
          </NuxtLink>

          <div class="md:hidden">
            <h3 class="text-2xl font-semibold mb-3">More stats</h3>
          </div>
        </StatSection>
        <StatSection card>
          <UnclearedByDate :uncleared-levels="uncleared" />
        </StatSection>
        <StatSection card>
          <ClearsOverTime :clears-by-date="clearSummary.clearsByDate ?? {}" />
        </StatSection>
        <StatSection card>
          <ClearLeaderboard
            :clears-by-person="clearSummary.clearsByPerson ?? {}"
          />
        </StatSection>
        <StatSection class="w-75 mx-auto">
          <GetInvolved />
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

const StatSection = (props: { card?: boolean }, { slots }: SetupContext) =>
  props.card
    ? h(CourseWorldCard, slots.default?.())
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

const formatNumber = new Intl.NumberFormat().format;

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
