import type { SetupContext } from 'vue';

export default function CourseWorldCard(
  props: { grid: boolean },
  { slots }: SetupContext,
) {
  return h(
    'div',
    {
      class: [
        props.grid && 'grid place-content-center',
        ' text-center bg-course-world-card text-course-world-card-contrast rounded-2xl shadow-lg p-4',
      ],
    },
    slots.default?.(),
  );
}
CourseWorldCard.props = {
  grid: {
    type: Boolean,
    default: true,
  },
};
