<template>
  <div
    class="grid p-7 grid-flow-row grid-rows-2 grid-cols-3 w-full gap-7 overflow-hidden"
    :class="!animationStarted && 'invisible'"
  >
    <div class="col-span-2 stat-section">Big stat</div>
    <div class="stat-section">Small stat 01</div>
    <div class="stat-section">Small stat 02</div>
    <div class="stat-section">Small stat 03</div>
    <div class="stat-section">Small stat 04</div>
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

const emit = defineEmits({
  ready: () => true,
});

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const cleared = ref();
const uncleared = ref();
const animationStarted = ref(false);

onMounted(async () => {
  [cleared.value, uncleared.value] = await Promise.all([
    $fetch('/api/levels/cleared'),
    $fetch('/api/levels/uncleared'),
  ]);

  emit('ready');
});

watch(toRef(props, 'visible'), () => {
  if (props.visible && !animationStarted.value) {
    gsap.to('.stat-section', {
      y: 0,
      opacity: 1,
      stagger: 0.3,
      duration: 0.3,
    });

    animationStarted.value = true;
  }
});
</script>
