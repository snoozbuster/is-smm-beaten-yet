<template>
  <div class="w-fit text-center">
    <div
      class="miiverse-comment text-nowrap relative border-[12px] border-white rounded-2xl text-lg py-1 px-2 select-none"
    >
      <template v-if="message !== ':gb:'">{{ message }}</template>
      <img
        v-else
        class="inline"
        src="~/assets/img/geistbeck.png"
        width="32"
        height="32"
        alt=":gb:"
      />
    </div>
    <img
      :src="faceImg"
      class="inline invert object-cover rounded-full bg-black object-[0px_3px] mt-[14px]"
      alt="comment face"
    />
  </div>
</template>

<style lang="scss" scoped>
.miiverse-comment {
  background-color: #cbccc7;

  &::before {
    content: ' ';
    position: absolute;
    background-image: url('~/assets/img/miiverse/carat.png');
    width: 24px;
    height: 14px;
    left: 50%;
    top: calc(100% + 12px);
    transform: translateX(-50%);
  }
}
</style>

<script setup lang="ts">
import happyFace from '~/assets/img/miiverse/happy.png';
import surprisedFace from '~/assets/img/miiverse/surprised.png';
import winkFace from '~/assets/img/miiverse/wink.png';
import normalFace from '~/assets/img/miiverse/normal.png';
import puzzledFace from '~/assets/img/miiverse/puzzled.png';
import frustratedFace from '~/assets/img/miiverse/frustrated.png';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  face: {
    type: String as PropType<
      'happy' | 'surprised' | 'wink' | 'puzzled' | 'frustrated' | 'normal'
    >,
    default: 'happy',
  },
});

const faceImg = computed(
  () =>
    ({
      happy: happyFace,
      surprised: surprisedFace,
      wink: winkFace,
      normal: normalFace,
      frustrated: frustratedFace,
      puzzled: puzzledFace,
    })[props.face],
);
</script>
