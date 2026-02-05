import { Injectable, inject } from '@angular/core';
import { map, type Observable } from 'rxjs';
import { GraphqlClientService } from './graphql-client.service';
import type { AiringEpisode } from '../interfaces/airing-episode';
import type { AiringWindow } from '../interfaces/airing-window';
import type { AnimeDetail } from '../interfaces/anime-detail';
import type { AnimeSummary } from '../interfaces/anime-summary';
import type { GenreFilter } from '../interfaces/genre-filter';
import type { AnimeSearchPage } from '../interfaces/anime-search-page';
import type {
  AnimeDetailQueryResponse,
  AnimeDetailQueryVariables,
  LatestAiringQueryResponse,
  SearchQueryResponse,
  SearchQueryVariables,
} from '../interfaces/anilist-graphql';
import {
  ANIME_DETAIL_QUERY,
  LATEST_AIRING_QUERY,
  SEARCH_QUERY,
} from '../lib/anilist/anilist-queries';
import { mapAiringEpisode, mapAnimeDetail, mapAnimeSummary } from '../lib/anilist/anilist-mappers';
import { getCurrentWeekWindow, toSearchTerm } from '../lib/anilist/anilist-utils';

@Injectable({
  providedIn: 'root',
})
export class AnilistService {
  private readonly client = inject(GraphqlClientService);

  getAiringThisWeek(window: AiringWindow = getCurrentWeekWindow()): Observable<AiringEpisode[]> {
    const variables = {
      start: Math.floor(window.start.getTime() / 1000),
      end: Math.floor(window.end.getTime() / 1000),
    };

    return this.client
      .execute<LatestAiringQueryResponse, typeof variables>(LATEST_AIRING_QUERY, variables)
      .pipe(
        map((response) =>
          response.Page.latestAiring
            .filter((node) => !node.media.isAdult)
            .map((node) => mapAiringEpisode(node)),
        ),
      );
  }

  getAnimeByFilters(filter: GenreFilter): Observable<AnimeSearchPage> {
    const variables: SearchQueryVariables = {
      page: filter.page ?? 1,
      perPage: filter.perPage ?? 20,
      search: filter.search,
      genre_in: filter.genres.length ? filter.genres : undefined,
      season: filter.season,
      seasonYear: filter.year,
      status: filter.status,
      format: filter.format,
      sort: filter.sort ?? 'POPULARITY_DESC',
      isAdult: false,
    };

    return this.client
      .execute<SearchQueryResponse, SearchQueryVariables>(SEARCH_QUERY, variables)
      .pipe(
        map((response) => ({
          items: response.Page.media.map((media) => mapAnimeSummary(media)),
          pageInfo: response.Page.pageInfo,
        })),
      );
  }

  getMostViewedAnime(perPage = 8): Observable<AnimeSummary[]> {
    const variables: SearchQueryVariables = {
      page: 1,
      perPage,
      sort: 'POPULARITY_DESC',
      isAdult: false,
    };

    return this.client
      .execute<SearchQueryResponse, SearchQueryVariables>(SEARCH_QUERY, variables)
      .pipe(map((response) => response.Page.media.map((media) => mapAnimeSummary(media))));
  }

  getHighestRatedAnime(perPage = 30): Observable<AnimeSummary[]> {
    const variables: SearchQueryVariables = {
      page: 1,
      perPage,
      sort: 'SCORE_DESC',
      isAdult: false,
    };

    return this.client
      .execute<SearchQueryResponse, SearchQueryVariables>(SEARCH_QUERY, variables)
      .pipe(map((response) => response.Page.media.map((media) => mapAnimeSummary(media))));
  }

  getAnimeDetailsBySlug(slug: string): Observable<AnimeDetail> {
    return this.client
      .execute<AnimeDetailQueryResponse, AnimeDetailQueryVariables>(ANIME_DETAIL_QUERY, {
        slug: toSearchTerm(slug),
      })
      .pipe(
        map((response) => {
          const media = response.Media;
          if (!media || media.isAdult) {
            throw new Error('Anime not found');
          }

          return mapAnimeDetail(media);
        }),
      );
  }
}
