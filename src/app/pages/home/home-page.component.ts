import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, forkJoin, of, tap } from 'rxjs';
import { IconClockComponent } from '../../components/icons/icon-clock.component';
import { IconTrendingUpComponent } from '../../components/icons/icon-trending-up.component';
import type { AnimeCardData } from '../../interfaces/anime-card-data';
import { AnilistService } from '../../services/anilist.service';
import { AppToastService } from '../../services/app-toast.service';
import type { AnimeSummary } from '../../interfaces/anime-summary';
import { HomePageViewComponent } from './home-page-view.component';
import { mapEpisodeToCard, mapSummaryToCard } from '../../lib/anime-view-models';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomePageViewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-home-page-view
      [mostViewedIcon]="mostViewedIcon"
      [latestReleaseIcon]="latestReleaseIcon"
      [mostViewedCards]="mostViewedCards()"
      [latestReleaseCards]="latestReleaseCards()"
      [loading]="loading()"
      [error]="error()"
    />
  `,
})
export class HomePageComponent {
  private readonly anilistService = inject(AnilistService);
  private readonly toastService = inject(AppToastService);

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  private readonly homeFeed = toSignal(
    forkJoin({
      latest: this.anilistService.getAiringThisWeek(),
      mostViewed: this.anilistService.getHighestRatedAnime(30),
    }).pipe(
      tap({
        next: () => {
          this.loading.set(false);
          this.error.set(null);
        },
      }),
      catchError(() => {
        this.loading.set(false);
        this.error.set('Unable to load the home feed right now.');
        this.toastService.showError('Unable to load the home feed right now.');
        return of({ latest: [], mostViewed: [] });
      }),
    ),
    { initialValue: { latest: [], mostViewed: [] } },
  );

  protected readonly mostViewedIcon = IconTrendingUpComponent;
  protected readonly latestReleaseIcon = IconClockComponent;

  protected readonly mostViewedCards = computed(() =>
    this.pickRandomCards(this.homeFeed().mostViewed, 8).map((anime) =>
      this.mapSummaryToCard(anime),
    ),
  );

  protected readonly latestReleaseCards = computed(() =>
    this.homeFeed()
      .latest.slice(0, 15)
      .map((episode) => mapEpisodeToCard(episode, { hideTags: true })),
  );

  private mapSummaryToCard(anime: AnimeSummary): AnimeCardData {
    return mapSummaryToCard(anime);
  }

  private pickRandomCards(items: readonly AnimeSummary[], count: number): readonly AnimeSummary[] {
    if (items.length <= count) {
      return items;
    }

    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    return shuffled.slice(0, count);
  }
}
