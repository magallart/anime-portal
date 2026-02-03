import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, forkJoin, of, tap } from 'rxjs';
import { IconClockComponent } from '../../components/icons/icon-clock.component';
import { IconTrendingUpComponent } from '../../components/icons/icon-trending-up.component';
import { AnimeSectionComponent } from '../../components/anime-section/anime-section.component';
import { ANIME_CARD_BADGE_ICON } from '../../constants/anime-card-badge';
import type { AnimeCardData } from '../../interfaces/anime-card-data';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { CommunityFooterComponent } from '../../components/community-footer/community-footer.component';
import { AnilistService } from '../../services/anilist.service';
import type { AiringEpisode } from '../../interfaces/airing-episode';
import type { AnimeFuzzyDate } from '../../interfaces/anime-fuzzy-date';
import type { AnimeSummary } from '../../interfaces/anime-summary';
import type { AnimeTitle } from '../../interfaces/anime-title';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AnimeSectionComponent, HeroSectionComponent, CommunityFooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero-section />

    <section>
      <div class="w-full border-y border-border bg-accent/70">
        <div class="mx-auto max-w-6xl px-gutter py-section">
          <app-anime-section
            title="Highest-rated anime"
            [icon]="mostViewedIcon"
            [items]="mostViewedCards()"
            [loading]="loading()"
            [error]="error()"
            gridClass="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          />
        </div>
      </div>

      <div class="mx-auto max-w-6xl px-gutter py-section">
        <app-anime-section
          title="Latest releases"
          [icon]="latestReleaseIcon"
          [items]="latestReleaseCards()"
          [loading]="loading()"
          [error]="error()"
          gridClass="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        />
      </div>
    </section>

    <app-community-footer />
  `,
})
export class HomePageComponent {
  private readonly anilistService = inject(AnilistService);

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
      .map((episode) => this.mapEpisodeToCard(episode, { hideTags: true })),
  );

  private mapEpisodeToCard(
    episode: AiringEpisode,
    options: { compactTags?: boolean; hideTags?: boolean } = {},
  ): AnimeCardData {
    const seasonLabel = this.resolveSeasonLabel(episode.startDate);
    const rating = this.formatRating(episode.averageScore);
    return {
      id: episode.animeId,
      slug: episode.animeSlug,
      title: episode.title,
      imageUrl: episode.coverImage,
      badge: `EP ${episode.episodeNumber}`,
      season: seasonLabel,
      rating,
      tags: episode.genres?.slice(0, 2) ?? [],
      compactTags: options.compactTags,
      hideTags: options.hideTags,
    };
  }

  private resolveSeasonLabel(date: AnimeFuzzyDate | undefined): string {
    if (!date?.year || !date.month) {
      return 'Season TBD';
    }

    const month = date.month;
    const year = date.year;
    const season =
      month <= 3
        ? 'Winter'
        : month <= 6
          ? 'Spring'
          : month <= 9
            ? 'Summer'
            : month <= 12
              ? 'Fall'
              : 'Winter';

    return `${season} ${year}`;
  }

  private formatRating(score: number | undefined): string | undefined {
    if (!score || Number.isNaN(score)) {
      return undefined;
    }

    return (score / 10).toFixed(1);
  }

  private mapSummaryToCard(anime: AnimeSummary): AnimeCardData {
    const title = this.resolveSummaryTitle(anime.title);
    const subtitle = this.resolveRomajiSubtitle(anime.title);
    const rating = this.formatRating(anime.averageScore);
    return {
      id: anime.id,
      slug: anime.slug,
      title,
      subtitle,
      imageUrl: anime.coverImage?.extraLarge ?? anime.coverImage?.large ?? anime.coverImage?.medium,
      badge: rating,
      badgeIcon: rating ? ANIME_CARD_BADGE_ICON.STAR : undefined,
      tags: anime.genres?.slice(0, 2) ?? [],
    };
  }

  private resolveSummaryTitle(title: AnimeTitle): string {
    return title.english ?? title.romaji ?? 'Untitled';
  }

  private resolveRomajiSubtitle(title: AnimeTitle): string | undefined {
    const romaji = title.romaji?.trim();
    return romaji ? romaji : undefined;
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
