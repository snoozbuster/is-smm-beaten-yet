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
    config: {
      theme: {
        colors: {
          'smm-yellow': '#fbcd0e',
        },
      },
    },
  },
});
