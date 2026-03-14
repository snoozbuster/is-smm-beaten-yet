<template>
  <div class="min-h-dvh flex flex-col">
    <header
      class="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-2 bg-black px-4 py-2 text-smm-yellow"
    >
      <nav class="flex items-center gap-4" aria-label="Main">
        <NuxtLink to="/#menu" class="font-medium hover:underline">
          Is SMM Beaten Yet?
        </NuxtLink>
        <NuxtLink
          to="/leaderboards"
          class="text-sm hover:underline"
          active-class="underline"
        >
          Hall of Fame
        </NuxtLink>
        <NuxtLink
          to="/levels"
          class="text-sm hover:underline"
          active-class="underline"
        >
          Courses
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
</template>
