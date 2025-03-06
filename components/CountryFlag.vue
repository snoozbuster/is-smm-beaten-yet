<template>
  <img
    :class="[
      'inline',
      'border',
      'border-black/25',
      'h-[19px]',
      'align-text-bottom',
    ]"
    :src="`https://flagcdn.com/h20/${countryCode.toLowerCase()}.png`"
    :srcset="`
      https://flagcdn.com/h40/${countryCode.toLowerCase()}.png 2x,
      https://flagcdn.com/h60/${countryCode.toLowerCase()}.png 3x
    `"
    alt="Ukraine"
  />
</template>

<script setup lang="ts">
defineProps({
  countryCode: {
    type: String,
    required: true,
  },
});
</script>
