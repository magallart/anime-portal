import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { AiringEpisode } from '../../interfaces/airing-episode';
import { CtaButtonComponent } from '../cta-button/cta-button.component';

@Component({
  selector: 'app-last-airing-anime-list',
  standalone: true,
  imports: [RouterLink, CtaButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="relative left-1/2 w-screen -translate-x-1/2 border-b border-accent/40 bg-accent/95 text-accent-foreground shadow-subtle backdrop-blur supports-[backdrop-filter]:bg-accent/80"
    >
      <div class="mx-auto max-w-6xl space-y-8 px-gutter py-12">
        <header class="flex flex-wrap items-center justify-between gap-4">
          <h2 class="text-3xl font-heading font-semibold text-white">
            Últimos animes de la semana
          </h2>

          <app-cta-button label="Ver más" [link]="['/genres']" />
        </header>

        @if (loading()) {
          <div
            class="grid grid-cols-2 gap-x-5 gap-y-8 text-white sm:grid-cols-3 lg:grid-cols-5"
            role="list"
            aria-label="Últimos animes de la semana cargando"
          >
            @for (placeholder of skeletonSlots; track placeholder) {
              <div
                class="flex min-w-0 flex-col gap-2 rounded-2xl bg-white/5 p-4 animate-pulse"
                role="presentation"
              >
                <div class="aspect-[2/3] w-full rounded-2xl bg-white/10"></div>
                <div class="h-3 w-full rounded bg-white/20"></div>
                <div class="h-3 w-3/4 rounded bg-white/15"></div>
              </div>
            }
          </div>
        } @else if (error()) {
          <div
            class="rounded-2xl border border-destructive/40 bg-destructive/10 p-6 text-center text-sm text-destructive-foreground"
            role="status"
            aria-live="polite"
          >
            {{ error() }}
          </div>
        } @else if (isEmpty()) {
          <div
            class="rounded-2xl bg-white/5 p-6 text-center text-sm text-white/80"
            role="status"
            aria-live="polite"
          >
            No airing slots are available for this period. Check back after the next refresh.
          </div>
        } @else {
          <div
            class="grid grid-cols-2 gap-x-5 gap-y-8 text-white sm:grid-cols-3 lg:grid-cols-5"
            role="list"
            aria-label="Últimos animes de la semana"
          >
            @for (episode of visibleEpisodes(); track episodeKey(episode)) {
              <article class="group flex min-w-0 flex-col gap-2" role="listitem">
                <a
                  class="relative block overflow-hidden rounded-2xl bg-black/20 shadow-subtle transition duration-300 ease-out group-hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
                  [routerLink]="['/anime', episode.animeSlug]"
                  [attr.aria-label]="episode.title"
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
  readonly loading = input(false);
  readonly error = input<string | null>(null);
  protected readonly visibleEpisodes = computed(() => this.episodes().slice(0, 15));
  protected readonly isEmpty = computed(
    () => !this.loading() && !this.error() && this.episodes().length === 0,
  );
  protected readonly skeletonSlots = Array.from({ length: 10 }, (_, index) => index);

  protected episodeKey(episode: AiringEpisode): string {
    return `${episode.animeId}-${episode.episodeNumber}-${episode.airingAt}`;
  }
}
