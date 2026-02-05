import { FILTER_ALL, type FilterSelection } from '../../constants/filter-selection';
import { ANILIST_RATING_FILTERS } from '../../constants/anilist-rating-filters';
import { ANILIST_STATUS_OPTIONS } from '../../constants/anilist-statuses';
import type { GenreFilter } from '../../interfaces/genre-filter';
import type { GenreFilterSelections } from '../../interfaces/genre-filter-selections';
import type { AnimeSummary } from '../../interfaces/anime-summary';
import type { AnimeStatus } from '../../interfaces/anime-status';

export function buildGenreFilterPayload(
  filters: GenreFilterSelections,
  page: number,
  perPage: number,
): GenreFilter {
  const status = isStatusSelection(filters.status) ? filters.status : undefined;
  return {
    genres:
      typeof filters.genre === 'string' && !isAllSelection(filters.genre) ? [filters.genre] : [],
    year: typeof filters.year === 'number' ? filters.year : undefined,
    status,
    page,
    perPage,
    sort: 'POPULARITY_DESC',
  };
}

export function filterByRating(
  results: readonly AnimeSummary[],
  selection: FilterSelection,
): readonly AnimeSummary[] {
  if (isAllSelection(selection)) {
    return results;
  }

  return results.filter((anime) => {
    if (!anime.averageScore || Number.isNaN(anime.averageScore)) {
      return false;
    }
    const normalizedScore = anime.averageScore / 10;
    if (selection === ANILIST_RATING_FILTERS.LT_5) {
      return normalizedScore < 5;
    }
    if (selection === ANILIST_RATING_FILTERS.BETWEEN_5_7) {
      return normalizedScore >= 5 && normalizedScore <= 7;
    }
    if (selection === ANILIST_RATING_FILTERS.GT_8) {
      return normalizedScore > 8;
    }
    return true;
  });
}

export function resolveActiveGenre(selection: FilterSelection): string | undefined {
  if (typeof selection !== 'string' || isAllSelection(selection)) {
    return undefined;
  }

  return selection;
}

export function isAllSelection(value: FilterSelection): value is typeof FILTER_ALL {
  return value === FILTER_ALL;
}

function isStatusSelection(value: FilterSelection): value is AnimeStatus {
  return (
    typeof value === 'string' && ANILIST_STATUS_OPTIONS.some((option) => option.value === value)
  );
}
