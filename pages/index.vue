<template>
  <main class="h-screen" :class="'overflow-hidden'">
    <TheAnswer class="h-screen" />
    <SocialLinks />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Is Super Mario Maker Beaten Yet?',
  ogTitle: 'Is Super Mario Maker Beaten Yet?',
  description: 'Click here to find out!',
  ogDescription: 'Click here to find out!',
  ogImage: {
    url: '/img/mario.png',
    width: 775,
    height: 775,
    alt: 'Mario in a builder outfit',
  },
  twitterCard: 'summary_large_image',
  themeColor: '#fbcd0e',
});

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
