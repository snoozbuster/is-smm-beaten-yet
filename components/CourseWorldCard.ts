import type { FunctionalComponent } from 'vue';

const CourseWorldCard: FunctionalComponent<{ grid?: boolean }> = (
  props,
  { slots },
) => {
  return h(
    'div',
    {
      class: [
        props.grid && 'flex flex-col align-items-center',
        'text-center bg-course-world-card text-course-world-card-contrast rounded-2xl shadow-lg p-4',
      ],
    },
    { default: slots.default },
  );
};
CourseWorldCard.props = {
  grid: {
    type: Boolean,
    default: true,
  },
};

export default CourseWorldCard;
