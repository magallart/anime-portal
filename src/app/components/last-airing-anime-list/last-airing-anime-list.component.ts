import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { AiringEpisode } from '../../interfaces/airing-episode';

@Component({
  selector: 'app-last-airing-anime-list',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative left-1/2 w-screen -translate-x-1/2 bg-accent text-accent-foreground">
      <div class="mx-auto max-w-6xl space-y-8 px-gutter py-12">
        <header class="flex flex-wrap items-center justify-between gap-4">
          <h2 class="text-3xl font-heading font-semibold text-white">
            Últimos animes de la semana
          </h2>

          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
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
          <div class="rounded-2xl bg-white/5 p-6 text-center text-sm text-white/80">
            No airing slots are available for this period. Check back after the next refresh.
          </div>
        } @else {
          <div class="grid grid-cols-2 gap-x-5 gap-y-8 text-white sm:grid-cols-3 lg:grid-cols-5">
            @for (episode of visibleEpisodes(); track episodeKey(episode)) {
              <article class="group flex min-w-0 flex-col gap-2">
                <a
                  class="relative block overflow-hidden rounded-2xl bg-black/20 shadow-subtle transition duration-300 ease-out group-hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
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
                      class="flex aspect-[2/3] w-full items-center justify-center bg-white/10 text-xs font-semibold uppercase tracking-[0.35em] text-white"
                    >
                      EP {{ episode.episodeNumber }}
                    </div>
                  }
                  <div
                    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition duration-300 ease-out group-hover:opacity-100"
                    aria-hidden="true"
                  ></div>
                </a>
                <p class="line-clamp-2 text-base font-semibold text-white" [title]="episode.title">
                  {{ episode.title }}
                </p>
              </article>
            }
          </div>
        }
      </div>
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
