import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';
import { LastAiringAnimeListComponent } from '../../components/last-airing-anime-list/last-airing-anime-list.component';
import { AnilistService } from '../../services/anilist.service';

interface HomeHighlight {
  readonly title: string;
  readonly description: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, LastAiringAnimeListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="mx-auto max-w-6xl space-y-10 px-gutter py-section">
      <header class="space-y-4 text-center">
        <p class="text-xs uppercase tracking-[0.4em] text-muted-foreground">Now streaming</p>
        <h1 class="text-4xl font-heading tracking-tight text-foreground">
          Discover the latest anime drops this week
        </h1>
        <p class="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground">
          Anime Portal spotlights curated releases, genre deep dives, and production stories so you
          can decide what deserves your queue.
        </p>
        <a
          routerLink="/genres"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-subtle transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Browse genres
        </a>
      </header>

      <section class="grid gap-4 md:grid-cols-3">
        @for (highlight of highlights; track highlight.title) {
          <article
            class="rounded-xl border border-border bg-card p-card text-left shadow-subtle"
            data-test="home-highlight"
          >
            <p class="text-sm font-semibold uppercase tracking-wide text-primary">
              {{ highlight.title }}
            </p>
            <p class="mt-2 text-sm text-muted-foreground">
              {{ highlight.description }}
            </p>
          </article>
        }
      </section>
    </article>

    <section class="mx-auto max-w-6xl px-gutter py-10">
      @if (loading()) {
        <p class="text-center text-sm text-muted-foreground">Loading latest episodes&hellip;</p>
      } @else if (error()) {
        <p class="text-center text-sm text-destructive">{{ error() }}</p>
      } @else {
        <app-last-airing-anime-list [episodes]="airingEpisodes()" />
      }
    </section>
  `,
})
export class HomePageComponent {
  private readonly anilistService = inject(AnilistService);

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly airingEpisodes = toSignal(
    this.anilistService.getAiringThisWeek().pipe(
      tap({
        next: () => {
          this.loading.set(false);
          this.error.set(null);
        },
      }),
      catchError(() => {
        this.loading.set(false);
        this.error.set('Unable to load the airing feed right now.');
        return of([]);
      }),
    ),
    { initialValue: [] },
  );

  protected readonly highlights: HomeHighlight[] = [
    {
      title: 'Fresh episodes',
      description:
        'Track simulcasts airing this week and see which studios are behind the drop before anyone else.',
    },
    {
      title: 'Genre deep dives',
      description:
        'Preview curated playlists for action, drama, and slice-of-life moods with moodboards and staff notes.',
    },
    {
      title: 'Studio signals',
      description:
        'Follow production houses you trust and receive detail cards outlining casts, timelines, and reviews.',
    },
  ];
}
