import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GenreFiltersComponent } from '../../components/genre-filters/genre-filters.component';
import { IconFilterComponent } from '../../components/icons/icon-filter.component';

@Component({
  selector: 'app-genres-page',
  standalone: true,
  imports: [GenreFiltersComponent, IconFilterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="mx-auto max-w-6xl space-y-12 px-gutter py-section">
      <header class="mb-8 text-left">
        <div class="flex flex-wrap items-center gap-3">
          <span
            class="inline-flex h-12 w-12 items-center justify-center text-primary"
            aria-hidden="true"
          >
            <app-icon-filter />
          </span>
          <h1 class="text-4xl font-heading text-foreground">Explore by genres</h1>
        </div>
      </header>

      <app-genre-filters />
    </article>
  `,
})
export class GenresPageComponent {}
