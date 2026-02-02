import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import type { AnimeCardData } from '../../components/anime-card/anime-card.component';
import {
  ANIME_CARD_BADGE_ICON,
  AnimeCardComponent,
} from '../../components/anime-card/anime-card.component';
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { AppButtonIconDirective } from '../../components/app-button/app-button-icon.directive';
import {
  FILTER_ALL,
  GenreFiltersComponent,
  type FilterSelection,
  type GenreFilterSelections,
} from '../../components/genre-filters/genre-filters.component';
import { ANILIST_RATING_FILTERS } from '../../constants/anilist-rating-filters';
import { DEFAULT_FILTER_SELECTIONS } from '../../constants/genre-filter-defaults';
import { IconSquareRoundedPlusComponent } from '../../components/icons/icon-square-rounded-plus.component';
import { ANILIST_STATUS_OPTIONS } from '../../constants/anilist-statuses';
import type { AnimeSummary } from '../../interfaces/anime-summary';
import type { AnimeStatus } from '../../interfaces/anime-status';
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
      <app-genre-filters (filtersApplied)="onFiltersApplied($event)" />

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
            <div class="flex flex-col items-center gap-3">
              <p class="text-xs text-muted-foreground">{{ countLabel() }}</p>
              <app-button
                label="Load more"
                size="sm"
                [disabled]="!canLoadMore()"
                (click)="loadMore()"
              >
                <app-icon-square-rounded-plus appButtonIcon />
              </app-button>
            </div>
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
  protected readonly appliedFilters = signal<GenreFilterSelections>(DEFAULT_FILTER_SELECTIONS);

  private readonly filterResults = toSignal(
    toObservable(this.appliedFilters).pipe(
      tap(() => {
        this.loading.set(true);
        this.error.set(null);
        this.visibleCount.set(this.pageSize);
      }),
      switchMap((filters) =>
        this.anilistService.getAnimeByFilters(this.buildFilterPayload(filters)).pipe(
          tap(() => {
            this.loading.set(false);
          }),
          catchError((error) => {
            console.error('Unable to load filtered anime results.', error);
            this.loading.set(false);
            this.error.set('Unable to load the genres list right now.');
            return of([]);
          }),
        ),
      ),
    ),
    { initialValue: [] },
  );

  protected readonly filteredResults = computed(() =>
    this.applyRatingFilter(this.filterResults(), this.appliedFilters().rating),
  );
  protected readonly cards = computed(() => {
    const activeGenre = this.resolveActiveGenre(this.appliedFilters().genre);
    return this.filteredResults().map((anime) => this.mapSummaryToCard(anime, activeGenre));
  });
  protected readonly visibleCards = computed(() => this.cards().slice(0, this.visibleCount()));
  protected readonly canLoadMore = computed(() => this.visibleCards().length < this.cards().length);
  protected readonly countLabel = computed(
    () => `Showing ${this.visibleCards().length} of ${this.cards().length}`,
  );
  protected readonly skeletonSlots = Array.from({ length: 20 }, (_, index) => index);

  protected onFiltersApplied(filters: GenreFilterSelections): void {
    this.appliedFilters.set(filters);
  }

  private buildFilterPayload(filters: GenreFilterSelections): GenreFilter {
    const status = this.isStatusSelection(filters.status) ? filters.status : undefined;
    return {
      genres:
        typeof filters.genre === 'string' && !this.isAllSelection(filters.genre)
          ? [filters.genre]
          : [],
      year: typeof filters.year === 'number' ? filters.year : undefined,
      status,
      page: 1,
      perPage: this.maxResults,
      sort: 'POPULARITY_DESC',
    };
  }

  private applyRatingFilter(
    results: readonly AnimeSummary[],
    selection: FilterSelection,
  ): readonly AnimeSummary[] {
    if (this.isAllSelection(selection)) {
      return results;
    }

    return results.filter((anime) => {
      if (!anime.averageScore || Number.isNaN(anime.averageScore)) {
        return false;
      }
      const normalizedScore = anime.averageScore / 10;
      if (selection === ANILIST_RATING_FILTERS.LT_5) {
        return normalizedScore < 5;
      }
      if (selection === ANILIST_RATING_FILTERS.BETWEEN_5_7) {
        return normalizedScore >= 5 && normalizedScore <= 7;
      }
      if (selection === ANILIST_RATING_FILTERS.GT_8) {
        return normalizedScore > 8;
      }
      return true;
    });
  }

  private isStatusSelection(value: FilterSelection): value is AnimeStatus {
    return (
      typeof value === 'string' && ANILIST_STATUS_OPTIONS.some((option) => option.value === value)
    );
  }

  private isAllSelection(value: FilterSelection): value is typeof FILTER_ALL {
    return value === FILTER_ALL;
  }

  protected loadMore(): void {
    if (!this.canLoadMore()) {
      return;
    }

    const nextCount = this.visibleCount() + this.pageSize;
    this.visibleCount.set(Math.min(nextCount, this.cards().length));
  }

  private mapSummaryToCard(anime: AnimeSummary, activeGenre?: string): AnimeCardData {
    const title = this.resolveSummaryTitle(anime.title);
    const subtitle = this.resolveRomajiSubtitle(anime.title);
    const rating = this.formatRating(anime.averageScore);
    const tags = this.resolveCardTags(anime.genres ?? [], activeGenre);
    return {
      id: anime.id,
      slug: anime.slug,
      title,
      subtitle,
      imageUrl: anime.coverImage?.extraLarge ?? anime.coverImage?.large ?? anime.coverImage?.medium,
      badge: rating,
      badgeIcon: rating ? ANIME_CARD_BADGE_ICON.STAR : undefined,
      tags,
    };
  }

  private resolveActiveGenre(selection: FilterSelection): string | undefined {
    if (typeof selection !== 'string' || this.isAllSelection(selection)) {
      return undefined;
    }

    return selection;
  }

  private resolveCardTags(genres: readonly string[], activeGenre?: string): readonly string[] {
    if (!genres.length) {
      return [];
    }

    const normalizedActive = activeGenre?.toLowerCase();
    const hasActive = normalizedActive
      ? genres.some((genre) => genre.toLowerCase() === normalizedActive)
      : false;

    if (!activeGenre || !hasActive) {
      return genres.slice(0, 2);
    }

    const remaining = genres.filter((genre) => genre.toLowerCase() !== normalizedActive);
    return [activeGenre, ...remaining].slice(0, 2);
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
