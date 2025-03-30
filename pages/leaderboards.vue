<template>
  <div class="bg-black min-h-dvh text-smm-yellow pt-5 pb-10">
    <div class="md:container mx-auto px-5">
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

      <div class="flex mb-3 justify-evenly flex-wrap md:flex-nowrap gap-5">
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

      <h3 id="country" class="text-2xl text-smm">Country</h3>
      <ClientOnly>
        <StatSection card class="col-span-2 mb-5">
          <CountryMap />
        </StatSection>
      </ClientOnly>

      <h3 id="year" class="text-2xl text-smm">Year</h3>
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

      <h3 id="month" class="text-2xl text-smm">Month</h3>
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
    </div>
  </div>
</template>

<script lang="ts" setup>
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

const { yearMilestones, monthMilestones } = useMilestones();

const yearLeaderboards = computed(() =>
  useMap(
    unref(leaderboards)?.clearCounts.year,
    (leaderboard, year: ValidLeaderboardGroups['year']) => ({
      year,
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
</script>
