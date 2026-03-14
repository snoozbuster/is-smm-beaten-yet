<template>
  <div class="animation-container">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.animation-container:has(.slide-down-leave-active) {
  height: 100dvh;
  overflow: hidden;
}

.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.35s;
}

.slide-up-leave-active,
.slide-down-leave-active {
  z-index: 0;
}

.slide-down-leave-active {
  scrollbar-width: none;
}

.slide-down-enter-active,
.slide-up-enter-active {
  position: fixed;
  z-index: 1;
  inset: 0;
  overflow: auto;
}

.slide-up-leave-to,
.slide-down-enter-from {
  transform: translateY(-100vh);
}

.slide-up-enter-from,
.slide-down-leave-to {
  transform: translateY(100vh);
}

.slide-up-enter-to,
.slide-down-enter-to {
  transform: translateY(0);
}
</style>
