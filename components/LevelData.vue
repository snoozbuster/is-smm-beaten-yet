<template>
  <div
    class="grid p-7 grid-flow-row grid-rows-2 grid-cols-3 w-full gap-7 overflow-hidden"
    :class="!animationStarted && 'invisible'"
  >
    <template v-if="visible || animationStarted">
      <div class="stat-section">
        <PercentClear
          :uncleared-levels="uncleared.length"
          :cleared-levels="cleared.length"
        />
      </div>
      <div class="stat-section text-center grid place-content-center">
        <h2 class="text-4xl font-semibold">
          {{ formatNumber(uncleared.length) }} levels left to clear
        </h2>
        <p>
          out of {{ formatNumber(cleared.length + uncleared.length) }} levels
        </p>
      </div>
      <div class="stat-section">Small stat 01</div>
      <div class="stat-section">Small stat 02</div>
      <div class="stat-section">Small stat 03</div>
      <div class="stat-section">Small stat 04</div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.stat-section {
  opacity: 0;
  transform: translateY(100%);
  transition: transform, opacity;
}
</style>

<script setup lang="ts">
import gsap from 'gsap';
import type { ClearedLevel } from '~/server/api/levels/cleared';
import type { LevelData } from '~/server/api/levels/uncleared';

const emit = defineEmits({
  ready: () => true,
});

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const cleared = ref<ClearedLevel[]>([]);
const uncleared = ref<LevelData[]>([]);
const animationStarted = ref(false);

onMounted(async () => {
  [cleared.value, uncleared.value] = await Promise.all([
    $fetch('/api/levels/cleared'),
    $fetch('/api/levels/uncleared'),
  ]);

  emit('ready');
});

const formatNumber = new Intl.NumberFormat().format;

watch(toRef(props, 'visible'), () => {
  if (props.visible && !animationStarted.value) {
    nextTick(() => {
      gsap.to('.stat-section', {
        y: 0,
        opacity: 1,
        stagger: 0.3,
        duration: 0.3,
      });

      animationStarted.value = true;
    });
  }
});
</script>
