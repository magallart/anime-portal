import type { AnimeFormat } from './anime-format';
import type { AnimeSeason } from './anime-season';
import type { AnimeSortOption } from './anime-sort-option';
import type { AnimeStatus } from './anime-status';

export interface GenreFilter {
  readonly genres: readonly string[];
  readonly season?: AnimeSeason;
  readonly year?: number;
  readonly status?: AnimeStatus;
  readonly format?: AnimeFormat;
  readonly search?: string;
  readonly sort?: AnimeSortOption;
  readonly page?: number;
  readonly perPage?: number;
}
