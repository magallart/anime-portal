# Refactor Audit (AP-013)

This document captures the current hotspots and responsibilities before refactoring.

## Large Components

- `src/app/pages/genres/genres-page.component.ts`
  - Responsibilities: data fetching, filter state, pagination, mapping to card models, view rendering.
  - Risks: high logic density, multiple responsibilities, repeated mapping logic.

- `src/app/pages/anime-detail/anime-detail-page.component.ts`
  - Responsibilities: derived display strings, formatting, stats composition, UI rendering.
  - Risks: formatting logic embedded in component class.

- `src/app/pages/home/home-page.component.ts`
  - Responsibilities: parallel data fetch, error handling, mapping to cards, randomization.
  - Risks: mapping + formatting in component, repeated helpers with other pages.

- `src/app/components/genre-filters/genre-filters.component.ts`
  - Responsibilities: filter state, selections, UI output.
  - Risks: shared logic could be extracted into utilities for reuse/testing.

## Services With Mixed Concerns

- `src/app/services/anilist.service.ts`
  - Contains query strings, network orchestration, mapping, and formatting.
  - Mapping functions are good candidates for extraction into pure utilities.

## Repeated Helpers

- Rating and title formatting functions appear in Home/Genres/Detail.
- Slug resolution and title resolution are in service, but card mapping is duplicated in pages.

## Candidate Extractions

- Shared mapping utilities for `AnimeSummary` to `AnimeCardData`.
- Shared formatting helpers (rating, season label, status formatting).
- Presenter components for detail stats and info blocks.
