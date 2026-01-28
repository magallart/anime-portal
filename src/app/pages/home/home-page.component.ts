import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';
import { IconClockComponent } from '../../components/icons/icon-clock.component';
import { IconTrendingUpComponent } from '../../components/icons/icon-trending-up.component';
import { AnimeSectionComponent } from '../../components/anime-section/anime-section.component';
import type { AnimeCardData } from '../../components/anime-card/anime-card.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { StatsStripComponent } from '../../components/stats-strip/stats-strip.component';
import { CommunityFooterComponent } from '../../components/community-footer/community-footer.component';
import { AnilistService } from '../../services/anilist.service';
import type { AiringEpisode } from '../../interfaces/airing-episode';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    AnimeSectionComponent,
    HeroSectionComponent,
    StatsStripComponent,
    CommunityFooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero-section />

    <section class="mx-auto max-w-6xl space-y-20 px-gutter py-section">
      <app-anime-section
        title="Most viewed anime"
        subtitle="Fan favorites climbing the charts right now"
        [icon]="mostViewedIcon"
        [items]="mostViewedCards()"
        [loading]="loading()"
        [error]="error()"
        gridClass="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      />

      <app-anime-section
        title="Latest releases"
        subtitle="Fresh episodes and new arrivals this week"
        [icon]="latestReleaseIcon"
        [items]="latestReleaseCards()"
        [loading]="loading()"
        [error]="error()"
        gridClass="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      />
    </section>

    <app-stats-strip />
    <app-community-footer />
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

  protected readonly mostViewedIcon = IconTrendingUpComponent;
  protected readonly latestReleaseIcon = IconClockComponent;

  protected readonly mostViewedCards = computed(() =>
    this.airingEpisodes()
      .slice(0, 8)
      .map((episode) => this.mapEpisodeToCard(episode)),
  );

  protected readonly latestReleaseCards = computed(() =>
    this.airingEpisodes()
      .slice(8, 20)
      .map((episode) => this.mapEpisodeToCard(episode)),
  );

  private mapEpisodeToCard(episode: AiringEpisode): AnimeCardData {
    const year = episode.airingAtDate?.getFullYear();
    return {
      id: episode.animeId,
      slug: episode.animeSlug,
      title: episode.title,
      imageUrl: episode.coverImage,
      badge: `EP ${episode.episodeNumber}`,
      meta: `Episode ${episode.episodeNumber}`,
      year,
      tags: ['Airing', 'This week'],
    };
  }
}
