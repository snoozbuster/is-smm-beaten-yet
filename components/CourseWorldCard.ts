import type { SetupContext } from 'vue';

export default function CourseWorldCard(_props: {}, { slots }: SetupContext) {
  return h(
    'div',
    {
      class: [
        'grid place-content-center text-center',
        'bg-course-world-card text-course-world-card-contrast rounded-2xl shadow-lg p-4',
      ],
    },
    slots.default?.(),
  );
}
