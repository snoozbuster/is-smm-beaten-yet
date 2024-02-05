import colors from 'tailwindcss/colors';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.scss',
    'primevue/resources/themes/mdc-light-indigo/theme.css',
  ],
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    'nuxt-lodash',
    'nuxt-primevue',
  ],
  primevue: {
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    components: {
      prefix: 'Prime',
    },
    options: {
      ripple: true,
      pt: {
        tabMenu: {
          root: {
            style: {
              'min-height': '41px',
            },
          },
          menu: {
            class: 'bg-inherit',
          },
          action: {
            class: 'uppercase',
          },
        },
      },
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    exposeConfig: true,
    config: {
      theme: {
        colors: {
          ...colors,
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
