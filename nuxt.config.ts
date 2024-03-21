import colors from 'tailwindcss/colors';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $production: {
    experimental: {
      inlineSSRStyles: false,
    },
  },
  app: {
    cdnURL: 'https://static.issmmbeatenyet.com/',
  },
  hooks: {
    // https://github.com/nuxt/nuxt/issues/18376#issuecomment-1515242958
    'build:manifest': (manifest) => {
      const NO_PREFETCH_ASSETS = ['.webp', '.jpg', '.png', '.gif'];
      const ALLOWED_PREFETCH_PREFIXES = [
        'cat_paw',
        'slapp',
        'geistbeck',
        'first_clear',
      ];

      for (const key in manifest) {
        const file = manifest[key];

        if (file.assets) {
          file.assets = file.assets.filter(
            (asset: string) =>
              ALLOWED_PREFETCH_PREFIXES.some((prefix) =>
                asset.startsWith(prefix),
              ) || NO_PREFETCH_ASSETS.every((ext) => !asset.endsWith(ext)),
          );
        }
      }
    },
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
        'Slider',
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
