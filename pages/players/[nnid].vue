<template>
  <div class="bg-course-world min-h-dvh lg:h-0">
    <PrimeToast position="bottom-center" />
    <div class="h-full max-w-[1800px] mt-auto mx-auto flex flex-col p-5">
      <div class="flex items-center mb-6">
        <h1 class="text-4xl text-course-world-contrast flex items-center">
          <PlayerNnid :nnid="nnid" :player="player" :size="24" />
        </h1>

        <PlayerSearch class="ml-auto w-fit" />
      </div>

      <div class="grid lg:grid-cols-3 lg:h-[400px] gap-5 mb-5">
        <template v-if="player && !pending">
          <StatSection card class="min-h-[350px]">
            <ClearsOverTime
              :clears-by-date="player.stats.clearsByDate ?? {}"
              all-time
            />
          </StatSection>
          <StatSection card>
            <ClearedBreakdown :cleared="player.levels" />
          </StatSection>
          <StatSection card class="max-h-[400px] lg:max-h-none min-h-0">
            <h3 class="text-xl mb-3">Leaderboard placements</h3>
            <div class="overflow-auto">
              <PlayerAchievements :nnid="nnid" />
            </div>
          </StatSection>
        </template>
        <template v-else>
          <PrimeSkeleton class="w-full" height="100%" />
          <PrimeSkeleton class="w-full" height="100%" />
          <PrimeSkeleton class="w-full" height="100%" />
        </template>
      </div>
      <ResponsiveLevelList
        :levels="player?.levels"
        :hide-columns="['firstClearer']"
        class="h-[50dvh] lg:h-full"
      />
    </div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { usePlayer } from '~/composables/usePlayer';

const route = useRoute();
const nnid = computed(() => (route.params.nnid as string)?.trim());

const { player, pending, error } = usePlayer(nnid);

const toast = useToast();
const showGenericError = useUnknownErrorToast();

watch(error, (e) => {
  if (!e) {
    return;
  }

  if (e?.statusCode === 404) {
    toast.add({
      severity: 'error',
      summary: 'No player found',
      detail: `No profile for ${unref(
        nnid,
      )} was found. This website only tracks players that contributed to the Team 0% SMM1 project.`,
    });
  } else {
    showGenericError();
  }
});
</script>
