<template>
  <div class="bg-course-world min-h-dvh text-course-world-contrast pt-5 pb-10">
    <div class="container mx-auto">
      <h1 class="text-4xl text-center mb-5 font-medium">
        Team 0% Mario Maker 1 Hall of Fame
      </h1>

      <h3 id="country" class="text-2xl">Country</h3>
      <ClientOnly>
        <StatSection card class="col-span-2">
          <CountryMap />
        </StatSection>
      </ClientOnly>

      <h3 id="year" class="text-2xl">Year</h3>
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

      <h3 id="month" class="text-2xl">Month</h3>
      <LeaderboardPreview
        v-for="leaderboard of monthLeaderboards"
        class="mb-3"
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
