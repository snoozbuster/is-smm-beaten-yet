// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@invictus.codes/nuxt-vuetify',
  ],
  vuetify: {
    moduleOptions: {
      treeshaking: true,
    },
  },
});
