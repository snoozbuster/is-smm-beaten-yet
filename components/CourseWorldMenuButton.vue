<template>
  <div class="course-world-btn-wrap flex w-full flex-col items-center gap-1">
    <NuxtLink
      :to="to"
      class="text-smm course-world-btn relative flex w-full items-center justify-center py-3 text-center text-lg uppercase text-white shadow-lg transition hover:opacity-95"
      :class="colorClass"
    >
      <span
        class="course-world-rivet course-world-rivet-tl"
        aria-hidden="true"
      />
      <span
        class="course-world-rivet course-world-rivet-tr"
        aria-hidden="true"
      />
      <span
        class="course-world-rivet course-world-rivet-bl"
        aria-hidden="true"
      />
      <span
        class="course-world-rivet course-world-rivet-br"
        aria-hidden="true"
      />
      <slot />
    </NuxtLink>
    <span class="course-world-arrow hidden md:block" aria-hidden="true" />
  </div>
</template>

<script setup lang="ts">
type ButtonColor = 'red' | 'teal' | 'purple';

const props = withDefaults(
  defineProps<{
    to: string;
    color?: ButtonColor;
  }>(),
  { color: 'red' },
);

const colorClass = computed(() => {
  const map: Record<ButtonColor, string> = {
    red: 'bg-100-mario-red',
    teal: 'bg-course-world',
    purple: 'bg-makers-purple',
  };
  return map[props.color];
});
</script>

<style scoped>
.course-world-btn {
  border: 3px solid #fbcd0e;
  border-radius: 12px;
  transition: border-color 0.2s ease;
}

/* Corner rivets (dots) inset inside the button - match border yellow, white on hover */
.course-world-rivet {
  position: absolute;
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background: #fbcd0e;
  transition: background-color 0.2s ease;
  pointer-events: none;
}
.course-world-btn-wrap:hover .course-world-rivet {
  background: white;
}
.course-world-rivet-tl {
  top: 0.4rem;
  left: 0.4rem;
}
.course-world-rivet-tr {
  top: 0.4rem;
  right: 0.4rem;
}
.course-world-rivet-bl {
  bottom: 0.4rem;
  left: 0.4rem;
}
.course-world-rivet-br {
  bottom: 0.4rem;
  right: 0.4rem;
}

.course-world-btn-wrap:hover .course-world-btn {
  border-color: white;
}

.course-world-arrow {
  width: 0;
  height: 0;
  border-left: 0.6rem solid transparent;
  border-right: 0.6rem solid transparent;
  border-top: 0.6rem solid #fbcd0e;
  margin-top: 0.25rem;
  transition: border-top-color 0.2s ease;
}

.course-world-btn-wrap:hover .course-world-arrow {
  border-top-color: white;
}
</style>
