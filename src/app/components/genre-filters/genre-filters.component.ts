import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';

import { ANILIST_GENRE_OPTIONS } from '../../constants/anilist-genres';
import { ANILIST_RATING_OPTIONS } from '../../constants/anilist-ratings';
import { ANILIST_STATUS_OPTIONS } from '../../constants/anilist-statuses';
import { ANILIST_YEAR_OPTIONS } from '../../constants/anilist-years';
import { FILTER_ALL, type FilterSelection } from '../../constants/filter-selection';
import type { GenreFilterSelections } from '../../interfaces/genre-filter-selections';
import { AppButtonComponent } from '../app-button/app-button.component';
import { AppButtonIconDirective } from '../app-button/app-button-icon.directive';
import { IconFilterComponent } from '../icons/icon-filter.component';
import { IconWashDrycleanOffComponent } from '../icons/icon-wash-dryclean-off.component';
import { FilterSelectComponent } from './filter-select.component';

@Component({
  selector: 'app-genre-filters',
  standalone: true,
  imports: [
    FilterSelectComponent,
    AppButtonComponent,
    AppButtonIconDirective,
    IconFilterComponent,
    IconWashDrycleanOffComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="genre-filters rounded-2xl border border-border bg-card/70 p-card shadow-subtle">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <app-filter-select
          label="Genre"
          [options]="genreOptions"
          [value]="genreSelection()"
          (selectionChange)="onGenreChange($event)"
        />
        <app-filter-select
          label="Year"
          [options]="yearOptions"
          [value]="yearSelection()"
          (selectionChange)="onYearChange($event)"
        />
        <app-filter-select
          label="Status"
          [options]="statusOptions"
          [value]="statusSelection()"
          (selectionChange)="onStatusChange($event)"
        />
        <app-filter-select
          label="Rating"
          [options]="ratingOptions"
          [value]="ratingSelection()"
          (selectionChange)="onRatingChange($event)"
        />
      </div>

      <div class="mt-6 flex justify-center">
        <div
          class="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
        >
          <app-button
            label="Apply filters"
            size="sm"
            className="w-full sm:w-auto"
            [disabled]="!hasActiveFilters()"
            (click)="applyFilters()"
          >
            <app-icon-filter appButtonIcon />
          </app-button>
          <button
            type="button"
            class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/60 bg-transparent px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10 hover:text-primary-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
            [disabled]="!hasActiveFilters()"
            (click)="clearFilters()"
          >
            <app-icon-wash-dryclean-off />
            Clear filters
          </button>
        </div>
      </div>
    </section>
  `,
})
export class GenreFiltersComponent {
  readonly filtersApplied = output<GenreFilterSelections>();

  readonly genreOptions = ANILIST_GENRE_OPTIONS;
  readonly yearOptions = ANILIST_YEAR_OPTIONS;
  readonly statusOptions = ANILIST_STATUS_OPTIONS;
  readonly ratingOptions = ANILIST_RATING_OPTIONS;

  protected readonly genreSelection = signal<FilterSelection>(FILTER_ALL);
  protected readonly yearSelection = signal<FilterSelection>(FILTER_ALL);
  protected readonly statusSelection = signal<FilterSelection>(FILTER_ALL);
  protected readonly ratingSelection = signal<FilterSelection>(FILTER_ALL);

  protected readonly hasActiveFilters = computed(
    () =>
      this.genreSelection() !== FILTER_ALL ||
      this.yearSelection() !== FILTER_ALL ||
      this.statusSelection() !== FILTER_ALL ||
      this.ratingSelection() !== FILTER_ALL,
  );

  onGenreChange(value: string | number): void {
    this.genreSelection.set(value as FilterSelection);
  }

  onYearChange(value: string | number): void {
    this.yearSelection.set(value as FilterSelection);
  }

  onStatusChange(value: string | number): void {
    this.statusSelection.set(value as FilterSelection);
  }

  onRatingChange(value: string | number): void {
    this.ratingSelection.set(value as FilterSelection);
  }

  applyFilters(): void {
    if (!this.hasActiveFilters()) {
      return;
    }
    this.filtersApplied.emit(this.buildSelections());
  }

  clearFilters(): void {
    this.genreSelection.set(FILTER_ALL);
    this.yearSelection.set(FILTER_ALL);
    this.statusSelection.set(FILTER_ALL);
    this.ratingSelection.set(FILTER_ALL);
    this.filtersApplied.emit(this.buildSelections());
  }

  private buildSelections(): GenreFilterSelections {
    return {
      genre: this.genreSelection(),
      year: this.yearSelection(),
      status: this.statusSelection(),
      rating: this.ratingSelection(),
    };
  }
}
