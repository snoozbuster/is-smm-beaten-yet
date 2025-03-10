<template>
  <div class="bg-course-world min-h-dvh h-0">
    <PrimeToast position="bottom-center" />
    <div class="h-full max-w-[1800px] mt-auto mx-auto flex flex-col p-5">
      <h1 class="text-4xl text-course-world-contrast mb-6">
        <CountryFlag
          v-if="player?.countryCode"
          :country-code="player.countryCode"
        />
        {{ nnid }}
        <div v-if="player?.awards?.length" class="ml-2 inline-flex gap-2">
          <PlayerAward
            v-for="award in player.awards"
            :key="award.name"
            :award="award"
            :size="24"
          />
        </div>
      </h1>

      <div class="grid grid-cols-3 h-[400px] gap-5 mb-5">
        <template v-if="player && !pending">
          <StatSection card>
            <ClearsOverTime
              :clears-by-date="player.stats.clearsByDate ?? {}"
              all-time
            />
          </StatSection>
          <StatSection card>
            <ClearedBreakdown :cleared="player.levels" />
          </StatSection>
          <StatSection card class="overflow-auto">
            <PlayerAchievements :nnid="nnid" />
          </StatSection>
        </template>
        <template v-else>
          <!-- skeletons-->
        </template>
      </div>
      <ResponsiveLevelList :levels="player?.levels" />
    </div>
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
