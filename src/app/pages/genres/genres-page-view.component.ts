import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { GenreFiltersComponent } from '../../components/genre-filters/genre-filters.component';
import { AnimeCardComponent } from '../../components/anime-card/anime-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import type { AnimeCardData } from '../../interfaces/anime-card-data';
import type { GenreFilterSelections } from '../../interfaces/genre-filter-selections';

@Component({
  selector: 'app-genres-page-view',
  standalone: true,
  imports: [GenreFiltersComponent, AnimeCardComponent, PaginationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="mx-auto max-w-6xl px-gutter pb-section pt-6">
      <app-genre-filters (filtersApplied)="filtersApplied.emit($event)" />

      <section class="mt-6">
        @if (loading()) {
          <div class="grid grid-cols-2 gap-layout sm:grid-cols-3 lg:grid-cols-4">
            @for (slot of skeletonSlots(); track slot) {
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
                Tweak the filters and we'll try again.
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

  @Output() readonly filtersApplied = new EventEmitter<GenreFilterSelections>();
  @Output() readonly pageChange = new EventEmitter<number>();
}
