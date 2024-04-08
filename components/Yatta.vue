<template>
  <TransitionGroup name="fade">
    <MiiverseMessage
      v-for="message in messages"
      :key="message.message"
      class="absolute hover:z-10"
      :class="message.uppercase ? 'uppercase' : 'normal-case'"
      :message="message.message"
      :face="message.face"
      :style="{
        top: `clamp(56px, ${message.position.top}%, 80%)`,
        left: `${message.position.left}%`,
        transform: message.position.left > 85 ? 'translateX(-100%)' : undefined,
      }"
      :data-pos-x="message.gridPos.x"
      :data-pos-y="message.gridPos.y"
    />
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script lang="ts" setup>
// the number of strings should have a perfect square
const YATTAS = {
  // Danish
  dk: [
    'Fri Bane!', // "All clear"/"Path is clear"
    'Tillyke!', // "Congratulations"
  ],
  // English (US)
  'en-US': ['We did it!', 'gg!', "Let's go!"],
  // English (UK)
  'en-UK': ['Good show!'],
  // Lithuanian
  lt: [
    'Valio!', // "Congratulations"
    'Man pavyko!', // "I managed to do it"
  ],
  // Indonesian
  id: [
    'Saya melakukannya!', // "I did it"
    'Saya sudah selesai!', // "I got the clear"
  ],
  // Chinese (simplified)
  'zh-CN': [
    '过了！', // "Pass"/"Yatta"
    '恭喜！', // "Congratulations"
    '全通了！', // "All cleared"
    '66666666!', // slang for "溜": "Well played"
  ],
  // Chinese (traditional)
  'zh-TW': [
    '萬歲！', // "Long live"
    '太好了！', // "Very good"
    '打通了！', // "Got through"
    '我們做到了！', // "We did it"
  ],
  // Cantonese
  'zh-HK': [
    '恭喜！', // "Congratulations"
    '搞掂！', // "I did it"/"It's done"
    '恭喜！', // "Horray"
  ],
  // Hebrew
  he: [
    'הצלחנו', // "We did it"
    'ברכותיי', // "Congratulations"
    'יאללה', // "Let's go"
  ],
  // Swedish
  sv: [
    'Vi lyckades!', // "We succeeded"
    'Vi gjorde det!', // "We did it"
    'Bra jobbat, allihopa!', // "Good job, everyone"
  ],
  // Italian
  it: [
    'Evviva!', // "Hurrah"
    'Tutto a posto!', // "All clear"
    "Ce l'abbiamo fatta!", // "We did it"
    "E' fatta!", // "It's done"
  ],
  // Hungarian
  hu: [
    'Hurrá!', // "Hooray"
    'Ezaz!', // "This is it"
    'Megcsináltuk!', // "We did it"
    'Kijátszva', // "All clear"
  ],
  // Latvian
  lv: [
    'Mums izdevās!', // "We did it"
    'Pilnīgi izpildīts!', // "Fully cleared"
    'Apsveicam!', // "Congratulations"
  ],
  // Arabic
  ar: [
    '!يلا⁩', // "Let's go"
  ],
  // German
  de: [
    'Ausgezeichnet!', // "Excellent"
    'Saubere Arbeit!', // "Good work"
    'Es ist vollbracht!', // "It's done"
  ],
  // Russian
  ru: [
    'Мы сделали это!', // "We did it"
    'Мы прошли всё!', // "All clear"
  ],
  // Polish
  pl: [
    'Udało się!', // "We did it"
    'Gratulacje!', // "Congratulations"
  ],
  // Basque
  eu: [
    'Zorionak!', // "Congratulations
    'Goazen!', // "Let's go"/"Yatta"
    'Eginda bada!', // "It's done"
  ],
  // Spanish
  es: [
    '¡Enhorabuena!', // "Congratulations"
    '¡Vamos!', // "Let's go"
    '¡Completamos todo!', // "We cleared everything"
  ],
  // Dutch
  nl: [
    'Hoera!', // "Hooray"
    'We hebben het gedaan!', // "We did it"
  ],
  // French
  fr: [
    "Nous l'avons fait ensemble!", // "We did it together"
    'Facile ce jeu!', // "Easy game"
  ],
  // Portugese
  pt: [
    'Conseguimos!', // "We did it"/"Congratulations"
  ],
  // Maori
  mi: [
    'Ka pai!', // "Well done"
  ],
  // Japanese
  jp: [
    'やった！', // "Yatta"
    'yatta!',
    'おめでとう！', // "Congratulations"
  ],
  // Gaelic
  gd: [
    'Cluiche maith!', // "Good game"/"gg"
    'Críochnaithe!', // "Finished"
  ],
} as Record<string, string[]>;

const messageQueue = ref<string[]>([]);
const messages = ref<
  {
    message: string;
    face: 'wink' | 'surprised' | 'happy' | 'puzzled' | 'frustrated' | 'normal';
    position: {
      top: number;
      left: number;
    };
    gridPos: {
      x: number;
      y: number;
    };
    uppercase: boolean;
  }[]
>([]);

onMounted(() => {
  const userLangs = navigator.languages ?? [];
  const preferredLang = userLangs.find((code) => YATTAS[code]);

  if (preferredLang) {
    messageQueue.value = useShuffle(YATTAS[preferredLang]);
  }

  const otherMessages = useShuffle(useFlatMap(useOmit(YATTAS, preferredLang!)));
  messageQueue.value = [...messageQueue.value, ...(otherMessages as string[])];

  const gbIdx = useRandom(
    Math.ceil(messageQueue.value.length * 0.75),
    messageQueue.value.length - 1,
  );

  messageQueue.value.splice(gbIdx, 0, ':gb:');

  const xGrids = Math.sqrt(messageQueue.value.length) + 1;
  const yGrids = Math.sqrt(messageQueue.value.length) - 1;
  const positions = useShuffle(
    useRange(0, xGrids).flatMap((i) =>
      useRange(0, yGrids).map((j) => {
        // adjust out of the center to avoid rendering underneath text as much as possible
        const shouldRelocate =
          (j === 3 && i >= 3 && i <= 5) ||
          (i === 3 && j >= 2 && j <= 5) ||
          (i === 5 && j === 4);
        const relocateX = shouldRelocate && useRandom(0, 1) === 0;
        const relocateY = shouldRelocate && !relocateX;
        const finalX = relocateX
          ? i < xGrids / 2
            ? i % 2
            : (i % 2) + xGrids - 3
          : i;
        const finalY = relocateY
          ? [useRandom(0, 2), useRandom(5, yGrids)][useRandom(0, 1)]
          : j;
        // if (shouldRelocate) {
        //   console.log(
        //     'Original x,y:',
        //     i,
        //     j,
        //     'final x/y:',
        //     finalX,
        //     finalY,
        //     'relocated:',
        //     relocateX ? 'x' : 'y',
        //   );
        // }
        return {
          x: finalX,
          y: finalY,
        };
      }),
    ),
  );

  // console.log(xGrids, yGrids);

  let i = 0;
  while (positions.length < messageQueue.value.length) {
    positions.push({ ...positions[i++] });
  }

  function showNextMessage() {
    const pos = positions.shift()!;
    const xGap = 100 / xGrids;
    const yGap = 100 / (yGrids + 1);
    const message = messageQueue.value.shift()!;
    const position = {
      top: useRandom(pos.y * yGap, (pos.y + 1) * yGap, true),
      left: useRandom(pos.x * xGap, (pos.x + 1) * xGap, true),
    };

    // console.log(
    //   'x:',
    //   pos.x,
    //   'y:',
    //   pos.y,
    //   'position:',
    //   position,
    //   'ybounds:',
    //   pos.y * yGap,
    //   '-',
    //   (pos.y + 1) * yGap,
    //   'xbounds:',
    //   pos.x * xGap,
    //   '-',
    //   (pos.x + 1) * xGap,
    // );
    messages.value.push({
      message,
      face:
        message !== ':gb:'
          ? (['wink', 'surprised', 'happy'] as const)[useRandom(0, 2)]
          : (['wink', 'puzzled', 'normal', 'frustrated'] as const)[
              useRandom(0, 3)
            ],
      position,
      gridPos: pos,
      uppercase: useRandom(0, 10) === 0,
    });
    if (messageQueue.value.length) {
      setTimeout(showNextMessage, useRandom(500, 2000));
    }
  }

  setTimeout(showNextMessage, 1500);
});
</script>
