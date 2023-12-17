<template>
  <main
    class="text-center h-screen grid place-content-center bg-smm-yellow uppercase overflow-hidden"
  >
    <h1 id="the-answer" :class="!animationStarted && 'hidden'">Not yet</h1>
    <SocialLinks />
  </main>
</template>

<style lang="scss" scoped>
#the-answer {
  font-family: 'Super Mario Maker';
  font-size: clamp(10rem, 20vw, 20rem);
  user-select: none;
  clip-path: polygon(0 0, 100% 1%, 100% 100%, 0% 100%);
}

:deep(.char) {
  opacity: 0;
  transform: translateY(100%);
  transition: transform, opacity;
}
</style>

<script setup lang="ts">
import SplitType from 'split-type';
import gsap from 'gsap';

const animationStarted = ref(false);

onMounted(() => {
  nextTick(() => {
    // https://www.youtube.com/watch?v=va1RrFr-gms
    // eslint-disable-next-line no-new
    new SplitType('#the-answer');
    gsap.to('.char', {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.25,
    });
    animationStarted.value = true;
  });
});
</script>
