import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import { ANIME_CARD_BADGE_ICON } from '../../constants/anime-card-badge';
import type { AnimeCardData } from '../../interfaces/anime-card-data';
import { AnimeCardComponent } from '../../components/anime-card/anime-card.component';
import { FILTER_ALL, type FilterSelection } from '../../constants/filter-selection';
import type { GenreFilterSelections } from '../../interfaces/genre-filter-selections';
import { GenreFiltersComponent } from '../../components/genre-filters/genre-filters.component';
import { ANILIST_RATING_FILTERS } from '../../constants/anilist-rating-filters';
import { DEFAULT_FILTER_SELECTIONS } from '../../constants/genre-filter-defaults';
import { ANILIST_STATUS_OPTIONS } from '../../constants/anilist-statuses';
import type { AnimeSearchPage } from '../../interfaces/anime-search-page';
import type { AnimeSummary } from '../../interfaces/anime-summary';
import type { AnimeStatus } from '../../interfaces/anime-status';
import type { GenreFilter } from '../../interfaces/genre-filter';
import type { AnimeTitle } from '../../interfaces/anime-title';
import { AnilistService } from '../../services/anilist.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { AppToastService } from '../../services/app-toast.service';

@Component({
  selector: 'app-genres-page',
  standalone: true,
  imports: [GenreFiltersComponent, AnimeCardComponent, PaginationComponent],
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
            class="flex flex-col items-center gap-4 p-6 text-center text-sm text-muted-foreground"
            role="status"
            aria-live="polite"
          >
            <div class="space-y-2">
              <p class="text-2xl font-semibold text-foreground sm:text-3xl">
                Genre gremlins ate the results.
              </p>
              <p class="text-lg text-muted-foreground sm:text-xl">
                Tweak the filters and we’ll try again.
              </p>
            </div>
            <img
              src="/images/no-results.png"
              alt=""
              class="w-80 max-w-full sm:w-[26rem]"
              loading="lazy"
              decoding="async"
            />
          </div>
        } @else {
          <div class="grid grid-cols-2 gap-layout sm:grid-cols-3 lg:grid-cols-4">
            @for (card of visibleCards(); track card.id) {
              <div class="anime-card-reveal">
                <app-anime-card [card]="card" />
              </div>
            }
          </div>
          <div class="mt-12 flex justify-center">
            <app-pagination
              [currentPage]="currentPage()"
              [totalPages]="totalPages()"
              (pageChange)="onPageChange($event)"
            />
          </div>
        }
      </section>
    </article>
  `,
})
export class GenresPageComponent {
  private readonly anilistService = inject(AnilistService);
  private readonly toastService = inject(AppToastService);
  private readonly document = inject(DOCUMENT);
  private readonly pageSize = 20;
  private readonly initialPageInfo = {
    currentPage: 1,
    lastPage: 1,
    hasNextPage: false,
    total: 0,
    perPage: this.pageSize,
  };

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly currentPage = signal(1);
  protected readonly appliedFilters = signal<GenreFilterSelections>(DEFAULT_FILTER_SELECTIONS);

  private readonly searchResults = toSignal(
    toObservable(
      computed(() => ({
        filters: this.appliedFilters(),
        page: this.currentPage(),
      })),
    ).pipe(
      tap(() => {
        this.loading.set(true);
        this.error.set(null);
      }),
      switchMap(({ filters, page }) =>
        this.anilistService.getAnimeByFilters(this.buildFilterPayload(filters, page)).pipe(
          tap(() => {
            this.loading.set(false);
          }),
          catchError((error) => {
            console.error('Unable to load filtered anime results.', error);
            this.loading.set(false);
            this.error.set('Unable to load the genres list right now.');
            this.toastService.showError('Unable to load the genres list right now.');
            return of(this.emptySearchResults());
          }),
        ),
      ),
    ),
    { initialValue: this.emptySearchResults() },
  );

  protected readonly filteredResults = computed(() =>
    this.applyRatingFilter(this.searchResults().items, this.appliedFilters().rating),
  );
  protected readonly cards = computed(() => {
    const activeGenre = this.resolveActiveGenre(this.appliedFilters().genre);
    return this.filteredResults().map((anime) => this.mapSummaryToCard(anime, activeGenre));
  });
  protected readonly visibleCards = computed(() => this.cards());
  protected readonly pageInfo = computed(() => this.searchResults().pageInfo);
  protected readonly totalPages = computed(() => Math.max(this.pageInfo().lastPage, 1));
  protected readonly skeletonSlots = Array.from({ length: this.pageSize }, (_, index) => index);

  protected onFiltersApplied(filters: GenreFilterSelections): void {
    this.appliedFilters.set(filters);
    this.currentPage.set(1);
  }

  private buildFilterPayload(filters: GenreFilterSelections, page: number): GenreFilter {
    const status = this.isStatusSelection(filters.status) ? filters.status : undefined;
    return {
      genres:
        typeof filters.genre === 'string' && !this.isAllSelection(filters.genre)
          ? [filters.genre]
          : [],
      year: typeof filters.year === 'number' ? filters.year : undefined,
      status,
      page,
      perPage: this.pageSize,
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

  protected onPageChange(page: number): void {
    if (page === this.currentPage()) {
      return;
    }

    this.currentPage.set(page);
    this.scrollToTop();
  }

  private scrollToTop(): void {
    const view = this.document.defaultView;
    if (!view) {
      return;
    }

    view.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private emptySearchResults(): AnimeSearchPage {
    return {
      items: [],
      pageInfo: this.initialPageInfo,
    };
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
