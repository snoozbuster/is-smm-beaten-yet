<template>
  <div class="min-h-dvh flex flex-col" :class="layoutBackgroundClass">
    <header
      class="sticky rounded-lg top-0 z-10 flex flex-wrap items-center justify-between gap-2 px-4 py-2 text-course-world-contrast shadow-lg bg-[#17C9A9]"
    >
      <nav class="flex items-center gap-4" aria-label="Main">
        <NuxtLink to="/#menu" class="font-medium hover:underline">
          Is SMM Beaten Yet?
        </NuxtLink>
        <NuxtLink
          to="/leaderboards"
          class="nav-btn rounded-md px-3 py-1.5 text-sm no-underline transition-[background-color,color,transform] bg-course-world-button text-course-world-button-text hover:bg-course-world-button-active hover:text-white"
          active-class="nav-btn--active"
        >
          Hall of Fame
        </NuxtLink>
        <NuxtLink
          to="/levels"
          class="nav-btn rounded-md px-3 py-1.5 text-sm no-underline transition-[background-color,color,transform] bg-course-world-button text-course-world-button-text hover:bg-course-world-button-active hover:text-white"
          active-class="nav-btn--active"
        >
          Courses
        </NuxtLink>
      </nav>
      <div class="ml-auto">
        <PlayerSearch />
      </div>
    </header>
    <!-- <div class="border-b border-smm-yellow/20 bg-black/80">
      <AppBreadcrumbs />
    </div> -->
    <main class="flex-1">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.nav-btn {
  display: inline-block;
  border: none;
}

.nav-btn--active {
  position: relative;
  transform: translateY(-4px);
  background-color: var(--course-world-button-active) !important;
  color: white !important;
}

.nav-btn--active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 100%);
  border: 6px solid transparent;
  border-top-color: var(--course-world-button-active);
  border-left-width: 6px;
  border-right-width: 6px;
  width: 0;
  height: 0;
}
</style>

<script setup lang="ts">
const route = useRoute();

/** Background behind the header; matches the page so rounded header corners blend. */
const layoutBackgroundClass = computed(() =>
  route.path === '/leaderboards' ? 'bg-black' : 'bg-course-world',
);
</script>
