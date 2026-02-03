import type { FilterSelection } from '../constants/filter-selection';

export interface GenreFilterSelections {
  readonly genre: FilterSelection;
  readonly year: FilterSelection;
  readonly status: FilterSelection;
  readonly rating: FilterSelection;
}
