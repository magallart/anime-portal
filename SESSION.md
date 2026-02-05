# Session Notes

## 2026-02-05

- Split page components into container + view (Home, Genres, Anime Detail).
- Extracted anime formatters and view-model mappers into `utils/` and `lib/`, plus tests.
- Refactored AniList service into queries, utils, and mapper modules with tests.
- Added shared error message component to reduce UI duplication.
- Updated 404 layout (centered image + new copy) and added/adjusted tests.
- Added coverage tooling (`test:coverage`, `@vitest/coverage-v8`) and verified coverage run.
- Added Vitest unit tests for helper/mappers and Playwright smoke coverage for 404.
- Ran `pnpm run lint`, `pnpm test`, and `pnpm test:e2e`.

## 2026-02-04

- Implemented AniList resolver for `/anime/:slug`, wired it into routes, and exposed resolved data in the detail page component.
- Built the `/anime/:slug` layout to match the approved mockup, binding real API data (titles, rating, views, year, episodes, status, studio, synopsis, images).
- Added rating conversion logic (percentage to 1–10 scale) and fallbacks for missing data.
- Added banner image with dark/blur effect and updated icons per design.
- Extracted detail page interfaces into dedicated files.
- Removed the unused `/anime` placeholder page and related route/specs.
- Fixed mojibake issues (`â€”`) and verified no stray occurrences remained.
- Updated backlog checkmarks for AP-012/AP-013 and added the slug-routing subtask.
- Ran `pnpm run lint` and `pnpm test`.

## 2026-02-03

- Added and refined the `/anime` placeholder detail page for AP-011 (hero, stats row, tags, CTA).
- Added missing detail icons and improved pagination spacing/type scale for genres.
- Updated backlog status for AP-010 and added initial session notes.

## 2026-02-02

- Built genres page functionality: random popular load, incremental load more, and scroll-to-top behavior.
- Added rating badge support and card subtitle handling on genres cards.
- Implemented genre filters with rating selector, clear/apply behavior, constants extraction, and tests.
- Added home highest-rated section with random picks and improved empty states.

## 2026-01-30

- Introduced Angular Material for genre filters and styled panels/scrollbars.
- Standardized buttons with `AppButtonComponent` and aligned icon rendering.
- Continued AP-007 home refinements (spacing, footer, section tweaks) and AP-009 header/filter setup.

## 2026-01-28

- Redesigned home layout and created new UI building-block components.
- Updated palette tokens and tightened hero/header spacing and styling.
- Added cards metadata (rating, season, genres) and filtered adult titles.

## 2026-01-27

- Built AniList GraphQL client/service and domain interfaces.
- Implemented airing schedule list + cards and wired to home.
- Added slug-based routes, Not Found flow, and page scaffolding.
- Refreshed UI theme with neon/sticky header adjustments.

## 2026-01-26

- Added shared layout shell and refreshed brand identity.
- Migrated to pnpm and set up backlog planning.

## 2026-01-23

- Updated README and added design template tokens and agent guidance.
- Added interface example and enforced type-only imports.

## 2026-01-21

- Initial project setup: linting/formatting, husky/commitlint, Tailwind, e2e scaffolding.
- Added app state service, i18n scaffolding, basic home layout, and docs updates.
- Added repo button component and tests.

## 2026-01-21 (Initial)

- Initial commit with baseline project structure.
