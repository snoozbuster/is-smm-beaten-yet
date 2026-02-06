<template>
  <CourseWorldCard class="px-6 leaderboard-podium" :grid="false">
    <BasePodium :title="title" :podium-placements="podiumPlacements">
      <template v-if="leaderboards.length > 1" #title>
        <div :class="['min-w-[170px]', 'text-right']">
          <PrimeDropdown
            :model-value="leaderboards[selectedLeaderboardIndex]?.name"
            option-label="label"
            option-value="label"
            :options="tabs"
            :pt="{ input: { class: 'py-0 pr-0' }, item: { class: 'p-2' } }"
            @update:model-value="
              (name) =>
                (selectedLeaderboardIndex = leaderboards.findIndex(
                  (l) => l.name === name,
                ))
            "
          >
            <template #value="{ value }">
              <slot v-if="value" name="option-icon" :option="value" />
              <span class="align-middle">{{ value }}</span>
            </template>
            <template #option="{ option }">
              <slot v-if="option" name="option-icon" :option="option.label" />
              <span class="align-middle">{{ option.label }}</span>
            </template>
          </PrimeDropdown>
        </div>
      </template>
      <template #first-caption>
        <PlayerNnid v-if="first?.nnid" :nnid="first.nnid" :size="22" />
      </template>
      <template #second-caption>
        <PlayerNnid v-if="second?.nnid" :nnid="second.nnid" :size="22" />
      </template>
      <template #third-caption>
        <PlayerNnid v-if="third?.nnid" :nnid="third.nnid" :size="22" />
      </template>
      <template #footer>
        <button class="hover:underline text-nowrap" @click="viewing = true">
          View full <Icon name="mdi:chevron-right" />
        </button>

        <LeaderboardModal
          v-if="viewing"
          :name="leaderboards[selectedLeaderboardIndex]?.name ?? ''"
          :leaderboard="leaderboard"
          @close="viewing = false"
        />
      </template>
    </BasePodium>
  </CourseWorldCard>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  leaderboards: {
    type: Array as PropType<
      { name: string; rankings: RankedLeaderboard<boolean> }[]
    >,
    default: () => [],
  },
});

const selectedLeaderboardIndex = ref(0);
const leaderboard = computed(
  () => props.leaderboards[unref(selectedLeaderboardIndex)]?.rankings ?? [],
);

const tabs = computed(() =>
  props.leaderboards.map(({ name }, index) => ({
    label: name,
    command: () => (selectedLeaderboardIndex.value = index),
  })),
);

const first = computed(() => unref(leaderboard)[0]);
const second = computed(() => unref(leaderboard)[1]);
const third = computed(() => unref(leaderboard)[2]);

const podiumPlacements = computed((): [string, string, string] => [
  formatNumber(first.value?.score),
  formatNumber(second.value?.score),
  formatNumber(third.value?.score),
]);

const viewing = ref(false);
const { formatNumber } = useFormatters();
</script>
