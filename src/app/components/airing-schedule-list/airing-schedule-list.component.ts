import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import type { AiringEpisode } from '../../interfaces/airing-episode';
import { AiringScheduleCardComponent } from '../airing-schedule-card/airing-schedule-card.component';

@Component({
  selector: 'app-airing-schedule-list',
  standalone: true,
  imports: [AiringScheduleCardComponent],
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
            <app-airing-schedule-card [episode]="episode" />
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
