<template>
  <div
    class="relative flex min-h-dvh flex-col overflow-hidden bg-course-world-menu"
  >
    <div class="course-world-bg" aria-hidden="true" />
    <div
      class="relative z-0 flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-8"
    >
      <div
        class="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-8 md:flex-row md:gap-12"
      >
        <div
          class="flex max-w-md flex-col items-center gap-6 text-course-world-contrast md:items-start"
        >
          <div
            v-if="clearSummary"
            class="flex h-[160px] w-[160px] shrink-0 justify-center relative"
          >
            <PercentClear
              :uncleared-levels="0"
              :cleared-levels="clearSummary.clearedTotal ?? 0"
            />
          </div>
          <div v-if="clearSummary?.mostRecentClear" class="text-balance">
            <h3 class="text-xl">
              The final
              <img
                class="inline align-middle"
                src="~/assets/img/first_clear.png"
                alt="First Clear"
                title="First Clear"
                width="40"
                height="40"
              />
              was:
            </h3>
            <p class="mt-1 text-2xl font-semibold md:text-3xl">
              {{ clearSummary.mostRecentClear.title }}
            </p>
            <p class="mt-2 text-balance">
              Achieved by
              <PlayerNnid
                :nnid="clearSummary.mostRecentClear.firstClearerNnid"
                :size="16"
                :awards="false"
              />
              with {{ timeToShutdown }} remaining before the server shutdown.
              Congratulations!
            </p>
          </div>
          <div class="w-full text-balance">
            <p class="mb-2">
              Additionally,
              <PlayerNnid nnid="Sanyx91" :size="16" :awards="false" />
              has
              <a
                class="text-blue-800 hover:underline dark:text-blue-300"
                href="https://www.youtube.com/watch?v=Owc_rwlxUlc"
                target="_blank"
                rel="noopener noreferrer"
              >
                cleared Trimming the Herbs
              </a>
              and achieved
              <button
                class="font-semibold hover:underline"
                @click="modalOpen = true"
              >
                101%
              </button>
              completion for the team!
            </p>
            <TthHistoryModal v-model:visible="modalOpen" />
          </div>
          <div class="mt-6">
            <h4 class="text-lg font-semibold">Join us today!</h4>
            <p class="mb-2 mt-1 text-sm">
              We're not done yet — there's still an entire other game with
              plenty of uncleared levels. Join the Discord to help take down
              some of the oldest uncleared levels in SMM2!
            </p>
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
    <nav
      class="relative z-0 mx-auto grid w-full max-w-4xl shrink-0 grid-cols-1 gap-3 px-4 pb-6 mb-5 pt-4 md:grid-cols-3 md:gap-6 md:pt-6"
      role="navigation"
      aria-label="Course World menu"
    >
      <div class="course-world-ground absolute" aria-hidden="true">
        <img
          src="~/assets/img/course-world-continents.svg"
          class="course-world-continents"
          alt=""
          aria-hidden="true"
        />
      </div>
      <NuxtLink
        to="/leaderboards"
        class="course-world-btn flex items-center justify-center bg-100-mario-red py-3 text-center text-lg font-bold uppercase text-white shadow-lg transition hover:opacity-95"
      >
        Hall of Fame
      </NuxtLink>
      <NuxtLink
        to="/levels"
        class="course-world-btn flex items-center justify-center bg-course-world py-3 text-center text-lg font-bold uppercase text-white shadow-lg transition hover:opacity-95"
      >
        Courses
      </NuxtLink>
      <NuxtLink
        to="/leaderboards"
        class="course-world-btn flex items-center justify-center bg-makers-purple py-3 text-center text-lg font-bold uppercase text-white shadow-lg transition hover:opacity-95"
      >
        Players
      </NuxtLink>
    </nav>
  </div>
</template>

<style scoped>
.course-world-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse 80% 50% at 50% 20%,
      rgba(59, 48, 120, 0.4) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 20% 30%,
      rgba(251, 205, 14, 0.08) 0%,
      transparent 25%
    ),
    radial-gradient(
      circle at 80% 25%,
      rgba(251, 205, 14, 0.06) 0%,
      transparent 25%
    ),
    linear-gradient(
      180deg,
      #1a0a2e 0%,
      #2d1b4e 45%,
      #4a2c6d 70%,
      rgb(88, 55, 110) 100%
    );
}

.bg-course-world-menu {
  background-color: #1a0a2e;
}

.course-world-ground {
  z-index: -1;
  height: 35rem;
  top: -2rem;
  width: 200vw;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50% 50% 0 0;
  background: linear-gradient(
    180deg,
    rgb(88, 55, 110) 0%,
    rgb(68, 42, 85) 50%,
    rgb(67, 49, 131) 100%
  );
  overflow: hidden;
  box-shadow:
    0 -4px 12px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(251, 205, 14, 0.08);

  img {
    perspective-origin: 50% 100%;
    transform: translateY(-22%) rotateX(-40deg) perspective(400px);
    opacity: 0.25;
  }
}

.course-world-btn {
  border: 3px solid #fbcd0e;
  border-radius: 12px;
}
</style>

<script setup lang="ts">
import { DateTime } from 'luxon';
import { SHUTDOWN_DATE } from '~/constants/levelData';

const { summary, load } = useClearSummary();
const clearSummary = summary;

const modalOpen = ref(false);

const timeToShutdown = computed(() => {
  const clear = clearSummary.value?.mostRecentClear;
  if (!clear?.dateCleared) return '';
  return (
    DateTime.fromISO(SHUTDOWN_DATE)
      .toRelative({
        base: DateTime.fromISO(clear.dateCleared),
        unit: ['days', 'hours', 'minutes'],
      })
      ?.replace(/^in /, '') ?? ''
  );
});

onMounted(() => {
  load();
});
</script>
