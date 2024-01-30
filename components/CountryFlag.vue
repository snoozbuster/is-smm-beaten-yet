<template>
  <img
    class="inline"
    :src="`/img/flags/${countryCode.toLowerCase()}.gif`"
    width="24"
    height="16"
    alt="flag"
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
