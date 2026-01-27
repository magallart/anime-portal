import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface GenresPrimer {
  readonly label: string;
  readonly body: string;
}

@Component({
  selector: 'app-genres-page',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="mx-auto max-w-6xl space-y-10 px-gutter py-section">
      <header class="space-y-3 text-center">
        <p class="text-xs uppercase tracking-[0.4em] text-muted-foreground">Genres</p>
        <h1 class="text-4xl font-heading tracking-tight text-foreground">
          Plan your next watchlist by vibe
        </h1>
        <p class="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground">
          Filter by mood, theme, or pacing. This placeholder describes how curation and filters will
          operate once AniList data flows through the view.
        </p>
      </header>

      <section class="rounded-2xl border border-border bg-card p-card shadow-subtle">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div class="space-y-2 text-left">
            <h2 class="text-2xl font-heading text-foreground">
              Interactive filter lab (coming soon)
            </h2>
            <p class="text-sm text-muted-foreground">
              Genre chips, release year selectors, and status toggles will live here so you can tune
              the catalog for any mood.
            </p>
          </div>
          <a
            routerLink="/"
            class="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Return home
          </a>
        </div>
      </section>

      <section class="grid gap-4 md:grid-cols-2">
        @for (primer of primers; track primer.label) {
          <article
            class="rounded-xl border border-border bg-card p-card text-left shadow-subtle"
            data-test="genre-primer"
          >
            <h3 class="text-xl font-heading text-foreground">{{ primer.label }}</h3>
            <p class="mt-2 text-sm text-muted-foreground">
              {{ primer.body }}
            </p>
          </article>
        }
      </section>
    </article>
  `,
})
export class GenresPageComponent {
  protected readonly primers: GenresPrimer[] = [
    {
      label: 'Action & Adventure',
      body: 'Expect kinetic choreography, bold palettes, and crunchy soundtracks. Perfect for Saturday night marathons.',
    },
    {
      label: 'Drama & Romance',
      body: 'Slow-burn arcs with grounded stakes. Expect careful pacing, painterly frames, and emotional catharsis.',
    },
    {
      label: 'Mystery & Psychological',
      body: 'Intrigue-forward picks lined up for folks who love decoding clues and unreliable narrators.',
    },
    {
      label: 'Slice of Life & Cozy',
      body: 'Low-stress vibes with warm palettes and gentle sound design - ideal for decompressing after work.',
    },
  ];
}
