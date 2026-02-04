import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
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
        <h1 class="text-4xl font-heading tracking-tight text-foreground">{{ title() }}</h1>
        <p class="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground">
          {{ subtitle() }}
        </p>
      </header>

      <section
        class="grid gap-8 rounded-2xl border border-border bg-card p-card shadow-subtle lg:grid-cols-[320px,1fr]"
      >
        <div
          class="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-border bg-muted text-muted-foreground"
        >
          @if (coverImage()) {
            <img [src]="coverImage()" [alt]="posterAlt()" class="h-full w-full object-cover" />
          } @else {
            <div class="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <span class="text-xs uppercase tracking-[0.35em]">Poster</span>
              <span class="text-lg font-heading">Coming soon</span>
            </div>
          }
        </div>

        <div class="space-y-6 text-left">
          <div class="space-y-3">
            <h2 class="text-3xl font-heading text-foreground">{{ title() }}</h2>
            <p class="text-base leading-relaxed text-muted-foreground">{{ synopsis() }}</p>
          </div>

          <dl class="grid gap-4 sm:grid-cols-2">
            @for (fact of detailFacts(); track fact.label) {
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

  protected readonly title = computed(() => {
    const anime = this.anime();
    return anime?.title?.english ?? anime?.title?.romaji ?? anime?.title?.native ?? 'Unknown anime';
  });

  protected readonly subtitle = computed(() => {
    const anime = this.anime();
    if (!anime) {
      return 'Loading anime details...';
    }
    const genres = anime.genres?.length ? anime.genres.slice(0, 3).join(' · ') : 'Genres TBD';
    const year = anime.seasonYear ? String(anime.seasonYear) : 'Year TBD';
    return `${genres} · ${year}`;
  });

  protected readonly synopsis = computed(() => {
    const anime = this.anime();
    return anime?.description ?? 'No synopsis available.';
  });

  protected readonly coverImage = computed(() => {
    const anime = this.anime();
    return anime?.coverImage?.extraLarge ?? anime?.coverImage?.large ?? anime?.coverImage?.medium;
  });

  protected readonly posterAlt = computed(() => `${this.title()} poster`);

  protected readonly detailFacts = computed<DetailFact[]>(() => {
    const anime = this.anime();
    if (!anime) {
      return [
        { label: 'Studio', value: 'Loading...' },
        { label: 'Episodes', value: 'Loading...' },
        { label: 'Status', value: 'Loading...' },
        { label: 'Genres', value: 'Loading...' },
      ];
    }

    const studio = anime.studios?.[0]?.name ?? 'Unknown';
    const episodes = anime.episodes ? String(anime.episodes) : 'Unknown';
    const status = anime.status ? this.formatStatus(anime.status) : 'Unknown';
    const genres = anime.genres?.length ? anime.genres.join(' · ') : 'Unknown';
    const nextAiring = anime.nextAiringEpisode
      ? `Ep ${anime.nextAiringEpisode.episodeNumber}${this.formatAiringDate(
          anime.nextAiringEpisode.airingAt,
        )}`
      : 'Not scheduled';

    return [
      { label: 'Studio', value: studio },
      { label: 'Episodes', value: episodes },
      { label: 'Status', value: status },
      { label: 'Genres', value: genres },
      { label: 'Next Airing', value: nextAiring },
    ];
  });

  private formatStatus(value: string): string {
    return value
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }

  private formatAiringDate(seconds?: number): string {
    if (!seconds) {
      return '';
    }
    const date = new Date(seconds * 1000);
    const formatted = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return ` · ${formatted}`;
  }
}
