<template>
  <CountryFlag
    v-if="player?.countryCode"
    :country-code="player.countryCode"
    :size="size + 4"
  />
  <BaseNnid
    :class="[player?.countryCode && 'ml-2', player?.awards?.length && 'mr-2']"
    :nnid="nnid"
  />
  <div
    v-if="player?.awards?.length && awards"
    class="inline-flex gap-2 align-bottom"
  >
    <PlayerAward
      v-for="award in player.awards"
      :key="award.name"
      :award="award"
      :size="size"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  nnid: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 24,
  },
  awards: {
    type: Boolean,
    default: true,
  },
});

const { players } = usePlayerList();

const player = computed(() => unref(players)?.[props.nnid]);
</script>
