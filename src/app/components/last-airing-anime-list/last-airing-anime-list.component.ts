import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import type { AiringEpisode } from '../../interfaces/airing-episode';
import { LastAiringAnimeCardComponent } from '../last-airing-anime-card/last-airing-anime-card.component';

@Component({
  selector: 'app-last-airing-anime-list',
  standalone: true,
  imports: [LastAiringAnimeCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="space-y-6">
      <header class="flex flex-col gap-2 text-left">
        <p class="text-xs uppercase tracking-[0.4em] text-muted-foreground">This week</p>
        <h2 class="text-2xl font-heading text-foreground">Latest airing episodes</h2>
        <p class="text-sm text-muted-foreground">
          Keep tabs on premieres and simulcasts planned within the next seven days.
        </p>
      </header>

      @if (isEmpty()) {
        <div
          class="rounded-xl border border-border bg-card/70 p-card text-center text-sm text-muted-foreground"
        >
          No airing slots are available for this period. Check back after the next refresh.
        </div>
      } @else {
        <div class="grid gap-4 md:grid-cols-2">
          @for (episode of episodes(); track episodeKey(episode)) {
            <app-last-airing-anime-card [episode]="episode" />
          }
        </div>
      }
    </section>
  `,
})
export class LastAiringAnimeListComponent {
  readonly episodes = input<readonly AiringEpisode[]>([]);

  protected readonly isEmpty = computed(() => this.episodes().length === 0);

  protected episodeKey(episode: AiringEpisode): string {
    return `${episode.animeId}-${episode.episodeNumber}-${episode.airingAt}`;
  }
}
