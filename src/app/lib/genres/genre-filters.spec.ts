import { describe, expect, it } from 'vitest';
import { ANILIST_RATING_FILTERS } from '../../constants/anilist-rating-filters';
import { FILTER_ALL } from '../../constants/filter-selection';
import { ANILIST_STATUS_OPTIONS } from '../../constants/anilist-statuses';
import type { AnimeSummary } from '../../interfaces/anime-summary';
import type { GenreFilterSelections } from '../../interfaces/genre-filter-selections';
import {
  buildGenreFilterPayload,
  filterByRating,
  isAllSelection,
  resolveActiveGenre,
} from './genre-filters';

const createAnime = (overrides: Partial<AnimeSummary> = {}): AnimeSummary => ({
  id: 1,
  slug: 'demo',
  title: { romaji: 'Demo' },
  coverImage: { large: 'cover.jpg' },
  genres: ['Action'],
  ...overrides,
});

describe('genre-filters', () => {
  it('builds payload with selected genre and status', () => {
    const selections: GenreFilterSelections = {
      genre: 'Action',
      year: 2024,
      status: ANILIST_STATUS_OPTIONS[0]?.value ?? FILTER_ALL,
      rating: FILTER_ALL,
    };

    const result = buildGenreFilterPayload(selections, 2, 20);

    expect(result).toEqual({
      genres: ['Action'],
      year: 2024,
      status: ANILIST_STATUS_OPTIONS[0]?.value,
      page: 2,
      perPage: 20,
      sort: 'POPULARITY_DESC',
    });
  });

  it('builds payload without genre and status when selection is all', () => {
    const selections: GenreFilterSelections = {
      genre: FILTER_ALL,
      year: FILTER_ALL,
      status: FILTER_ALL,
      rating: FILTER_ALL,
    };

    const result = buildGenreFilterPayload(selections, 1, 10);

    expect(result).toEqual({
      genres: [],
      year: undefined,
      status: undefined,
      page: 1,
      perPage: 10,
      sort: 'POPULARITY_DESC',
    });
  });

  it('filters by rating buckets and ignores missing scores', () => {
    const results = [
      createAnime({ id: 1, averageScore: 40 }),
      createAnime({ id: 2, averageScore: 65 }),
      createAnime({ id: 3, averageScore: 90 }),
      createAnime({ id: 4, averageScore: NaN }),
      createAnime({ id: 5 }),
    ];

    expect(filterByRating(results, ANILIST_RATING_FILTERS.LT_5).map((anime) => anime.id)).toEqual(
      [1],
    );
    expect(
      filterByRating(results, ANILIST_RATING_FILTERS.BETWEEN_5_7).map((anime) => anime.id),
    ).toEqual([2]);
    expect(filterByRating(results, ANILIST_RATING_FILTERS.GT_8).map((anime) => anime.id)).toEqual(
      [3],
    );
  });

  it('keeps results when rating selection is all', () => {
    const results = [createAnime({ id: 1 }), createAnime({ id: 2 })];
    expect(filterByRating(results, FILTER_ALL)).toBe(results);
  });

  it('resolves active genre selection', () => {
    expect(resolveActiveGenre('Drama')).toBe('Drama');
    expect(resolveActiveGenre(FILTER_ALL)).toBeUndefined();
    expect(resolveActiveGenre(2020)).toBeUndefined();
  });

  it('detects the all selection', () => {
    expect(isAllSelection(FILTER_ALL)).toBe(true);
    expect(isAllSelection('Action')).toBe(false);
  });
});
