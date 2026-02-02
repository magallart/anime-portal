import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import type { AnimeCardData } from '../../components/anime-card/anime-card.component';
import { AnimeCardComponent } from '../../components/anime-card/anime-card.component';
import { GenreFiltersComponent } from '../../components/genre-filters/genre-filters.component';
import type { AnimeSummary } from '../../interfaces/anime-summary';
import type { GenreFilter } from '../../interfaces/genre-filter';
import type { AnimeTitle } from '../../interfaces/anime-title';
import { AnilistService } from '../../services/anilist.service';

@Component({
  selector: 'app-genres-page',
  standalone: true,
  imports: [GenreFiltersComponent, AnimeCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="mx-auto max-w-6xl px-gutter pb-section pt-6">
      <app-genre-filters />

      <section class="mt-6">
        <div class="grid grid-cols-2 gap-layout sm:grid-cols-3 lg:grid-cols-4">
          @for (card of cards(); track card.id) {
            <app-anime-card [card]="card" />
          }
        </div>
      </section>
    </article>
  `,
})
export class GenresPageComponent {
  private readonly anilistService = inject(AnilistService);

  private readonly randomPage = this.pickRandomPage();
  private readonly randomResults = toSignal(
    this.anilistService.getAnimeByFilters(this.buildRandomFilter()).pipe(
      catchError((error) => {
        console.error('Unable to load random anime results.', error);
        return of([]);
      }),
    ),
    { initialValue: [] },
  );

  protected readonly cards = computed(() =>
    this.randomResults().map((anime) => this.mapSummaryToCard(anime)),
  );

  private buildRandomFilter(): GenreFilter {
    return {
      genres: [],
      page: this.randomPage,
      perPage: 20,
      sort: 'POPULARITY_DESC',
    };
  }

  private pickRandomPage(): number {
    const maxPage = 20;
    return Math.floor(Math.random() * maxPage) + 1;
  }

  private mapSummaryToCard(anime: AnimeSummary): AnimeCardData {
    return {
      id: anime.id,
      slug: anime.slug,
      title: this.resolveSummaryTitle(anime.title),
      imageUrl: anime.coverImage?.extraLarge ?? anime.coverImage?.large ?? anime.coverImage?.medium,
      rating: this.formatRating(anime.averageScore),
      tags: anime.genres?.slice(0, 2) ?? [],
    };
  }

  private resolveSummaryTitle(title: AnimeTitle): string {
    return title.english ?? title.romaji ?? 'Untitled';
  }

  private formatRating(score: number | undefined): string | undefined {
    if (!score || Number.isNaN(score)) {
      return undefined;
    }

    return (score / 10).toFixed(1);
  }
}
