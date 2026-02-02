# For AI contributors

This repo is the **Is Super Mario Maker Beaten Yet?** webapp: stats for Team 0%'s goal of clearing every Super Mario Maker 1 level before server shutdown. Nuxt 3 + Vue + TypeScript + PrimeVue + Tailwind; static data from CDN.

## Conventions

- Use existing types in [types/levels.ts](types/levels.ts), [types/leaderboards.ts](types/leaderboards.ts), [types/players.ts](types/players.ts) and constants in [constants/levelData.ts](constants/levelData.ts); don't introduce new data shapes for app data without updating types.
- Prefer existing composables and components.

## Quality checks

When changing code, run `yarn lint` (and `yarn typecheck` for `.ts`/`.vue` changes). Do not add unit tests or testing infrastructure.

## Pitfalls

1. **Viewer**: Untyped JS + binary parsing; avoid or minimize changes. See [viewer/README.md](viewer/README.md) and `.cursor/rules/viewer-caution.mdc`.
2. **Scripts**: Part of data pipeline; changing outputs can break the app.
3. **Amplify**: SyncLevelsGSheets is local-only and not deployed.

## Where to look

- Project structure and data pipeline placeholder: [README.md](README.md)
- Viewer docs: [viewer/README.md](viewer/README.md)
- Leaderboards (Hall of Fame): [pages/leaderboards.vue](pages/leaderboards.vue), [composables/useLeaderboards.ts](composables/useLeaderboards.ts)
- Player profiles: [pages/players/[nnid].vue](pages/players/[nnid].vue), [composables/usePlayer.ts](composables/usePlayer.ts)
- File-specific rules: `.cursor/rules/`
