<template>
  <img
    v-tooltip.hover="countryName"
    :class="['inline', 'border', 'border-black/25', 'align-middle']"
    :style="`width: ${size}px`"
    :src="`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`"
    :srcset="`
      https://flagcdn.com/w40/${countryCode.toLowerCase()}.png 2x,
      https://flagcdn.com/w60/${countryCode.toLowerCase()}.png 3x
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
  size: {
    type: Number,
    default: 20,
  },
});

const { formatCountryName } = useFormatters();
const countryName = computed(() => formatCountryName(props.countryCode));
</script>
