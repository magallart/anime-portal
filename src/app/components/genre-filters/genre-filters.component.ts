import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-genre-filters',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="genre-filters rounded-2xl border border-border bg-card/70 p-card shadow-subtle">
      <div class="flex flex-wrap items-center justify-end gap-4">
        <button
          type="button"
          class="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Clear filters
        </button>
      </div>

      <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <mat-form-field
          appearance="outline"
          floatLabel="always"
          subscriptSizing="dynamic"
          class="w-full"
        >
          <mat-label>Genre</mat-label>
          <mat-select panelClass="genre-filters-panel">
            <mat-option value="all">All</mat-option>
            <mat-option value="action">Action</mat-option>
            <mat-option value="comedy">Comedy</mat-option>
            <mat-option value="drama">Drama</mat-option>
            <mat-option value="fantasy">Fantasy</mat-option>
            <mat-option value="sci-fi">Sci-Fi</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field
          appearance="outline"
          floatLabel="always"
          subscriptSizing="dynamic"
          class="w-full"
        >
          <mat-label>Year</mat-label>
          <mat-select panelClass="genre-filters-panel">
            <mat-option value="all">All</mat-option>
            <mat-option value="2026">2026</mat-option>
            <mat-option value="2025">2025</mat-option>
            <mat-option value="2024">2024</mat-option>
            <mat-option value="2023">2023</mat-option>
            <mat-option value="2022">2022</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field
          appearance="outline"
          floatLabel="always"
          subscriptSizing="dynamic"
          class="w-full"
        >
          <mat-label>Status</mat-label>
          <mat-select panelClass="genre-filters-panel">
            <mat-option value="all">All</mat-option>
            <mat-option value="airing">Airing</mat-option>
            <mat-option value="finished">Finished</mat-option>
            <mat-option value="upcoming">Upcoming</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
    </section>
  `,
})
export class GenreFiltersComponent {}
