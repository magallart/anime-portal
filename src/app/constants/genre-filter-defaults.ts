import { FILTER_ALL } from './filter-selection';
import type { GenreFilterSelections } from '../interfaces/genre-filter-selections';

export const DEFAULT_FILTER_SELECTIONS: GenreFilterSelections = {
  genre: FILTER_ALL,
  year: FILTER_ALL,
  status: FILTER_ALL,
  rating: FILTER_ALL,
} as const;
