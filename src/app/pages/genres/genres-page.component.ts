import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import type { AnimeCardData } from '../../interfaces/anime-card-data';
import type { GenreFilterSelections } from '../../interfaces/genre-filter-selections';
import { DEFAULT_FILTER_SELECTIONS } from '../../constants/genre-filter-defaults';
import type { AnimeSearchPage } from '../../interfaces/anime-search-page';
import type { AnimeSummary } from '../../interfaces/anime-summary';
import { AnilistService } from '../../services/anilist.service';
import { AppToastService } from '../../services/app-toast.service';
import { GenresPageViewComponent } from './genres-page-view.component';
import { mapSummaryToCard } from '../../lib/anime-view-models';
import {
  buildGenreFilterPayload,
  filterByRating,
  resolveActiveGenre,
} from '../../lib/genres/genre-filters';

@Component({
  selector: 'app-genres-page',
  standalone: true,
  imports: [GenresPageViewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-genres-page-view
      [loading]="loading()"
      [error]="error()"
      [visibleCards]="visibleCards()"
      [skeletonSlots]="skeletonSlots"
      [currentPage]="currentPage()"
      [totalPages]="totalPages()"
      (filtersApplied)="onFiltersApplied($event)"
      (pageChange)="onPageChange($event)"
    />
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
        this.anilistService
          .getAnimeByFilters(buildGenreFilterPayload(filters, page, this.pageSize))
          .pipe(
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
    filterByRating(this.searchResults().items, this.appliedFilters().rating),
  );
  protected readonly cards = computed(() => {
    const activeGenre = resolveActiveGenre(this.appliedFilters().genre);
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
    return mapSummaryToCard(anime, { activeGenre });
  }
}
