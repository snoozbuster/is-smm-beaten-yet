# Is Super Mario Maker Beaten Yet?

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/X8X2V965S)

Webapp providing stats for Team 0%'s goal of clearing every Super Mario Maker 1 level before server shutdown.

## Development

### Technology

Built with Nuxt 3. Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

Also using Tailwind CSS, Typescript, PrimeVue, VueUse, lodash, and the other usual suspects such as prettier and eslint. Includes a [customized version](./viewer/) of [`smm-course-viewer`](https://github.com/TheCryptan/smm-course-viewer/blob/master/draw/Draw.js), originally built by [Leonardo Mauro](https://github.com/leomaurodesenv).

### Setup

Requires Node 18 (some scripts may require Node 21) and yarn (`npm install -g yarn` if Node is already installed).

Make sure to install the dependencies:

```bash
yarn install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev # or yarn run dev
```

### Locally preview production build:

```bash
npm run build
npm run preview
```

### Dataset

An open-source website based on viewing a closed-source dataset is not truly open-source, so an archive of the data used to power the site can be downloaded [from OneDrive](https://1drv.ms/u/s!At9TlyN3lZicvoFRzKH1xoc1H-0QUQ?e=eF9Jg6) (warning: ~4.5GB). This archive primarily contains level data originally downloaded from the SMM1 servers while they were still online, as well as a handful of related files. A scant inventory is included as well which details the contents of the archive and which [scripts](./scripts/) in this repo were used to build them and/or can be used to expand them into the other files that the webapp uses.

Additionally, [a (very large) Google sheet](https://docs.google.com/spreadsheets/d/1D7C_Qj7HbbnF7CiEABcr1VUPu2peQfkPfJPRr1Vuwag/edit#gid=1915966869) is available which was used to analyze and assemble the final dataset of cleared levels used for the site. It may also be of interest to anyone looking to reconstruct the full site data or perform deeper analyses on the Team 0% dataset.
