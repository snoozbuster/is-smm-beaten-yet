<template>
  <img
    v-if="award.name === '1000 Clears'"
    class="inline"
    src="~/assets/img/badges/1kswitch.webp"
    :height="size"
    :width="size"
    :alt="award.name"
    v-tooltip.hover.bottom="tooltipText"
  />
  <img
    v-else-if="award.name === '2500 Clears'"
    class="inline"
    src="~/assets/img/badges/2.5kswitch.webp"
    :height="size"
    :width="size"
    :alt="award.name"
    v-tooltip.hover.bottom="tooltipText"
  />
  <img
    v-else-if="award.name === 'Choreographer'"
    class="inline"
    src="~/assets/img/badges/choreographer.png"
    :height="size"
    :width="size"
    :alt="award.name"
    v-tooltip.hover.bottom="tooltipText"
  />
  <img
    v-else-if="award.name === 'Big Brain'"
    class="inline"
    src="~/assets/img/badges/big_brain.webp"
    :height="size"
    :width="size"
    :alt="award.name"
    v-tooltip.hover.bottom="tooltipText"
  />
  <img
    v-else-if="award.name === 'Herb Trimmer'"
    class="inline"
    src="~/assets/img/badges/tth.png"
    :height="size"
    :width="size"
    :alt="award.name"
    v-tooltip.hover.bottom="tooltipText"
  />
  <Icon
    v-else-if="award.name in ICON_MAP"
    :name="ICON_MAP[award.name]"
    :size="size"
    :alt="award.name"
    v-tooltip.hover.bottom="tooltipText"
  />
</template>

<script setup lang="ts">
import type { PlayerAward } from '~/types/players';

const props = defineProps({
  award: {
    type: Object as PropType<PlayerAward>,
    required: true,
  },
  size: {
    type: [Number, String],
    default: '16',
  },
});

const ICON_MAP = {
  Sniper: 'streamline:target-solid',
  Leprechaun: 'fluent-emoji-flat:four-leaf-clover',
  'Human TAS': 'mdi:robot-off',
  VIP: 'icon-park:vip-one',
  Developer: 'hugeicons:computer-programming-01',
  Edgelord: 'nrk:super-emoji-poop-angry',
};

const { formatDate } = useFormatters();

const tooltipText = computed(() => {
  switch (props.award.name) {
    case '1000 Clears':
      return 'Awarded for achieving over 1000 clears in SMM1';
    case '2500 Clears':
      return 'Awarded for achieving over 2500 clears in SMM1';
    case 'Edgelord':
      return 'Awarded for being extremely rude to the author of this website';
    default: {
      if (props.award.awardDate && isString(props.award.reason)) {
        return [
          'Awarded on',
          formatDate(props.award.awardDate),
          'for',
          useLowerFirst(props.award.reason),
        ].join(' ');
      }
      if (isString(props.award.reason)) {
        return props.award.reason;
      }

      const notabilityReasons = {
        'Human TAS': 'clearing a brutally precise level',
        Leprechaun: 'winning the Lucky Draw lottery',
        Choreographer: 'clearing the final uncleared level',
        'Herb Trimmer': 'trimming the herbs',
      };
      return [
        'Awarded on',
        formatDate(props.award.awardDate!),
        'for',
        notabilityReasons[props.award.name],
        `(${props.award.reason?.levelId})`,
      ].join(' ');
    }
  }
});
</script>
