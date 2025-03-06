<template>
  <img
    v-tooltip.hover="countryName"
    :class="['inline', 'border', 'border-black/25', 'h-[19px]', 'align-middle']"
    :src="`https://flagcdn.com/h20/${countryCode.toLowerCase()}.png`"
    :srcset="`
      https://flagcdn.com/h40/${countryCode.toLowerCase()}.png 2x,
      https://flagcdn.com/h60/${countryCode.toLowerCase()}.png 3x
    `"
    :alt="countryName"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  countryCode: {
    type: String,
    required: true,
  },
});

const regionNames = new Intl.DisplayNames(navigator.languages, {
  type: 'region',
});
const countryName = computed(() =>
  regionNames.of(props.countryCode.toUpperCase()),
);
</script>
