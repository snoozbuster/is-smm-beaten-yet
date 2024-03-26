<template>
  <div class="bg-course-world text-course-world-contrast">
    <div
      class="grid p-7 grid-flow-row grid-rows-1 md:grid-rows-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full h-full gap-7 overflow-hidden"
      :class="!visible && !animationStarted && 'invisible'"
    >
      <template v-if="animationStarted">
        <div class="stat-section min-h-[20vh]">
          <PercentClear
            :uncleared-levels="0"
            :cleared-levels="clearSummary.clearedTotal ?? 0"
          />
        </div>
        <StatSection class="md:grid-rows-[1fr_2fr_1fr]">
          <div class="placement"></div>
          <div class="self-center mb-6">
            <h2>
              <span class="text-xl"
                >The final
                <img
                  class="inline"
                  src="~/assets/img/first_clear.png"
                  alt="First Clear"
                  title="First Clear"
                  width="50"
                />
                was:</span
              >
              <div
                class="text-4xl md:text-3xl xl:text-4xl mb-2 font-semibold text-balance"
              >
                {{ clearSummary.mostRecentClear?.title }}
              </div>
            </h2>
            <span>
              Achieved by
              <span class="font-semibold">
                {{ clearSummary.mostRecentClear?.firstClearerNnid }}
              </span>
              with
              {{ timeToShutdown }} remaining before the server shutdown.
              Congratulations!
            </span>
            <PrimeButton
              class="hover:underline text-course-world-contrast block mx-auto p-0 mt-5 text-sm font-normal"
              link
              @click="modalOpen = true"
            >
              What about Trimming the Herbs?
              <i class="pi pi-angle-right -ml-1 text-sm"></i>
            </PrimeButton>
            <PrimeDialog
              v-model:visible="modalOpen"
              class="w-full md:w-2/3"
              header="What about TTH?"
              modal
              dismissable-mask
            >
              <p class="mb-3">
                After over seven years, the creator of Trimming the Herbs
                revealed on {{ formatDate('2024-03-22') }} that the level was,
                in fact, a convoluted sort of troll. Despite a general belief
                both then and now that tool-assisted speedruns (TASes) were not
                possible on the Wii U, the creator had access to a
                hardware-based TAS prototype which was used to develop and
                clear-check TTH. It was apparently intended to be a sort of
                "teaser" for the feasibility of these tools, but after the
                level's release, it remained relatively obscure even in the
                community it was designed to troll and was eventually forgotten
                (until Team 0% uncovered it). Since the level was not uploaded
                legitimately, it was excluded from Team 0%'s list of uncleared
                levels. As a result of this shocking revelation, Team 0%
                considers Super Mario Maker 1 to have been 100% cleared on
                {{ formatDate('2024-03-15') }}, the day that Yamada (aka
                "kazeihinn") cleared The Last Dance.
              </p>

              <p class="mb-3">
                This isn't quite the end of the story for these levels, though.
                Trimming the Herbs, as well as another level involving 81
                consecutive midair shell-jumps which was uploaded using a
                controller macro, aren't
                <i>impossible</i> for a human, and a handful of dedicated and
                extremely talented players are still grinding out these levels
                and aiming for the true first clear by a human &mdash; an
                exceptionally prestigious feat and something of a "101%"
                completion goal for the team. When (not if) these players
                succeed, their achievement will certainly be marked on this site
                in commemoration of the defeat of these secret "final bosses" of
                levels.
              </p>
            </PrimeDialog>
          </div>
          <div class="self-end">
            <h4 class="text-xl font-semibold mb-1">Join us today!</h4>
            <p class="mb-2 hidden-short text-sm">
              We're not done yet - there's still an entire other game with
              plenty of uncleared levels. Join the Discord to help take down
              some of the oldest uncleared levels in SMM2!
            </p>
            <SocialLinks />
          </div>

          <div class="md:hidden">
            <h3 class="text-2xl font-semibold mt-7">More stats</h3>
          </div>
        </StatSection>
        <StatSection card class="md:col-span-2 xl:col-span-1">
          <ClearLeaderboard
            :clears-by-person="clearSummary.clearsByPerson ?? {}"
            :legacy-clears="clearSummary.legacyClearsByPerson ?? {}"
          />
        </StatSection>
        <StatSection card class="md:col-span-2 xl:col-span-3">
          <ClearsOverTime
            :uncleared-level-count="0"
            :clears-by-date="clearSummary.clearsByDate ?? {}"
            :winners="clearSummary.winners ?? ({} as any)"
            all-time
          />
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

@media (max-height: 900px) {
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
import { DateTime } from 'luxon';

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

const modalOpen = ref(false);

const animationStarted = ref(false);

const ready = ref(false);

const clearSummary = shallowRef<Partial<ClearedLevelStatSummary>>({});

const timeToShutdown = computed(
  () =>
    DateTime.fromISO(SHUTDOWN_DATE)
      .toRelative({
        base: DateTime.fromISO(
          clearSummary.value.mostRecentClear?.dateCleared!,
        ),
        unit: ['days', 'hours', 'minutes'],
      })
      ?.replace(/^in /, ''),
);

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
  ]);

  ready.value = true;
  emit('ready');
  startAnimation();
});

const { formatNumber, formatDate } = useFormatters();

watch(toRef(props, 'visible'), startAnimation);
</script>
