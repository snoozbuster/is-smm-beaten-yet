# Data pipeline (placeholder)

Static data is produced by scripts in `scripts/` from the OneDrive dataset and optionally the Google sheet. The webapp fetches this data from a CDN; see [constants/levelData.ts](../constants/levelData.ts) (`DATA_ROOT_URL`) and the composables that use it.

## Inputs

- **OneDrive archive** — level data and related files (see [README Dataset section](../README.md#dataset)).
- **Google sheet** (optional) — used to analyze and assemble the final dataset of cleared levels.

## Outputs (what the app expects)

- `uncleared.json` — list of uncleared levels (e.g. [useUnclearedLevels.ts](../composables/useUnclearedLevels.ts)).
- `clear_summary.json` — cleared-level stats summary (e.g. [ClearedStats.vue](../components/ClearedStats.vue)).
- `course-data/{levelId}/` — per-level assets: `course_data.cdt`, `course_data_sub.cdt`, thumbnail (e.g. [LevelPreview.vue](../components/LevelPreview.vue), [levels/[levelId].vue](../pages/levels/[levelId].vue)).
- `leaderboards/list.json` — leaderboard data (e.g. [useLeaderboards.ts](../composables/useLeaderboards.ts)); produced by SyncLevelsGSheets.
- `players/list.json` — player list (e.g. [usePlayer.ts](../composables/usePlayer.ts)); produced by SyncLevelsGSheets.
- `country/list.json` — country data (e.g. [useCountries.ts](../composables/useCountries.ts)); produced by SyncLevelsGSheets.

## Scripts (high-level)

| Script | Purpose |
|--------|---------|
| `download-level-meta.py` | Downloads level metadata from source. |
| `compile-level-json.js` | Compiles level JSON (e.g. from download-level-meta output) into CSV/structured data. |
| `extract-course-data.js` | Extracts course data from `.cdt` dirs (uses viewer). |
| `build-static-data.js` | Builds static JSON consumed by the app (e.g. from course-data). |
| `build-milestones.cjs` | Builds milestones data. |
| `convert-level-id.cjs` | Converts level IDs. |
| `extract-pids.py` | Extracts PIDs. |
| `extract-thumbnails.js` | Extracts thumbnails. |
| `get-clear-list.py` | Gets clear list. |
| `pull-country-data.py` | Pulls country data. |
| `scrape-clear-messages.py` | Scrapes clear messages. |

## Full pipeline

Full pipeline order, prerequisites, and local runbook will be documented later.
