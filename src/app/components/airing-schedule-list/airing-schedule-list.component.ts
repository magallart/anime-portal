import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import type { AiringEpisode } from '../../interfaces/airing-episode';

@Component({
  selector: 'app-airing-schedule-list',
  standalone: true,
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="space-y-6">
      <header class="flex flex-col gap-2 text-left">
        <p class="text-xs uppercase tracking-[0.4em] text-muted-foreground">This week</p>
        <h2 class="text-2xl font-heading text-foreground">Latest airing episodes</h2>
        <p class="text-sm text-muted-foreground">
          Keep tabs on premieres and simulcasts scheduled within the next seven days.
        </p>
      </header>

      @if (isEmpty()) {
        <div
          class="rounded-xl border border-border bg-card/70 p-card text-center text-sm text-muted-foreground"
        >
          No airing slots are scheduled for this period. Check back after the next refresh.
        </div>
      } @else {
        <div class="grid gap-4 md:grid-cols-2">
          @for (episode of episodes(); track episodeKey(episode)) {
            <article
              class="flex items-center gap-4 rounded-xl border border-border bg-card p-card shadow-subtle transition hover:border-primary/70 focus-within:border-primary/70"
            >
              <div
                class="flex h-16 w-16 flex-none items-center justify-center rounded-xl bg-accent/20 text-center font-heading text-lg text-accent"
              >
                EP {{ episode.episodeNumber }}
              </div>
              <div class="space-y-1 text-left">
                <p class="text-sm font-medium text-primary">{{ episode.title }}</p>
                <p class="text-base font-heading text-foreground">{{ episode.animeSlug }}</p>
                <p class="text-xs text-muted-foreground">
                  Airing {{ episode.airingAtDate | date: 'medium' }}
                </p>
              </div>
            </article>
          }
        </div>
      }
    </section>
  `,
})
export class AiringScheduleListComponent {
  readonly episodes = input<readonly AiringEpisode[]>([]);

  protected readonly isEmpty = computed(() => this.episodes().length === 0);

  protected episodeKey(episode: AiringEpisode): string {
    return `${episode.animeId}-${episode.episodeNumber}-${episode.airingAt}`;
  }
}
