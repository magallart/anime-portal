# Anime Portal Backlog

### Ticket AP-001 - Brand identity & CSS tokens

**Description:** Document the Anime Portal visual profile and surface placeholder theme tokens through CSS variables to unblock layout work.
**Checklist:**

- [✔️] Fill `DESIGN.md` Quick Fill (app name, tone, typography, spacing, component recipes) to reflect Anime Portal.
- [✔️] Add placeholder CSS variables for neutrals, brand, accent, focus, and spacing under `:root` in `src/styles.css`.
- [✔️] Wire Tailwind theme tokens to the CSS variables (colors, font families, radii) so utility classes consume the placeholders.
- [✔️] Note required future refinements inside DESIGN.md for when final palette arrives.
  **Acceptance Criteria:**
- DESIGN.md names Anime Portal and documents tone/density/components.
- `src/styles.css` exposes CSS variables for page, card, text, buttons, focus ring, and spacing tokens with placeholder values.
- Tailwind builds without errors and utilities reference CSS variables instead of raw hex values.
- Unit tests and linting remain green.
  **Files:** `DESIGN.md`, `tailwind.config.js`, `src/styles.css`

### Ticket AP-002 - Global layout shell

**Description:** Implement shared header/footer components plus layout wrappers so every route shares the same chrome and placeholder logo.
**Checklist:**

- [✔️] Create `AppHeaderComponent` with placeholder logo (for example, initials in a rounded badge) and nav links to Home & Genres using Tailwind plus accessibility best practices.
- [✔️] Create `AppFooterComponent` with simple text/links (copyright, attribution).
- [✔️] Update `app.html` to wrap the router outlet in a layout container that injects the header (fixed or sticky) and footer on all pages.
- [✔️] Add responsive behavior (flex/stack) so header/footer adapt to mobile widths.
- [✔️] Cover components with basic unit tests verifying rendering and navigation.
  **Acceptance Criteria:**
- Header and footer render on `/`, `/genres`, and `/anime/:slug`, sharing consistent spacing.
- Placeholder logo is visible and described via `aria-label`.
- Navigation uses Angular routerLink and respects focus outlines.
- Tests pass for header/footer components.
  **Files:** `src/app/app.html`, `src/app/app.css`, `src/app/components/app-header/*`, `src/app/components/app-footer/*`, `src/app/app.spec.ts`

### Ticket AP-003 - Route scaffolding & page components

**Description:** Create dedicated page components and configure Angular routing for Home, Genres, and Anime Detail pages, using user-friendly anime name slugs (`/anime/:slug`) instead of numeric IDs.
**Checklist:**

- [✔️] Generate `HomePageComponent`, `GenresPageComponent`, and `AnimeDetailPageComponent` under `src/app/pages/` with standalone setup.
- [✔️] Update `app.routes.ts` to define routes `/`, `/genres`, and `/anime/:slug` (with route titles and data for breadcrumbs later).
- [✔️] Provide placeholder templates per page referencing header/footer layout and simple copy so navigation works before data integration.
- [✔️] Add route-level tests or harness spec verifying router navigates to each component.
  **Acceptance Criteria:**
- Visiting `/`, `/genres`, `/anime/your-favorite-show` renders the correct placeholder component.
- Routes include page titles/meta via `title` or `data`.
- Invalid slugs or unknown paths redirect to a branded Not Found page.
- Specs confirming router configuration pass.
  **Files:** `src/app/app.routes.ts`, `src/app/pages/home/*`, `src/app/pages/genres/*`, `src/app/pages/anime-detail/*`, `src/app/pages/not-found/*`, `src/app/pages/anime-detail/anime-slug.guard.ts`, `src/app/app.routes.spec.ts`

### Ticket AP-004 - AniList GraphQL client foundation

**Description:** Create a reusable HTTP GraphQL client configured for the AniList endpoint with strict typing and error translation.
**Checklist:**

- [✔️] Add environment token for `ANILIST_API_URL` (defaulting to `https://graphql.anilist.co`).
- [✔️] Implement `GraphqlClientService` wrapping Angular `HttpClient` to POST GraphQL queries plus variables.
- [✔️] Define shared TypeScript interfaces for query payloads (`GraphqlRequest`, `GraphqlResponse`, `GraphqlError`).
- [✔️] Handle network and GraphQL errors with typed results/logging.
- [✔️] Unit test success/failure branches with HttpTestingController.
  **Acceptance Criteria:**
- Service method like `execute<T>(query, variables)` returns typed Observable.
- Errors from AniList propagate with helpful messages.
- Tests cover typical query and error responses.
  **Files:** `src/environments/environment*.ts`, `src/app/services/graphql-client.service.ts`, `src/app/interfaces/graphql.ts`, `src/app/services/graphql-client.service.spec.ts`

### Ticket AP-005 - AniList domain service & models

**Description:** Build domain-level service abstractions that expose strongly typed methods for airing lineup, anime search, and anime detail data.
**Checklist:**

- [✔️] Define interfaces/models for `AnimeSummary`, `AiringEpisode`, `AnimeDetail`, `GenreFilter`, etc. under `src/app/interfaces/`.
- [✔️] Implement `AnilistService` (or similar) that composes `GraphqlClientService` and houses query strings plus mapping helpers.
- [✔️] Provide methods: `getAiringThisWeek()`, `getAnimeByFilters()`, `getAnimeDetailsById(id)` returning Observables or signals.
- [✔️] Normalize/sanitize AniList HTML descriptions to safe strings.
- [✔️] Write focused unit tests verifying correct GraphQL query payloads and mapping for each method.
  **Acceptance Criteria:**
- Service covers all data needs for Home, Genres, and Detail pages.
- Interfaces avoid `any` and align with AGENTS TypeScript rules.
- Tests validate query body construction and response mapping for at least one success and one error.
  **Files:** `src/app/services/anilist.service.ts`, `src/app/interfaces/anime.ts`, `src/app/interfaces/airing.ts`, `src/app/services/anilist.service.spec.ts`

### Ticket AP-006 - Home "Latest episodes this week" section

**Description:** Use the domain service to fetch airing lineup data and display a scrollable list of latest episodes on the Home page.
**Checklist:**

- [✔️] Create a dedicated `LastAiringAnimeListComponent` to render cards (cover, title, episode number, airing time) using Tailwind.
- [✔️] Inject data via signals/observables in `HomePageComponent`, triggering fetch on init.
- [✔️] Add loading skeletons and empty/error states.
- [✔️] Ensure list is keyboard navigable (aria roles, focus order) and responsive (stack/grid behavior).
- [✔️] Add component/unit tests covering rendering and state switches.
  **Acceptance Criteria:**
- Home shows the most recent episodes airing within the current week (based on AniList feed).
- Loading, empty, and error states are visible and styled.
- Clicking a card navigates to `/anime/:slug`.
- Tests or assertions cover data rendering.
  **Files:** `src/app/pages/home/home.component.ts|html|css`, `src/app/components/last-airing-anime-list/*`, `src/app/components/anime-card/*`, `src/app/pages/home/home.component.spec.ts`

### Ticket AP-007 - Redefine UI & finish Home page

**Description:** Redefine the UI of the entire application and complete the Home page UI per DESIGN.md.
**Checklist:**

- [✔️] Audit current UI against DESIGN.md and update global layout, typography, spacing, and component recipes as needed.
- [✔️] Redesign Home page layout/sections to match the new visual direction and improve hierarchy.
- [✔️] Update shared components (header, footer, cards, buttons) to align with the redefined UI.
- [✔️] Ensure responsive behavior and accessibility remain correct after UI changes.
- [✔️] Add or update tests impacted by UI restructuring.
  **Acceptance Criteria:**
- Global UI matches the updated DESIGN.md tokens and component recipes.
- Home page feels finished with consistent spacing, typography, and visual hierarchy.
- Responsive and accessibility checks pass for updated UI.
- Tests remain green.
  **Files:** `DESIGN.md`, `src/app/app.html`, `src/app/app.css`, `src/app/pages/home/*`, `src/app/components/**/*`

### Ticket AP-008 - Home "Common genres" grid & CTA

**Description:** Surface a curated list of genres with representative anime cards and link to the Genres page.
**Checklist:**

- [✔️] Define the target genre list (Action, Drama, Comedy, Fantasy, Sci-Fi, Sports, etc.).
- [✔️] Fetch anime samples per genre (or a batched query) via `AnilistService` and map to card view models.
- [✔️] Render responsive grid of cards showing cover plus title; cards route to detail page.
- [✔️] Add a "View all genres" button linking to `/genres` with Tailwind button recipe from DESIGN.
- [✔️] Tests verifying CTA navigation and card output counts.
  **Acceptance Criteria:**
- At least one anime card per configured genre renders on desktop and mobile.
- Cards use shared anime-card component styles.
- CTA navigates to `/genres` and is focusable.
  **Files:** `src/app/pages/home/home.component.*`, `src/app/components/anime-card/*`, `src/app/components/genre-grid/*`

### Ticket AP-009 - Genres page layout & random load

**Description:** Build the Genres page structure and initial random anime fetch so the page is functional before filters.
**Checklist:**

- [✔️] Create page hero/heading describing filters and dataset.
- [✔️] Request a random page (for example, RNG of page number) sorted by `POPULARITY_DESC` and display 20 anime cards in a responsive grid.
- [✔️] Show loading/empty/error placeholders.
- [✔️] Instrument basic pagination or "Load more" button placeholder for later.
- [✔️] Unit or component tests checking fetch trigger and card count.
  **Acceptance Criteria:**
- Navigating to `/genres` loads 20 random popular anime and displays them as cards.
- Layout remains responsive across breakpoints.
- Tests validate service call and render.
  **Files:** `src/app/pages/genres/genres.component.*`, `src/app/components/anime-card/*`, `src/app/pages/genres/genres.component.spec.ts`

### Ticket AP-010 - Genres filter bar & querying

**Description:** Implement interactive filtering by genre, release year, and status with live updates to the anime grid.
**Checklist:**

- [✔️] Build `FilterBarComponent` with select inputs (genre multi-select or chips), year dropdown, and status toggle (airing/finished/all).
- [✔️] Connect filters to query params/state management (signals or component store) to drive `AnilistService.getAnimeByFilters` calls.
- [✔️] Debounce/filter submissions, show loading indicators, and manage no-results messaging.
- [✔️] Add tests for filtering logic and query param sync.
  **Acceptance Criteria:**
- Changing any filter triggers a new AniList request and updates the grid.
- URL reflects filters, and reloading preserves the state.
- Accessibility: filter controls are labeled and keyboard friendly.
- Tests cover filter changes and service calls.
  **Files:** `src/app/components/filter-bar/*`, `src/app/pages/genres/genres.component.*`, `src/app/pages/genres/genres.component.spec.ts`

### Ticket AP-011 - Anime detail data resolver

**Description:** Ensure `/anime/:slug` preloads anime data through a resolver to simplify the detail component and handle missing slugs.
**Checklist:**

- [✔️] Create `AnimeDetailResolver` that reads the route param, calls `getAnimeDetailsById`, and resolves data or redirects on error.
- [✔️] Wire resolver into `app.routes.ts` for `/anime/:slug`.
- [✔️] Surface resolved data to the component via `ActivatedRoute.data` or injection.
- [✔️] Add resolver unit tests for success/error cases.
  **Acceptance Criteria:**
- Visiting `/anime/your-favorite-show` waits for data before rendering; invalid slugs redirect or show error page.
- Resolver errors are logged and handled gracefully.
- Tests assert resolver behavior.
  **Files:** `src/app/pages/anime-detail/anime-detail.resolver.ts`, `src/app/app.routes.ts`, `src/app/services/anilist.service.ts`, `src/app/pages/anime-detail/anime-detail.resolver.spec.ts`

### Ticket AP-012 - Anime detail page UI

**Description:** Build the detail page layout showcasing cover, synopsis, studio, episode count, and other metadata using Tailwind plus DESIGN tokens.
**Checklist:**

- [✔️] Create responsive layout (image on left on desktop, stacked on mobile) with accessible headings.
- [✔️] Render sanitized synopsis text and metadata list (studio, status, total episodes, next airing info if available).
- [✔️] Ensure anime cards navigate to `/anime/:slug` and detail page renders resolved API data.
- [✔️] Handle missing data gracefully (fallback labels) and ensure focus order.
- [✔️] Component tests verifying data binding and fallback rendering.
  **Acceptance Criteria:**
- Detail page matches DESIGN spacing/typography and remains readable on small screens.
- All required fields appear when available; placeholders shown when not.
- Buttons navigate correctly or open AniList link in new tab with rel attrs.
- Tests confirm rendering of provided dataset.
  **Files:** `src/app/pages/anime-detail/anime-detail.component.ts|html|css|spec.ts`, `src/app/components/anime-meta/*`

### Ticket AP-013 - Polish, responsiveness, and QA

**Description:** Finalize cross-page polish, add regression tests, and document verification steps.
**Checklist:**

- [✔️] Audit components for responsiveness (header, cards, filters, detail layout) and adjust Tailwind classes as needed.
- [✔️] Add shared error boundary or toast for API failures.
- [✔️] Refresh 404 page layout and include the no-results illustration.
- [✔️] Write Vitest unit tests and Playwright e2e smoke tests covering navigation Home -> Genres -> Detail and back.
- [ ] Update README with run instructions plus API usage notes.
- [ ] Run `pnpm run lint`, `pnpm test`, and `pnpm test:e2e` ensuring green builds.
      **Acceptance Criteria:**
- App functions correctly on mobile/tablet/desktop breakpoints without layout issues.
- Error handling surfaces user-friendly messaging when AniList fails.
- Automated tests cover core flows and pass in CI scripts listed in README.
- Documentation reflects new routes/features.
  **Files:** `src/app/**/*`, `e2e/**/*`, `README.md`, `.github/workflows/*`
