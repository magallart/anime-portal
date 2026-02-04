import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  computed,
  signal,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, type MatSelectChange } from '@angular/material/select';

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

@Component({
  selector: 'app-genre-filters',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    AppButtonComponent,
    AppButtonIconDirective,
    IconFilterComponent,
    IconWashDrycleanOffComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="genre-filters rounded-2xl border border-border bg-card/70 p-card shadow-subtle">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <mat-form-field
          appearance="outline"
          floatLabel="always"
          subscriptSizing="dynamic"
          class="w-full"
        >
          <mat-label>Genre</mat-label>
          <mat-select
            panelClass="genre-filters-panel"
            [value]="genreSelection()"
            (selectionChange)="onGenreChange($event)"
          >
            <mat-option value="all">All</mat-option>
            @for (option of genreOptions; track option.value) {
              <mat-option [value]="option.value">{{ option.label }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field
          appearance="outline"
          floatLabel="always"
          subscriptSizing="dynamic"
          class="w-full"
        >
          <mat-label>Year</mat-label>
          <mat-select
            panelClass="genre-filters-panel"
            [value]="yearSelection()"
            (selectionChange)="onYearChange($event)"
          >
            <mat-option value="all">All</mat-option>
            @for (option of yearOptions; track option.value) {
              <mat-option [value]="option.value">{{ option.label }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field
          appearance="outline"
          floatLabel="always"
          subscriptSizing="dynamic"
          class="w-full"
        >
          <mat-label>Status</mat-label>
          <mat-select
            panelClass="genre-filters-panel"
            [value]="statusSelection()"
            (selectionChange)="onStatusChange($event)"
          >
            <mat-option value="all">All</mat-option>
            @for (option of statusOptions; track option.value) {
              <mat-option [value]="option.value">{{ option.label }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field
          appearance="outline"
          floatLabel="always"
          subscriptSizing="dynamic"
          class="w-full"
        >
          <mat-label>Rating</mat-label>
          <mat-select
            panelClass="genre-filters-panel"
            [value]="ratingSelection()"
            (selectionChange)="onRatingChange($event)"
          >
            <mat-option value="all">All</mat-option>
            @for (option of ratingOptions; track option.value) {
              <mat-option [value]="option.value">{{ option.label }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
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
  @Output() readonly filtersApplied = new EventEmitter<GenreFilterSelections>();

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

  onGenreChange(event: MatSelectChange): void {
    this.genreSelection.set(event.value as FilterSelection);
  }

  onYearChange(event: MatSelectChange): void {
    this.yearSelection.set(event.value as FilterSelection);
  }

  onStatusChange(event: MatSelectChange): void {
    this.statusSelection.set(event.value as FilterSelection);
  }

  onRatingChange(event: MatSelectChange): void {
    this.ratingSelection.set(event.value as FilterSelection);
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
