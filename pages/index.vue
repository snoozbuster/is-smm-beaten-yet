<template>
  <main
    class="h-dvh"
    :class="[
      'position-relative',
      dataReady || forceMenuScroll ? 'scroll-snap' : 'overflow-hidden',
    ]"
  >
    <PrimeToast position="bottom-center" />
    <div class="pane relative h-svh">
      <TheAnswer class="h-svh" />
      <div
        class="absolute bottom-0 pb-3 left-2/4 transition-opacity"
        :class="!dataReady && 'opacity-0'"
        :inert="!dataReady"
      >
        <a
          href="#menu"
          class="-translate-x-2/4 mb-5 text-xl grid place-content-center relative text-center"
          @click.prevent="smoothScroll"
        >
          <div>{{ promptText }}</div>
          <div class="scroll-arrow justify-self-center"></div>
        </a>
      </div>
    </div>
    <CourseWorldMenu
      id="menu"
      class="pane pb-10 md:pb-0 min-h-dvh md:min-h-svh"
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
    transform: translate(0, -$size * 0.5) rotate(-45deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(0, $size * 0.5) rotate(-45deg);
    opacity: 0;
  }
}
</style>

<script setup lang="ts">
import { SMM_YELLOW } from '~/constants/colors';
import marioPng from '~/assets/img/mario.png';

useSeoMeta({
  title: 'Is Super Mario Maker Beaten Yet?',
  ogTitle: 'Is Super Mario Maker Beaten Yet?',
  description: 'Click here to find out!',
  ogDescription: 'Click here to find out!',
  ogImage: {
    url: marioPng,
    width: 775,
    height: 775,
    alt: 'Mario in a builder outfit',
    type: 'image/png',
  },
  ogImageSecureUrl: marioPng,
  twitterCard: 'summary_large_image',
  themeColor: SMM_YELLOW,
});

definePageMeta({
  layout: 'main-menu',
  // I'm not sure if this is needed but it's here for now
  layoutTransition: { name: 'slide-up', mode: 'default' },
  middleware: (to, from) => {
    // I think this only runs when navigating to the home page
    if (to.path === '/') {
      to.meta.layoutTransition = { name: 'slide-down', mode: 'default' };
      from.meta.layoutTransition = { name: 'slide-down', mode: 'default' };
    }
  },
});

const promptText = computed(() => 'Check out the journey');

const route = useRoute();
const dataReady = ref(false);
const forceMenuScroll = ref(false);

function smoothScroll() {
  document
    .getElementById('menu')
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

onMounted(() => {
  dataReady.value = true;
  forceMenuScroll.value = route.hash === '#menu';
  nextTick(() => {
    const menu = document.getElementById('menu');
    if (!menu) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        window.location.hash = visible ? 'menu' : '';
      },
      {
        root: document.getElementsByTagName('main')[0],
        threshold: 0.3,
      },
    );
    if (forceMenuScroll.value) {
      menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => observer.observe(menu), 500);
    } else {
      observer.observe(menu);
    }
  });
});
</script>
