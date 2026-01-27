import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { AiringEpisode } from '../../interfaces/airing-episode';

@Component({
  selector: 'app-last-airing-anime-list',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="space-y-6 rounded-3xl bg-card/80 p-6 shadow-subtle">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span
            class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M8 5v14l11-7z" />
              <rect x="3" y="4" width="18" height="16" rx="2" />
            </svg>
          </span>
          <div class="space-y-1">
            <p class="text-xs uppercase tracking-[0.35em] text-muted-foreground">Section</p>
            <h2 class="text-2xl font-heading font-semibold text-ink">Últimos Animes</h2>
          </div>
        </div>

        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          ver más
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </header>

      @if (isEmpty()) {
        <div class="rounded-2xl bg-card/70 p-6 text-center text-sm text-muted-foreground">
          No airing slots are available for this period. Check back after the next refresh.
        </div>
      } @else {
        <div class="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          @for (episode of visibleEpisodes(); track episodeKey(episode)) {
            <article class="group flex min-w-0 flex-col gap-2">
              <a
                class="relative block overflow-hidden rounded-2xl bg-muted shadow-subtle transition duration-300 ease-out group-hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                [routerLink]="['/anime', episode.animeSlug]"
              >
                @if (episode.coverImage) {
                  <img
                    [src]="episode.coverImage"
                    [alt]="episode.title"
                    class="aspect-[2/3] w-full object-cover transition duration-300 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                } @else {
                  <div
                    class="flex aspect-[2/3] w-full items-center justify-center bg-accent/10 text-xs font-semibold uppercase tracking-[0.35em] text-accent"
                  >
                    EP {{ episode.episodeNumber }}
                  </div>
                }
                <div
                  class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition duration-300 ease-out group-hover:opacity-100"
                  aria-hidden="true"
                ></div>
              </a>
              <p class="line-clamp-2 text-sm font-medium text-ink" [title]="episode.title">
                {{ episode.title }}
              </p>
            </article>
          }
        </div>
      }
    </section>
  `,
})
export class LastAiringAnimeListComponent {
  readonly episodes = input<readonly AiringEpisode[]>([]);
  protected readonly visibleEpisodes = computed(() => this.episodes().slice(0, 15));
  protected readonly isEmpty = computed(() => this.episodes().length === 0);

  protected episodeKey(episode: AiringEpisode): string {
    return `${episode.animeId}-${episode.episodeNumber}-${episode.airingAt}`;
  }
}
