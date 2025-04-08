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
            <span class="text-balance">
              Achieved by
              <div
                class="font-semibold inline-flex items-center align-middle mx-1"
              >
                <PlayerNnid
                  :nnid="clearSummary.mostRecentClear?.firstClearerNnid"
                  :size="16"
                  :awards="false"
                />
              </div>
              with
              {{ timeToShutdown }} remaining before the server shutdown.
              Congratulations!
            </span>
            <div class="mt-5 text-balance">
              Additionally,
              <div
                class="font-semibold inline-flex items-center align-middle mx-1"
              >
                <PlayerNnid nnid="Sanyx91" :size="16" :awards="false" />
              </div>
              has
              <a
                class="text-blue-800 hover:underline"
                href="https://www.youtube.com/watch?v=Owc_rwlxUlc"
                target="_blank"
                >cleared Trimming the Herbs</a
              >
              and achieved
              <button
                class="font-semibold hover:underline"
                @click="modalOpen = true"
              >
                101%
              </button>
              completion for the team!
            </div>
            <TthHistoryModal v-model:visible="modalOpen" />
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
import { DateTime } from 'luxon';
import type { ClearedLevelStatSummary } from '~/types/levels';
import { LEVELS_ROOT_URL, SHUTDOWN_DATE } from '~/constants/levelData';
import { PrimeSkeleton } from '#components';

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

const ready = ref(false);

const clearSummary = shallowRef<Partial<ClearedLevelStatSummary>>({});

const modalOpen = ref(false);

const timeToShutdown = computed(() =>
  DateTime.fromISO(SHUTDOWN_DATE)
    .toRelative({
      base: DateTime.fromISO(clearSummary.value.mostRecentClear?.dateCleared!),
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
    (async () =>
      (await fetch(`${LEVELS_ROOT_URL}/clear_summary.json`)).json())(),
  ]);

  ready.value = true;
  emit('ready');
  startAnimation();
});

watch(toRef(props, 'visible'), startAnimation);
</script>
