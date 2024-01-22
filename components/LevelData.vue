<template>
  <div class="bg-course-world text-course-world-contrast">
    <div
      class="grid p-7 grid-flow-row grid-rows-2 grid-cols-3 w-full h-full gap-7 overflow-hidden"
      :class="!animationStarted && 'invisible'"
    >
      <template v-if="visible || animationStarted">
        <div class="stat-section">
          <PercentClear
            :uncleared-levels="uncleared.length"
            :cleared-levels="cleared.length"
          />
        </div>
        <div class="stat-section grid align-content-center text-center">
          <h2 class="text-4xl font-semibold mb-5">
            {{ formatNumber(uncleared.length) }} levels left to clear
          </h2>
        </div>
        <StatSection>
          <UnclearedByDate :uncleared-levels="uncleared" />
        </StatSection>
        <StatSection>
          <ClearsOverTime :cleared-levels="cleared" />
        </StatSection>
        <StatSection>
          <ClearLeaderboard :cleared-levels="cleared" />
        </StatSection>
        <StatSection>Small stat 04</StatSection>
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
import {
  CHART_MAIN_COLOR,
  COURSE_WORLD_CARD_TEXT,
} from '~/constants/colors';
import type { ClearedLevel } from '~/server/api/levels/cleared';
import type { LevelData } from '~/server/api/levels/uncleared';

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

const StatSection = (_: {}, { slots }: SetupContext) =>
  h(
    'div',
    {
      class:
        'stat-section grid place-content-center text-center bg-course-world-card text-course-world-card-contrast rounded-2xl shadow-lg p-4',
    },
    slots.default?.(),
  );
const emit = defineEmits({
  ready: () => true,
});

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const cleared = shallowRef<ClearedLevel[]>([]);
const uncleared = shallowRef<LevelData[]>([]);
const animationStarted = ref(false);

onMounted(async () => {
  [cleared.value, uncleared.value] = await Promise.all([
    $fetch('/api/levels/cleared'),
    $fetch('/api/levels/uncleared'),
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
