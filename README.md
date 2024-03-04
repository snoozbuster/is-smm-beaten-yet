# Is Super Mario Maker Beaten Yet?

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/X8X2V965S)

Webapp providing stats for Team 0%'s goal of clearing every Super Mario Maker 1 level before server shutdown.

## Development

### Technology

Built with Nuxt 3. Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

Also using Tailwind CSS, Typescript, PrimeVue, VueUse, lodash, and the other usual suspects such as prettier and eslint. Includes a [customized version](./viewer/) of [`smm-course-viewer`](https://github.com/TheCryptan/smm-course-viewer/blob/master/draw/Draw.js), originally built by [Leonardo Mauro](https://github.com/leomaurodesenv).

### Setup

Requires Node 18 and yarn (`npm install -g yarn` if Node is already installed).

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev # or yarn run dev
```

### Locally preview production build:

```bash
# npm
npm run preview
```

### Deployment

Deployed on AWS Amplify.
