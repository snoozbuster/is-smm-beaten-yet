import { ClientOnly } from '#components';
import { initChartJs } from '~/charts/chartjsInit';

export default defineComponent({
  setup(_, { slots }) {
    initChartJs();

    return () =>
      h(
        ClientOnly,
        {},
        {
          default: () =>
            h(
              'div',
              {
                class:
                  'position-relative min-h-0 w-full h-full max-h-[30vh] xl:max-h-[40vh]',
              },
              slots.default?.(),
            ),
        },
      );
  },
});
