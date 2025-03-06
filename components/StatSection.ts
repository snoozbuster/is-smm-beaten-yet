import type { FunctionalComponent } from 'vue';
import CourseWorldCard from '~/components/CourseWorldCard';

const StatSection: FunctionalComponent<{ card?: boolean }> = (
  props,
  { slots, attrs },
) =>
  props.card
    ? h(CourseWorldCard, attrs, { default: slots.default })
    : h(
        'div',
        {
          class: ['stat-section grid place-content-center text-center'],
        },
        { default: slots.default },
      );
StatSection.props = {
  card: {
    type: Boolean,
    default: false,
  },
};

export default StatSection;
