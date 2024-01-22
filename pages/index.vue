<template>
  <main
    class="h-screen"
    :class="[
      'position-relative',
      dataReady ? 'scroll-snap' : 'overflow-hidden',
    ]"
  >
    <TheAnswer class="pane h-screen" />
    <LevelData
      id="stats"
      class="pane"
      :visible="scrolled"
      @ready="promptScroll"
    />
    <div
      class="fixed bottom-0 p-3 left-2/4 transition-opacity"
      :class="(!dataReady || scrolled) && 'opacity-0'"
      :inert="!dataReady || scrolled"
    >
      <a
        href="#stats"
        class="-translate-x-2/4 mb-20 md:mb-5 text-xl grid place-content-center relative"
        @click.prevent="smoothScroll"
      >
        <div class="scroll-arrow justify-self-center"></div>
        <div>See how we're doing</div>
      </a>
    </div>
    <SocialLinks
      class="absolute bottom-0 right-3 p-7 opacity-50 hover:opacity-100 transition-opacity"
    />
  </main>
</template>

<style lang="scss" scoped>
.scroll-snap {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;

  > .pane {
    scroll-snap-align: start;
  }
}

$size: 30px;
.scroll-arrow {
  width: $size;
  height: $size;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  animation: arrow 2s infinite;
}

@keyframes arrow {
  0% {
    transform: translate(0, -$size) rotate(-45deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(0, 0) rotate(-45deg);
    opacity: 0;
  }
}
</style>

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

const dataReady = ref(false);
const scrolled = ref(false);

let observer: IntersectionObserver;

function promptScroll() {
  dataReady.value = true;
}

function smoothScroll() {
  document
    .getElementById('stats')
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  scrolled.value = true;
}

onMounted(() => {
  nextTick(() => {
    observer = new IntersectionObserver(
      (entries) => {
        scrolled.value = entries.some((entry) => entry.isIntersecting);
        window.location.hash = scrolled.value ? 'stats' : '';
      },
      {
        root: document.getElementsByTagName('main')[0],
        threshold: 0.3,
      },
    );

    observer.observe(document.getElementById('stats')!);
  });
});
</script>
