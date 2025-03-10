<template>
  <div>
    <div v-for="rank in ranks">
      #{{ rank.rank }}: {{ rank.name }} ({{ rank.score }} clears)
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  nnid: {
    type: String,
    required: true,
  },
});

const { ranks } = usePlayerLeaderboardRanks(toRef(props, 'nnid'));
</script>
