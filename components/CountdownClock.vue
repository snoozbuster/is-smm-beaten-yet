<template>
  <h2
    class="text-3xl font-semibold grid grid-flow-col gap-3 place-content-center"
  >
    <div
      v-for="unit in units"
      :key="unit"
      class="clock py-3 reduced-size w-20 text-center border border-course-world-contrast rounded"
    >
      <div>
        {{
          timeRemaining?.[unit] !== undefined
            ? Math.floor(timeRemaining?.[unit])
            : ''
        }}
      </div>
      <div class="text-base">
        {{ unit }}
      </div>
    </div>
  </h2>
</template>

<style lang="scss" scoped>
@media (max-height: 840px) {
  .reduced-size {
    @apply py-2;
  }
}
</style>

<script lang="ts" setup>
import { DateTime, Duration } from 'luxon';
import { SHUTDOWN_DATE } from '~/constants/levelData';

const units = ['days', 'hours', 'minutes', 'seconds'] as const;

const timeRemaining = ref<Duration<true>>();

const computeTimeRemaining = () => {
  timeRemaining.value = DateTime.fromISO(SHUTDOWN_DATE).diffNow(units as any);
};

onBeforeMount(() => {
  computeTimeRemaining();
  const intervalId = setInterval(computeTimeRemaining, 1000);

  onUnmounted(() => clearInterval(intervalId));
});
</script>
