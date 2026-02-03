import type { AnimeSummary } from './anime-summary';

export interface AnimeSearchPageInfo {
  readonly currentPage: number;
  readonly lastPage: number;
  readonly hasNextPage: boolean;
  readonly total: number;
  readonly perPage: number;
}

export interface AnimeSearchPage {
  readonly items: readonly AnimeSummary[];
  readonly pageInfo: AnimeSearchPageInfo;
}
