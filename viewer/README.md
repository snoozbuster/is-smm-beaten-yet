# Viewer

This directory is a fork of [leomaurodesenv/smm-course-viewer](https://github.com/leomaurodesenv/smm-course-viewer), with customizations. It parses and draws SMM1 level files (`.cdt`).

**Used at**:

- **Runtime** (browser): [LevelPreview.vue](../components/LevelPreview.vue)
- **Build time** (Node): [scripts/extract-course-data.js](../scripts/extract-course-data.js)

## Caution for contributors

1. **Untyped JS**: ESLint runs on `.js` but TypeScript does not type-check the viewer ↔ caller contract. Verify call sites when changing APIs or return shapes.

2. **Binary parsing**: Parsing in `SmmCourseViewer.js` is binary-format and order-sensitive. Do not reorder or alter parsing logic without strict care.

## Level file structure

The binary level file (`.cdt`) format is documented in [FORMAT.md](./FORMAT.md) (or in a separate doc—to be added). You can also refer to [upstream FORMAT.md](https://github.com/leomaurodesenv/smm-course-viewer/blob/master/FORMAT.md) and note any differences.
