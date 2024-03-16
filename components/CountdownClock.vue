<template>
  {{ timeRemaining }}
</template>

<script lang="ts" setup>
import { DateTime } from 'luxon';
import { SHUTDOWN_DATE } from '~/constants/levelData';

const timeRemaining = ref();

const computeTimeRemaining = () => {
  const rtf = new Intl.RelativeTimeFormat(navigator.languages as string[], {
    style: 'narrow',
  });
  const units = ['days', 'hours', 'minutes', 'seconds'] as const;
  const timeDiff = DateTime.fromISO(SHUTDOWN_DATE).diffNow(units as any);

  timeRemaining.value = units
    .map((unit) => `${Math.floor(timeDiff[unit])}${unit[0]}`)
    .join(' ');
};

onMounted(() => {
  const intervalId = setInterval(computeTimeRemaining, 1000);

  onUnmounted(() => clearInterval(intervalId));
});
</script>
