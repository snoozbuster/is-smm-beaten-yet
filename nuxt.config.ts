import colors from 'tailwindcss/colors';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $production: {
    features: {
      inlineStyles: false,
    },
  },

  app: {
    cdnURL: 'https://static.issmmbeatenyet.com/',
    layoutTransition: { name: 'slide-up', mode: 'default' },
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
    '@nuxt/icon',
    'nuxt-lodash',
    'nuxt-primevue',
  ],
  nitro: {
    awsAmplify: {
      // node 22 wasn't added to types until 3.0 alpha
      runtime: 'nodejs22.x' as any,
    },
  },
  primevue: {
    cssLayerOrder:
      'tailwind-base, primevue, primevue-overrides, tailwind-utilities',
    components: {
      prefix: 'Prime',
      include: [
        'AutoComplete',
        'InputGroup',
        'InputGroupAddon',
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
        extend: {
          boxShadow: {
            drawer: 'inset 4px 0 8px rgba(0,0,0,0.12)',
          },
        },
        colors: {
          ...colors,
          'smm-yellow': '#fbcd0e',
          'course-world': '#0f9280',
          'course-world-contrast': '#91f2e1',
          'course-world-card': '#fdffbe',
          'course-world-card-contrast': '#7f8143',
          'course-world-button': '#7ef4d2',
          'course-world-button-text': '#39b591',
          'course-world-button-hover': '#6ae8c4',
          'course-world-button-active': '#139e7f',
          'smm-menu-hamburger': '#FDDB0A',
          'smm-menu-drawer': '#F9D80B',
          'smm-menu-button': '#FCE40B',
          'smm-menu-button-active': '#313243',
          'makers-purple': 'rgb(108, 67, 161)',
          '100-mario-red': 'rgb(145, 39, 53)',
        },
      },
      plugins: [
        function ({ addBase, theme }: any) {
          addBase({
            ':root': {
              '--course-world-button': theme('colors.course-world-button'),
              '--course-world-button-text': theme(
                'colors.course-world-button-text',
              ),
              '--course-world-button-hover': theme(
                'colors.course-world-button-hover',
              ),
              '--course-world-button-active': theme(
                'colors.course-world-button-active',
              ),
              '--smm-menu-button': theme('colors.smm-menu-button'),
              '--smm-menu-button-active': theme(
                'colors.smm-menu-button-active',
              ),
            },
          });
        },
      ],
    },
  },

  compatibilityDate: '2024-04-20',
});
