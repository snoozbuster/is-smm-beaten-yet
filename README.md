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

The pipeline has four main data sources (see [docs/data-pipeline.md](docs/data-pipeline.md)):

1. **Cleared levels Google sheet** — The canonical list of levels Team 0% cleared, with level IDs, clear dates, first clearer, and “true clear” flags. [Sheet link](https://docs.google.com/spreadsheets/d/1D7C_Qj7HbbnF7CiEABcr1VUPu2peQfkPfJPRr1Vuwag/edit?gid=1915966869#gid=1915966869).
2. **Raw course files** — Compressed 4-part ASH0 course files for most levels (some deleted levels have no file). Must be split and decompressed (e.g. via [SMM1-Level-Downloader](https://github.com/snoozbuster/SMM1-Level-Downloader)) before use.
3. **Level metadata JSON** — Pre-shutdown snapshot of level stats (plays, clears, upload date, etc.) per level.
4. **NNID → country** — Map of player NNID to country code, built when Nintendo’s servers were still online.

An archive of the data used to power the site can be downloaded [from OneDrive](https://1drv.ms/u/s!At9TlyN3lZicvoFRzKH1xoc1H-0QUQ?e=eF9Jg6) (warning: ~4.5GB). It contains the original inputs for sources 2–4 (raw course files, level JSON, country data) and the extracted course-data JSON from `extract-course-data.js`. The cleared-level **source** is the Google sheet above, not the archive. See the pipeline doc for which [scripts](scripts/) consume and produce these files.

### Contributing

See the docs above (project structure, architecture, data pipeline placeholder, [viewer/README.md](./viewer/README.md)). For AI contributors, see [AGENTS.md](./AGENTS.md) and `.cursor/rules/`.
