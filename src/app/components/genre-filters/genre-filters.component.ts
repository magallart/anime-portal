import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-genre-filters',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="rounded-2xl border border-border bg-card/70 p-card shadow-subtle">
      <div class="flex flex-wrap items-center justify-end gap-4">
        <button
          type="button"
          class="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Clear filters
        </button>
      </div>

      <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label
          class="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        >
          Genre
          <select
            class="w-full rounded-xl border border-border bg-background/80 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <option>All</option>
          </select>
        </label>

        <label
          class="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        >
          Year
          <select
            class="w-full rounded-xl border border-border bg-background/80 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <option>All</option>
          </select>
        </label>

        <label
          class="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        >
          Status
          <select
            class="w-full rounded-xl border border-border bg-background/80 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <option>All</option>
          </select>
        </label>
      </div>
    </section>
  `,
})
export class GenreFiltersComponent {}
