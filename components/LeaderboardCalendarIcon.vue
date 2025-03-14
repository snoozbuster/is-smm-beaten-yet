<template>
  <time
    :datetime="isoDate"
    class="flex time-icon bg-white rounded flex-col select-none w-[5em] h-[5em]"
  >
    <div class="bg-red-500 rounded-t -mb-1 p-[0.5em]" />
    <div class="mt-auto" :class="!monthName && 'mb-auto'">
      <strong class="text-[1.25em]">{{ year }}</strong>
    </div>
    <div v-if="monthName" class="leading-none mb-auto">{{ monthName }}</div>
  </time>
</template>

<style lang="scss" scoped>
.time-icon {
  box-shadow:
    0 1px 0 #bdbdbd,
    0 2px 0 #fff,
    0 3px 0 #bdbdbd,
    0 4px 0 #fff,
    0 5px 0 #bdbdbd,
    0 0 0 1px #bdbdbd;
}
</style>

<script lang="ts" setup>
import { DateTime } from 'luxon';

// based on https://cssdeck.com/labs/calendar-icon
// use font size styles to change size (eg `text-xl`)

const props = defineProps({
  year: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    default: null,
  },
});

const { formatDate } = useFormatters();

const isoDate = computed(() => useCompact([props.year, props.month]).join('-'));

const monthName = computed(
  () =>
    props.month &&
    DateTime.fromISO(unref(isoDate)).toLocaleString({
      month: 'short',
    }),
);
</script>
