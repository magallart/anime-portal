import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { GenreFiltersComponent } from '../../components/genre-filters/genre-filters.component';
import { AnimeCardComponent } from '../../components/anime-card/anime-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { AppErrorMessageComponent } from '../../components/app-error-message/app-error-message.component';
import { GenresEmptyStateComponent } from './components/genres-empty-state.component';
import { GenresResultsSkeletonComponent } from './components/genres-results-skeleton.component';
import type { AnimeCardData } from '../../interfaces/anime-card-data';
import type { GenreFilterSelections } from '../../interfaces/genre-filter-selections';

@Component({
  selector: 'app-genres-page-view',
  standalone: true,
  imports: [
    GenreFiltersComponent,
    AnimeCardComponent,
    PaginationComponent,
    AppErrorMessageComponent,
    GenresEmptyStateComponent,
    GenresResultsSkeletonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="mx-auto max-w-6xl px-gutter pb-section pt-6">
      <app-genre-filters (filtersApplied)="filtersApplied.emit($event)" />

      <section class="mt-6">
        @if (loading()) {
          <app-genres-results-skeleton [slots]="skeletonSlots()" />
        } @else if (error()) {
          <app-error-message [message]="error() ?? ''" />
        } @else if (!visibleCards().length) {
          <app-genres-empty-state />
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
              (pageChange)="pageChange.emit($event)"
            />
          </div>
        }
      </section>
    </article>
  `,
})
export class GenresPageViewComponent {
  readonly loading = input(false);
  readonly error = input<string | null>(null);
  readonly visibleCards = input<readonly AnimeCardData[]>([]);
  readonly skeletonSlots = input<readonly number[]>([]);
  readonly currentPage = input(1);
  readonly totalPages = input(1);

  readonly filtersApplied = output<GenreFilterSelections>();
  readonly pageChange = output<number>();
}
