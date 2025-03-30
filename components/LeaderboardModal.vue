<template>
  <PrimeDialog
    class="w-screen lg:w-3/4"
    :header="`Clear rankings: ${name}`"
    :draggable="false"
    modal
    maximizable
    visible
    :content-style="{ height: '80vh' }"
    @update:visible="$emit('close')"
  >
    <LeaderboardTable :leaderboard="leaderboard" />
  </PrimeDialog>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  leaderboard: {
    type: Array as PropType<RankedLeaderboard<boolean>>,
    default: () => [],
  },
});

defineEmits(['close']);
</script>
