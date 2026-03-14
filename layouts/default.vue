<template>
  <div class="min-h-dvh flex flex-col" :class="layoutBackgroundClass">
    <!-- Mobile drawer (slides in from left) -->
    <aside
      class="drawer fixed left-0 top-0 z-30 h-dvh w-[280px] flex flex-col bg-smm-menu-drawer transition-transform duration-300 ease-out lg:hidden"
      :class="drawerOpen ? 'translate-x-0' : '-translate-x-full'"
      :aria-hidden="!drawerOpen"
    >
      <div
        class="flex shrink-0 items-center gap-2 border-b border-black/10 px-3 py-3"
      >
        <NuxtLink
          to="/#menu"
          class="flex h-9 w-9 shadow shrink-0 items-center justify-center rounded-md bg-smm-menu-button text-black transition hover:brightness-95"
          aria-label="Go to home"
          @click="drawerOpen = false"
        >
          <Icon name="material-symbols:door-open" class="text-xl" />
        </NuxtLink>
        <h2
          class="mt-1 flex-1 text-center text-smm text-xl uppercase text-black"
        >
          Main Menu
        </h2>
        <button
          type="button"
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-smm-menu-button-active text-white transition hover:opacity-90"
          aria-label="Close menu"
          @click="drawerOpen = false"
        >
          <Icon name="mdi:close" class="text-xl" />
        </button>
      </div>
      <nav class="flex flex-1 flex-col gap-1 p-3" aria-label="Main menu">
        <NuxtLink
          v-for="item in navLinks"
          :key="item.path"
          :to="item.path"
          class="drawer-link rounded-md shadow px-4 py-3 text-left text-sm font-medium no-underline transition"
          active-class="drawer-link--active"
          @click="drawerOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main content (slides right when drawer open) -->
    <div
      class="content-wrapper min-h-dvh flex flex-1 flex-col transition-transform duration-300 ease-out"
      :class="drawerOpen ? 'translate-x-[280px] lg:translate-x-0 relative' : ''"
      @click.capture="
        (e) => {
          if (drawerOpen) {
            drawerOpen = false;
            e.stopPropagation();
            e.preventDefault();
          }
        }
      "
    >
      <header
        class="sticky rounded-lg top-0 z-10 flex flex-wrap items-center justify-between gap-2 px-4 py-2 text-course-world-contrast shadow-lg bg-[#17C9A9]"
      >
        <nav class="flex items-center gap-4" aria-label="Main">
          <!-- Hamburger: visible only below lg -->
          <button
            type="button"
            class="hamburger flex h-10 w-10 shrink-0 items-center justify-center rounded border-2 border-white bg-smm-menu-hamburger text-white transition active:scale-90 active:opacity-75 lg:hidden"
            aria-label="Open menu"
            :aria-expanded="drawerOpen"
            @click.stop="drawerOpen = !drawerOpen"
          >
            <Icon name="mdi:menu" class="text-4xl" />
          </button>
          <!-- Door to main menu: visible at lg and above -->
          <NuxtLink
            to="/#menu"
            class="hidden h-9 w-9 shrink-0 items-center justify-center rounded-md bg-course-world-button text-course-world-button-text transition hover:bg-course-world-button-active hover:text-white lg:flex"
            aria-label="Go to main menu"
          >
            <Icon name="material-symbols:door-open" class="text-xl" />
          </NuxtLink>
          <!-- Nav links: visible at lg and above -->
          <NuxtLink
            v-for="item in navLinks"
            :key="item.path"
            :to="item.path"
            class="nav-btn hidden rounded-md px-3 py-1.5 text-sm no-underline transition-[background-color,color,transform] bg-course-world-button text-course-world-button-text hover:bg-course-world-button-active hover:text-white lg:inline-block"
            active-class="nav-btn--active"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
        <div class="ml-auto">
          <PlayerSearch />
        </div>
      </header>
      <main class="flex-1">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<style scoped>
.drawer {
  box-shadow: inset -4px 0 8px rgba(0, 0, 0, 0.5);
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

/* Drawer nav links */
.drawer-link {
  background-color: var(--smm-menu-button);
  color: black;
}

.drawer-link--active {
  background-color: var(--smm-menu-button-active);
  color: white;
}

.drawer-link:hover:not(.drawer-link--active) {
  filter: brightness(0.97);
}
</style>

<script setup lang="ts">
const route = useRoute();

const navLinks: { label: string; path: string }[] = [
  { label: 'Hall of Fame', path: '/leaderboards' },
  { label: 'Courses', path: '/levels' },
];

const drawerOpen = ref(false);

const scrollLock = useScrollLock(() =>
  typeof document !== 'undefined' ? document.body : null,
);
watch(drawerOpen, (open) => {
  scrollLock.value = open;
});

/** Background behind the header; matches the page so rounded header corners blend. */
const layoutBackgroundClass = computed(() =>
  route.path === '/leaderboards' ? 'bg-black' : 'bg-course-world',
);
</script>
