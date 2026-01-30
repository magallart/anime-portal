import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GenreFiltersComponent } from '../../components/genre-filters/genre-filters.component';

@Component({
  selector: 'app-genres-page',
  standalone: true,
  imports: [GenreFiltersComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="mx-auto max-w-6xl px-gutter pb-section pt-6">
      <app-genre-filters />
    </article>
  `,
})
export class GenresPageComponent {}
