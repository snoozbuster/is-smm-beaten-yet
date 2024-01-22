// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.scss'],
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@invictus.codes/nuxt-vuetify',
    'nuxt-icon',
    'nuxt-lodash',
  ],
  nitro: {
    storage: {
      levels: {
        driver: 'fs',
        base: './data',
      },
    },
  },
  vuetify: {
    moduleOptions: {
      treeshaking: true,
    },
  },
  tailwindcss: {
    exposeConfig: true,
    config: {
      theme: {
        colors: {
          'smm-yellow': '#fbcd0e',
          'course-world': '#0f9280',
          'course-world-contrast': '#91f2e1',
          'course-world-card': '#fdffbe',
          'course-world-card-contrast': '#7f8143',
        },
      },
    },
  },
});
