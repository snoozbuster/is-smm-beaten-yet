<template>
  <section
    class="text-center grid place-content-center bg-smm-yellow uppercase relative overflow-hidden"
  >
    <div
      v-if="isMarioDay"
      class="bg-[url('~/assets/img/banner.png')] bg-center select-none bg-no-repeat bg-contain h-[50px] text-center text-white mb-4 text-xl pt-[5px]"
    >
      Happy MAR10 Day!
    </div>
    <span class="text-smm sm:text-2xl mb-10">
      Is Super Mario Maker beaten yet?</span
    >
    <h1
      id="the-answer"
      class="text-smm leading-tight md:leading-none"
      :class="[!animationStarted && 'opacity-0']"
    >
      {{ theAnswer }}
    </h1>
    <Yatta v-if="theAnswer === 'Yes'" />

    <SocialLinks
      class="absolute top-0 right-0 p-7 opacity-50 hover:opacity-100 transition-opacity hidden sm:flex"
    />

    <div
      class="flex flex-col md:flex-row absolute bottom-0 left-0 p-4 h-[150px] md:w-[150px] md:h-auto items-center"
    >
      <PrimeSlider
        class="block md:hidden h-full mb-2"
        v-model="finalVolume"
        :min="0"
        :max="1"
        :step="0.01"
        orientation="vertical"
      />
      <button
        @click="
          () => {
            audioPreference.muted = muted = !muted;
            if (!muted && !audioPreference.volume) {
              audioPreference.volume = 0.4;
            }
          }
        "
      >
        <Icon
          :name="
            muted === false
              ? 'mingcute:volume-line'
              : 'mingcute:volume-off-line'
          "
          size="24"
        />
      </button>
      <PrimeSlider
        class="hidden md:block w-full ml-2"
        v-model="finalVolume"
        :min="0"
        :max="1"
        :step="0.01"
      />

      <audio ref="slapSound" crossorigin="anonymous" preload="auto">
        <source src="~/assets/sound/slapp.ogg" />
        <source src="~/assets/sound/slapp.mp3" />
      </audio>
    </div>
  </section>
</template>

<style lang="scss" scoped>
#the-answer {
  font-size: clamp(8rem, 20vw, 20rem);
  user-select: none;
}

:deep(.word) {
  @apply ml-[0.1em] -mr-[0.1em];

  &:first-of-type:not(:last-of-type) {
    @apply ml-[0.15em];
  }

  &:not(:first-of-type:last-of-type) {
    // need the above adjustments when there is only 1 word even on large screens.
    // for 2 words, adjustments are not necessary on large screens
    @apply md:mx-0;
  }
}

:deep(.char) {
  position: relative;

  .text {
    opacity: 0;
    transition: transform, opacity;
  }

  .cat-paw {
    position: absolute;
    top: 40%;
    left: 45%;
    max-width: clamp(100px, 50vw, 300px);
    opacity: 0;

    transform-origin: 20px 20px;
    transition: transform, opacity;
    pointer-events: none;
    z-index: 1;
  }

  .starburst {
    position: absolute;
    left: 40%;
    top: 45%;
    transform: translateX(-50%) translateY(-50%);
    width: 0.5ch;
    height: 0.5ch;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: inherit;
      z-index: -1;
    }

    &::before {
      transform: rotate(30deg);
    }
    &::after {
      transform: rotate(-30deg);
    }
  }
}
</style>

<script setup lang="ts">
import SplitType from 'split-type';
import gsap from 'gsap';
import catPaw from '~/assets/img/cat_paw.png';
import { useTheAnswer } from '~/composables/useUnclearedLevels';
import { DateTime } from 'luxon';

const { theAnswer } = await useTheAnswer();

const animationStarted = ref(false);

const audioPreference = useCookie('audioSettings', {
  default: () => ({
    volume: 0.4,
    muted: undefined as boolean | undefined,
  }),
});
// need local copy because preference is allowed to be undefined (which means
// "use browser autoplay policy") but we need an actual yes/no value to find out
// if we should be muted or not
const muted = ref(audioPreference.value.muted);

const slapSound = ref<HTMLAudioElement>();

const finalVolume = computed({
  get: () => (muted.value !== false ? 0 : audioPreference.value.volume),
  set(value) {
    audioPreference.value.muted = muted.value = !value;
    audioPreference.value.volume = value;
  },
});

watch(finalVolume, () => {
  getAudioController().vol.gain.value = finalVolume.value;
});

const isMarioDay = ref(false);

const getChildren = (
  targets: HTMLCollectionOf<Element> | Element[],
  className: string,
) =>
  useFlatMap(targets, (e) =>
    useFilter([...e.children, e], (c) => c.classList.contains(className)),
  ) as HTMLElement[];

const getAudioController = useMemoize(() => {
  const ac = new AudioContext();
  const vol = ac.createGain();
  vol.gain.value = finalVolume.value;
  return {
    ac,
    vol,
  };
});

async function playSlapSound() {
  const { ac, vol } = getAudioController();
  if (ac.state === 'suspended') {
    ac.resume();
  }

  const newSlapSound = slapSound.value!.cloneNode(true) as HTMLAudioElement;
  newSlapSound.playbackRate = 1.15;
  newSlapSound.preservesPitch = true;
  const track = ac.createMediaElementSource(newSlapSound);
  track.connect(vol).connect(ac.destination);
  try {
    await newSlapSound.play();
    if (audioPreference.value.muted === undefined) {
      audioPreference.value.muted = muted.value = false;
    }
    newSlapSound.onended = () => {
      track.disconnect();
      newSlapSound.remove();
    };
  } catch (e) {
    if ((e as Error).name === 'NotAllowedError') {
      muted.value = true;
    }
  }
}

function makeAnimation(targets: HTMLCollectionOf<Element> | Element[]) {
  const paws = getChildren(targets, 'cat-paw');
  const bursts = getChildren(targets, 'starburst');
  const letters = getChildren(targets, 'text');

  bursts.forEach((b) => {
    b.style.opacity = '0';
  });

  const tl = gsap.timeline();
  const pawAnimLength = 0.25;
  const pawFadeOutTime = 0.1;
  const stagger = { amount: 1 };
  tl.to(
    paws,
    {
      keyframes: [
        {
          y: 0,
          x: 0,
          startAt: {
            opacity: 1,
            transform: `rotate(random(0, 360, 5)deg) translateX(50%) translateY(50%)`,
          },
          duration: pawAnimLength,
          ease: 'circ.out',
        },
        { opacity: 0, duration: pawFadeOutTime, ease: 'none' },
      ],
      stagger,
    },
    'pawIn',
  ).to(
    bursts,
    {
      keyframes: [
        {
          scale: 1,
          duration: pawFadeOutTime,
          startAt: {
            opacity: 1,
            background: 'yellow',
            scale: 0,
          },
          background: 'red',
          onStart() {
            playSlapSound();
          },
        },
        {
          opacity: 0,
          duration: 0,
        },
      ],
      stagger,
    },
    `pawIn+=${pawAnimLength - pawFadeOutTime}`,
  );

  if (letters.length) {
    tl.to(
      letters,
      {
        opacity: 1,
        stagger,
        duration: 0.05,
      },
      '<',
    );
  }

  return tl;
}

onMounted(() => {
  isMarioDay.value = DateTime.now().hasSame(
    DateTime.fromISO('2024-03-10'),
    'day',
  );
  nextTick(() => {
    // eslint-disable-next-line no-new
    new SplitType('#the-answer');

    function addAnimationElements(parentEl: Element) {
      const starburst = document.createElement('div');
      starburst.classList.add('starburst');
      parentEl.appendChild(starburst);
      const img = new Image();
      img.classList.add('inline', 'cat-paw');
      img.src = catPaw;
      parentEl.appendChild(img);

      return [starburst, img];
    }

    function removeAnimationElements(parentEl: Element) {
      getChildren(parentEl.children, 'cat-paw').forEach((e) => e.remove());
      getChildren(parentEl.children, 'starburst').forEach((e) => e.remove());

      parentEl.addEventListener('mousedown', () => {
        const newEls = addAnimationElements(parentEl);
        makeAnimation(newEls).then(() => newEls.forEach((e) => e.remove()));
      });
    }

    useForEach(document.getElementsByClassName('char'), (el) => {
      const text = document.createElement('span');
      text.innerHTML = el.innerHTML;
      text.classList.add('text', 'inline-block');
      el.replaceChildren(text);

      addAnimationElements(el);
    });

    makeAnimation(document.getElementsByClassName('char')).then(() =>
      useForEach(
        document.getElementsByClassName('char'),
        removeAnimationElements,
      ),
    );
    animationStarted.value = true;
  });
});
</script>
