import type { SetupContext } from 'vue';

export default function (_: {}, { slots }: SetupContext) {
  return h(
    'div',
    {
      class:
        'position-relative min-h-0 w-full h-full max-h-[30vh] xl:max-h-[40vh]',
    },
    slots.default?.(),
  );
}
