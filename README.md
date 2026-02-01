# Is Super Mario Maker Beaten Yet?

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/X8X2V965S)

Webapp providing stats for Team 0%'s goal of clearing every Super Mario Maker 1 level before server shutdown.

## Development

### Technology

Built with Nuxt 3. Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

Also using Tailwind CSS, Typescript, PrimeVue, VueUse, lodash, and the other usual suspects such as prettier and eslint. Includes a [customized version](./viewer/) of [`smm-course-viewer`](https://github.com/TheCryptan/smm-course-viewer/blob/master/draw/Draw.js), originally built by [Leonardo Mauro](https://github.com/leomaurodesenv).

### Project structure

- `pages/` — routes
- `components/` — UI
- `composables/` — shared logic
- `constants/`, `types/` — level data and types (see [constants/levelData.ts](./constants/levelData.ts))
- `scripts/` — data pipeline (Node + Python)
- `viewer/` — forked SMM level parser/drawer (see [viewer/README.md](./viewer/README.md))
- `amplify/` — see below

Runtime data comes from static JSON at `DATA_ROOT_URL` (see [constants/levelData.ts](./constants/levelData.ts)).

### Architecture

The app is effectively client-side with minimal SSR. All data is statically generated and served as JSON (and per-level assets) from a CDN; there is no traditional backend. AWS/hosting details are not documented in-repo.

### Amplify / backend

The `amplify/` folder contains Lambda functions. **DiscordErrorNotifier** is in use and deployed. **SyncLevelsGSheets** is no longer deployed because all the levels have been cleared and there are no more ongoing updates to the underlying Team 0% spreadsheet. It is kept as a reference and run locally when regenerating the final dataset; there are no plans to deploy it to AWS again.

### Data pipeline

Static data is produced by scripts in `scripts/` from the OneDrive dataset (and optionally the Google sheet). Pipeline details will be documented separately; for now see the script names and usage in each file (e.g. `build-static-data.js`, `extract-course-data.js`, `compile-level-json.js`).

### Nuxt / imports

Nuxt auto-imports components, composables, and utilities; explicit imports are used for `node_modules`, the `viewer/` code, and some assets (e.g. `import.meta.glob` or direct imports).

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

### Locally preview production build

```bash
npm run build
npm run preview
```

### Linting and type checking

- **Commands**: `yarn lint` (check), `yarn lintfix` (auto-fix format + ESLint), `yarn typecheck` (TypeScript).
- **Scope**: ESLint runs on `.ts`, `.vue`, and `.js` (including `viewer/` and `scripts/`). Typecheck runs on the Nuxt/TS app only (`.ts` and `.vue`); plain `.js` in viewer or scripts is not type-checked.
- **No unit tests**: This project has no unit testing setup by design; the repo is not intended for long-term development. Do not add test frameworks or tests.

### Dataset

An open-source website based on viewing a closed-source dataset is not truly open-source, so an archive of the data used to power the site can be downloaded [from OneDrive](https://1drv.ms/u/s!At9TlyN3lZicvoFRzKH1xoc1H-0QUQ?e=eF9Jg6) (warning: ~4.5GB). This archive primarily contains level data originally downloaded from the SMM1 servers while they were still online, as well as a handful of related files. A scant inventory is included as well which details the contents of the archive and which [scripts](./scripts/) in this repo were used to build them and/or can be used to expand them into the other files that the webapp uses.

Additionally, [a (very large) Google sheet](https://docs.google.com/spreadsheets/d/1D7C_Qj7HbbnF7CiEABcr1VUPu2peQfkPfJPRr1Vuwag/edit#gid=1915966869) is available which was used to analyze and assemble the final dataset of cleared levels used for the site. It may also be of interest to anyone looking to reconstruct the full site data or perform deeper analyses on the Team 0% dataset.

### Contributing

See the docs above (project structure, architecture, data pipeline placeholder, [viewer/README.md](./viewer/README.md)). For AI contributors, see [AGENTS.md](./AGENTS.md) and `.cursor/rules/`.
