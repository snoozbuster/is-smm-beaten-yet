<template>
  <span class="pi pi-clock text-5xl font-semibold"></span>
  <span class="text-xl">
    {{ timer }}
  </span>
</template>

<script lang="ts" setup>
defineProps({
  timer: {
    type: [Number, String],
    required: true,
  },
});
</script>
