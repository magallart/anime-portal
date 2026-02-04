import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import type { DetailFact } from '../../interfaces/detail-fact';
import type { AnimeDetail } from '../../interfaces/anime-detail';

@Component({
  selector: 'app-anime-detail-page',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="mx-auto max-w-6xl space-y-10 px-gutter py-section">
      <header class="space-y-3 text-center">
        <p class="text-xs uppercase tracking-[0.4em] text-muted-foreground">Anime Detail</p>
        <h1 class="text-4xl font-heading tracking-tight text-foreground">
          Deep dive into individual series
        </h1>
        <p class="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground">
          Once data is resolved, this page will surface cast, studios, release timeline, and airing
          cadence with enriched media.
        </p>
      </header>

      <section
        class="grid gap-8 rounded-2xl border border-border bg-card p-card shadow-subtle lg:grid-cols-[320px,1fr]"
      >
        <div
          class="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-border bg-muted text-muted-foreground"
        >
          <div class="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span class="text-xs uppercase tracking-[0.35em]">Poster</span>
            <span class="text-lg font-heading">Coming soon</span>
          </div>
        </div>

        <div class="space-y-6 text-left">
          <div class="space-y-3">
            <h2 class="text-3xl font-heading text-foreground">Placeholder anime title</h2>
            <p class="text-base leading-relaxed text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. This copy spotlights how the
              synopsis will render with generous line-height and accessible contrast once the route
              resolves real data.
            </p>
          </div>

          <dl class="grid gap-4 sm:grid-cols-2">
            @for (fact of facts; track fact.label) {
              <div
                class="rounded-xl border border-border bg-background/80 p-4"
                data-test="detail-fact"
              >
                <dt class="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  {{ fact.label }}
                </dt>
                <dd class="text-base font-medium text-foreground">{{ fact.value }}</dd>
              </div>
            }
          </dl>

          <div class="flex flex-wrap gap-3">
            <a
              routerLink="/genres"
              class="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Back to genres
            </a>
            <a
              routerLink="/"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-secondary/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Return home
            </a>
          </div>
        </div>
      </section>
    </article>
  `,
})
export class AnimeDetailPageComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly anime = toSignal(
    this.route.data.pipe(map((data) => data['anime'] as AnimeDetail | undefined)),
    { initialValue: undefined },
  );

  protected readonly facts: DetailFact[] = [
    { label: 'Studio', value: 'Placeholder Animation Works' },
    { label: 'Episodes', value: '24 planned (weekly simulcast)' },
    { label: 'Status', value: 'Premiering Soon' },
    { label: 'Genres', value: 'Action · Adventure · Fantasy' },
  ];
}
