import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, type MatSelectChange } from '@angular/material/select';

import { ANILIST_GENRE_OPTIONS } from '../../constants/anilist-genres';
import { ANILIST_RATING_OPTIONS } from '../../constants/anilist-ratings';
import { ANILIST_STATUS_OPTIONS } from '../../constants/anilist-statuses';
import { ANILIST_YEAR_OPTIONS } from '../../constants/anilist-years';
import { AppButtonComponent } from '../app-button/app-button.component';
import { AppButtonIconDirective } from '../app-button/app-button-icon.directive';
import { IconFilterComponent } from '../icons/icon-filter.component';

@Component({
  selector: 'app-genre-filters',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    AppButtonComponent,
    AppButtonIconDirective,
    IconFilterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="genre-filters rounded-2xl border border-border bg-card/70 p-card shadow-subtle">
      <div class="flex flex-wrap items-center justify-end gap-4">
        @if (hasActiveFilters()) {
          <button
            type="button"
            class="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            (click)="clearFilters()"
          >
            Clear filters
          </button>
        }
      </div>

      <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <div class="mt-6 flex justify-end">
        <app-button label="Apply filters" size="sm">
          <app-icon-filter appButtonIcon />
        </app-button>
      </div>
    </section>
  `,
})
export class GenreFiltersComponent {
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

  clearFilters(): void {
    this.genreSelection.set(FILTER_ALL);
    this.yearSelection.set(FILTER_ALL);
    this.statusSelection.set(FILTER_ALL);
    this.ratingSelection.set(FILTER_ALL);
  }
}

const FILTER_ALL = 'all' as const;
type FilterSelection = typeof FILTER_ALL | number | string;
