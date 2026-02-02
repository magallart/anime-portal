import {
  FILTER_ALL,
  type GenreFilterSelections,
} from '../components/genre-filters/genre-filters.component';

export const DEFAULT_FILTER_SELECTIONS: GenreFilterSelections = {
  genre: FILTER_ALL,
  year: FILTER_ALL,
  status: FILTER_ALL,
  rating: FILTER_ALL,
} as const;
