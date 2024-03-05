import colors from 'tailwindcss/colors';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    cdnURL: 'https://static.issmmbeatenyet.com/nuxt',
  },
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
    cssLayerOrder:
      'tailwind-base, primevue, primevue-overrides, tailwind-utilities',
    components: {
      prefix: 'Prime',
      include: [
        'TabMenu',
        'InputText',
        'VirtualScroller',
        'Menu',
        'DataTable',
        'InputSwitch',
        'InputNumber',
        'Checkbox',
        'Button',
        'Column',
        'Skeleton',
        'MultiSelect',
        'Toast',
        'ProgressBar',
        'Tag',
        'TriStateCheckbox',
        'Dropdown',
        'OverlayPanel',
        'Dialog',
        'Calendar',
      ],
    },
    directives: {
      include: ['Ripple', 'Tooltip'],
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
    editorSupport: true,
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
