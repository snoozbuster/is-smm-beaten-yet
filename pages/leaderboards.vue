<template>
  <div class="bg-black min-h-dvh text-smm-yellow pt-5 pb-10">
    <div class="mx-auto max-w-screen-lg relative px-5">
      <h1 class="text-4xl text-center mb-5 font-medium uppercase text-smm">
        Hall of Fame
      </h1>

      <LeaderboardPodium
        class="mx-auto w-fit mb-5"
        :title="getLeaderboardName('total')"
        :leaderboards="[
          { name: getLeaderboardName('total'), rankings: overallLeaderboard },
        ]"
      />

      <div class="flex mb-3 justify-evenly flex-wrap md:flex-nowrap gap-3">
        <LeaderboardPodium
          class="w-[535px]"
          title="Style"
          :leaderboards="styleLeaderboard"
        >
          <template #option-icon="{ option }">
            <StyleIcon class="mr-2" :style="option" />
          </template>
        </LeaderboardPodium>
        <LeaderboardPodium
          class="w-[535px]"
          title="Theme"
          :leaderboards="themeLeaderboard"
        >
          <template #option-icon="{ option }">
            <ThemeIcon class="mr-2" :theme="option" />
          </template>
        </LeaderboardPodium>
      </div>

      <h3 id="country" class="text-2xl text-smm mb-2">Country</h3>
      <ClientOnly>
        <StatSection card class="col-span-2 mb-5 country-section">
          <CountryMap />
        </StatSection>
      </ClientOnly>

      <PrimeTabMenu
        class="mb-3"
        :model="tabs"
        :pt="{
          action: {
            class: 'text-2xl text-smm text-smm-yellow',
          },
          menuitem: {
            class: 'highlight-yellow',
          },
          inkbar: {
            class: 'bg-smm-yellow',
          },
        }"
      />
      <template v-if="activeLeaderboardTab === 'year'">
        <LeaderboardPreview
          v-for="leaderboard of yearLeaderboards"
          class="mb-3"
          :milestone="leaderboard.milestone"
          :leaderboard="leaderboard.rankings"
          :key="leaderboard.year"
          :name="leaderboard.name"
        >
          <template #icon>
            <LeaderboardCalendarIcon :year="leaderboard.year" />
          </template>
        </LeaderboardPreview>
      </template>

      <template v-else-if="activeLeaderboardTab === 'month'">
        <LeaderboardPreview
          v-for="leaderboard of monthLeaderboards"
          class="mb-5"
          :milestone="leaderboard.milestone"
          :leaderboard="leaderboard.rankings"
          :key="leaderboard.key"
          :name="leaderboard.name"
        >
          <template #icon>
            <LeaderboardCalendarIcon
              :year="leaderboard.year"
              :month="leaderboard.month"
            />
          </template>
        </LeaderboardPreview>
      </template>
      <template v-else-if="activeLeaderboardTab === 'timer'">
        <LeaderboardPreview
          v-for="leaderboard of timerLeaderboards"
          class="mb-5"
          :leaderboard="leaderboard.rankings"
          :key="leaderboard.timer"
          :name="leaderboard.name"
        >
          <template #icon>
            <LeaderboardTimerIcon :timer="leaderboard.timer" />
          </template>
        </LeaderboardPreview>
      </template>
      <template v-else>
        <LeaderboardPreview
          class="mb-5"
          :leaderboard="autoscrollLeaderboard.rankings"
          :milestone="autoscrollLeaderboard.milestone"
          :name="autoscrollLeaderboard.name"
        >
          <template #icon>
            <div class="w-[75px]">
              <Icon
                class="text-5xl font-semibold"
                name="fluent:fast-forward-20-regular"
              />
              <div class="text-sm">Autoscroll</div>
            </div>
          </template>
        </LeaderboardPreview>
        <LeaderboardPreview
          class="mb-5"
          :leaderboard="hackedClearLeaderboard.rankings"
          :name="hackedClearLeaderboard.name"
        >
          <template #icon>
            <div class="w-[75px]">
              <Icon class="text-5xl font-semibold" name="mdi:check-all" />
              <div class="text-sm">True clear</div>
            </div>
          </template>
        </LeaderboardPreview>
        <LeaderboardPreview
          class="mb-5"
          :leaderboard="legacyClearLeaderboard.rankings"
          :name="legacyClearLeaderboard.name"
        >
          <template #icon>
            <div class="w-[75px]">
              <Icon
                class="text-5xl font-semibold"
                name="material-symbols:history-rounded"
              />
              <div class="text-sm">Legacy clears</div>
            </div>
          </template>
        </LeaderboardPreview>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep() {
  .p-highlight.highlight-yellow {
    .p-menuitem-link {
      border-bottom-color: #fbcd0e;
    }
  }

  .leaderboard-card,
  .country-section,
  .leaderboard-podium {
    opacity: 0;
    transform: translateY(100%);
  }
}
</style>

<script lang="ts" setup>
import gsap from 'gsap';
import type { ValidLeaderboardGroups } from '~/types/leaderboards';

const { leaderboards } = useAllLeaderboards();

const overallLeaderboard = computed(() =>
  getRankedLeaderboard(unref(leaderboards)?.clearCounts.total),
);

const STYLE_ORDER = ['SMB1', 'SMB3', 'SMW', 'NSMBU'] as const;

const styleLeaderboard = computed(() =>
  useMap(STYLE_ORDER, (style) => ({
    style,
    name: getLeaderboardName('style', style),
    rankings: getRankedLeaderboard(
      unref(leaderboards)?.clearCounts.style[style],
    ),
  })),
);

const themeLeaderboard = computed(() =>
  useOrderBy(
    useMapValues(
      unref(leaderboards)?.clearCounts.theme,
      (leaderboard, theme) => ({
        theme,
        name: getLeaderboardName('theme', theme),
        rankings: getRankedLeaderboard(leaderboard),
      }),
    ),
    ({ name }) => (name === 'Ground' ? 0 : 1),
    'asc',
  ),
);

const getLeaderboardName = useLeaderboardNames();

const initialAnimation = ref(false);
const doFirstAnim = () => {
  initialAnimation.value = true;
  nextTick(() => {
    const tl = gsap.timeline();
    const params = {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.1,
    };
    tl.to('.leaderboard-podium', params)
      .to('.country-section', params)
      .to('.leaderboard-card', params);
  });
};
const animateLeaderboardCards = () => {
  nextTick(() => {
    gsap.to('.leaderboard-card', {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.1,
    });
  });
};

watch(
  leaderboards,
  () => {
    if (!unref(initialAnimation) && !isEmpty(unref(leaderboards))) {
      nextTick(() => {
        doFirstAnim();
      });
    }
  },
  { immediate: true },
);

const activeLeaderboardTab = ref<'year' | 'month' | 'timer' | 'other'>('year');
const tabs = [
  {
    label: 'Year',
    command: () => {
      activeLeaderboardTab.value = 'year';
      animateLeaderboardCards();
    },
  },
  {
    label: 'Month',
    command: () => {
      activeLeaderboardTab.value = 'month';
      animateLeaderboardCards();
    },
  },
  {
    label: 'Timer',
    command: () => {
      activeLeaderboardTab.value = 'timer';
      animateLeaderboardCards();
    },
  },
  {
    label: 'Other',
    command: () => {
      activeLeaderboardTab.value = 'other';
      animateLeaderboardCards();
    },
  },
];

const { yearMilestones, monthMilestones, autoscrollMilestone } =
  useMilestones();

const yearLeaderboards = computed(() =>
  useMap(
    unref(leaderboards)?.clearCounts.year,
    (leaderboard, year: ValidLeaderboardGroups['year']) => ({
      year,
      key: year,
      milestone: unref(yearMilestones)[year],
      name: getLeaderboardName('year', year),
      rankings: getRankedLeaderboard(leaderboard),
    }),
  ),
);

const monthLeaderboards = computed(() =>
  useOrderBy(
    useMap(unref(leaderboards)?.clearCounts.month, (leaderboard, month) => ({
      year: month.split('-')[0],
      month: month.split('-')[1],
      key: month,
      milestone: unref(monthMilestones)[month],
      name: getLeaderboardName('month', month),
      rankings: getRankedLeaderboard(leaderboard),
    })),
    'key',
    'asc',
  ),
);

const timerLeaderboards = computed(() =>
  useMap(unref(leaderboards)?.clearCounts.timer, (leaderboard, timer) => ({
    timer,
    name: getLeaderboardName('timer', timer),
    rankings: getRankedLeaderboard(leaderboard),
  })),
);

const autoscrollLeaderboard = computed(() => ({
  name: getLeaderboardName('autoscroll'),
  rankings: getRankedLeaderboard(
    unref(leaderboards)?.clearCounts.autoscroll ?? [],
  ),
  milestone: autoscrollMilestone,
}));

const hackedClearLeaderboard = computed(() => ({
  name: getLeaderboardName('hacked'),
  rankings: getRankedLeaderboard(unref(leaderboards)?.clearCounts.hacked ?? []),
}));

const legacyClearLeaderboard = computed(() => ({
  name: getLeaderboardName('legacy'),
  rankings: getRankedLeaderboard(unref(leaderboards)?.clearCounts.legacy ?? []),
}));
</script>
