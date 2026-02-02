import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';
import type { AnimeCardData } from '../../components/anime-card/anime-card.component';
import {
  ANIME_CARD_BADGE_ICON,
  AnimeCardComponent,
} from '../../components/anime-card/anime-card.component';
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { AppButtonIconDirective } from '../../components/app-button/app-button-icon.directive';
import { GenreFiltersComponent } from '../../components/genre-filters/genre-filters.component';
import { IconSquareRoundedPlusComponent } from '../../components/icons/icon-square-rounded-plus.component';
import type { AnimeSummary } from '../../interfaces/anime-summary';
import type { GenreFilter } from '../../interfaces/genre-filter';
import type { AnimeTitle } from '../../interfaces/anime-title';
import { AnilistService } from '../../services/anilist.service';

@Component({
  selector: 'app-genres-page',
  standalone: true,
  imports: [
    GenreFiltersComponent,
    AnimeCardComponent,
    AppButtonComponent,
    AppButtonIconDirective,
    IconSquareRoundedPlusComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="mx-auto max-w-6xl px-gutter pb-section pt-6">
      <app-genre-filters />

      <section class="mt-6">
        @if (loading()) {
          <div class="grid grid-cols-2 gap-layout sm:grid-cols-3 lg:grid-cols-4">
            @for (slot of skeletonSlots; track slot) {
              <div
                class="rounded-xl border border-border bg-card/60 p-4 shadow-subtle animate-pulse"
              >
                <div class="aspect-[2/3] w-full rounded-xl bg-muted/60"></div>
                <div class="mt-4 h-3 w-3/4 rounded bg-muted/70"></div>
                <div class="mt-2 h-3 w-1/2 rounded bg-muted/50"></div>
                <div class="mt-4 flex gap-2">
                  <span class="h-5 w-16 rounded-full bg-accent/60"></span>
                  <span class="h-5 w-12 rounded-full bg-accent/50"></span>
                </div>
              </div>
            }
          </div>
        } @else if (error()) {
          <div
            class="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive-foreground"
            role="status"
            aria-live="polite"
          >
            {{ error() }}
          </div>
        } @else if (!visibleCards().length) {
          <div
            class="rounded-xl border border-border bg-card/60 p-6 text-sm text-muted-foreground"
            role="status"
            aria-live="polite"
          >
            No anime matched this selection. Try another refresh.
          </div>
        } @else {
          <div class="grid grid-cols-2 gap-layout sm:grid-cols-3 lg:grid-cols-4">
            @for (card of visibleCards(); track card.id) {
              <div class="anime-card-reveal">
                <app-anime-card [card]="card" />
              </div>
            }
          </div>
          <div class="mt-8 flex justify-center">
            <app-button
              label="Load more"
              size="sm"
              [disabled]="!canLoadMore()"
              (click)="loadMore()"
            >
              <app-icon-square-rounded-plus appButtonIcon />
            </app-button>
          </div>
        }
      </section>
    </article>
  `,
})
export class GenresPageComponent {
  private readonly anilistService = inject(AnilistService);
  private readonly pageSize = 20;
  private readonly maxResults = 200;

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly visibleCount = signal(this.pageSize);

  private readonly randomResults = toSignal(
    this.anilistService.getAnimeByFilters(this.buildRandomFilter()).pipe(
      tap(() => {
        this.loading.set(false);
        this.error.set(null);
      }),
      catchError((error) => {
        console.error('Unable to load random anime results.', error);
        this.loading.set(false);
        this.error.set('Unable to load the genres list right now.');
        return of([]);
      }),
    ),
    { initialValue: [] },
  );

  protected readonly cards = computed(() =>
    this.randomResults().map((anime) => this.mapSummaryToCard(anime)),
  );
  protected readonly visibleCards = computed(() => this.cards().slice(0, this.visibleCount()));
  protected readonly canLoadMore = computed(() => this.visibleCards().length < this.cards().length);
  protected readonly skeletonSlots = Array.from({ length: 20 }, (_, index) => index);

  private buildRandomFilter(): GenreFilter {
    return {
      genres: [],
      page: 1,
      perPage: this.maxResults,
      sort: 'POPULARITY_DESC',
    };
  }

  protected loadMore(): void {
    if (!this.canLoadMore()) {
      return;
    }

    const nextCount = this.visibleCount() + this.pageSize;
    this.visibleCount.set(Math.min(nextCount, this.cards().length));
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

  private formatRating(score: number | undefined): string | undefined {
    if (!score || Number.isNaN(score)) {
      return undefined;
    }

    return (score / 10).toFixed(1);
  }
}
