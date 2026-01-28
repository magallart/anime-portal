import { Injectable, inject } from '@angular/core';
import { map, type Observable } from 'rxjs';
import { GraphqlClientService } from './graphql-client.service';
import type { AiringEpisode } from '../interfaces/airing-episode';
import type { AiringWindow } from '../interfaces/airing-window';
import type { AnimeDetail } from '../interfaces/anime-detail';
import type { AnimeSummary } from '../interfaces/anime-summary';
import type { GenreFilter } from '../interfaces/genre-filter';
import type { AnimeStudio } from '../interfaces/anime-studio';
import type { AnimeTag } from '../interfaces/anime-tag';
import type { StreamingEpisode } from '../interfaces/streaming-episode';
import type { AnimeFormat } from '../interfaces/anime-format';
import type { AnimeStatus } from '../interfaces/anime-status';

@Injectable({
  providedIn: 'root',
})
export class AnilistService {
  private readonly client = inject(GraphqlClientService);

  getAiringThisWeek(
    window: AiringWindow = this.getCurrentWeekWindow(),
  ): Observable<AiringEpisode[]> {
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
            .map((node) => this.mapAiringEpisode(node)),
        ),
      );
  }

  getAnimeByFilters(filter: GenreFilter): Observable<AnimeSummary[]> {
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
      .pipe(map((response) => response.Page.media.map((media) => this.mapAnimeSummary(media))));
  }

  getAnimeDetailsBySlug(slug: string): Observable<AnimeDetail> {
    return this.client
      .execute<AnimeDetailQueryResponse, AnimeDetailQueryVariables>(ANIME_DETAIL_QUERY, {
        slug: this.toSearchTerm(slug),
      })
      .pipe(
        map((response) => {
          const media = response.Media;
          if (!media || media.isAdult) {
            throw new Error('Anime not found');
          }

          return this.mapAnimeDetail(media);
        }),
      );
  }

  private mapAiringEpisode(node: LatestAiringNode): AiringEpisode {
    return {
      animeId: node.media.id,
      animeSlug: this.resolveSlug(node.media),
      title: this.resolveTitle(node.media.title),
      titleNative: node.media.title?.native ?? undefined,
      titleRomaji: node.media.title?.romaji ?? undefined,
      episodeNumber: node.episode,
      airingAt: node.airingAt,
      airingAtDate: new Date(node.airingAt * 1000),
      coverImage:
        node.media.coverImage?.extraLarge ??
        node.media.coverImage?.large ??
        node.media.coverImage?.medium ??
        undefined,
      genres: node.media.genres ?? [],
      startDate: node.media.startDate ?? undefined,
      averageScore: node.media.averageScore ?? undefined,
    };
  }

  private mapAnimeSummary(media: AnimeSummaryNode): AnimeSummary {
    return {
      id: media.id,
      slug: this.resolveSlug(media),
      title: media.title,
      coverImage: media.coverImage,
      format: this.castToAnimeFormat(media.format),
      status: this.castToAnimeStatus(media.status),
      averageScore: media.averageScore ?? undefined,
      popularity: media.popularity ?? undefined,
      genres: media.genres ?? [],
      nextAiringEpisode: media.nextAiringEpisode
        ? this.mapAiringEpisode({
            airingAt: media.nextAiringEpisode.airingAt,
            episode: media.nextAiringEpisode.episode,
            media,
          })
        : undefined,
    };
  }

  private mapAnimeDetail(media: AnimeDetailNode): AnimeDetail {
    const summary = this.mapAnimeSummary(media);
    return {
      ...summary,
      description: this.sanitizeDescription(media.description),
      bannerImage: media.bannerImage ?? undefined,
      episodes: media.episodes ?? undefined,
      duration: media.duration ?? undefined,
      season: media.season ?? undefined,
      seasonYear: media.seasonYear ?? undefined,
      synonyms: media.synonyms ?? [],
      startDate: media.startDate ?? undefined,
      endDate: media.endDate ?? undefined,
      studios: media.studios?.nodes?.map(this.mapStudio) ?? [],
      tags: media.tags?.map(this.mapTag) ?? [],
      streamingEpisodes: media.streamingEpisodes?.map(this.mapStreamingEpisode) ?? [],
    };
  }

  private mapStudio(studio: AnimeStudioNode): AnimeStudio {
    return {
      id: studio.id,
      name: studio.name,
      isAnimationStudio: studio.isAnimationStudio ?? false,
    };
  }

  private mapTag(tag: AnimeTagNode): AnimeTag {
    return {
      id: tag.id,
      name: tag.name,
      description: tag.description ?? undefined,
      rank: tag.rank ?? undefined,
      isAdult: tag.isAdult ?? undefined,
    };
  }

  private mapStreamingEpisode(node: StreamingEpisodeNode): StreamingEpisode {
    return {
      title: node.title,
      url: node.url,
      thumbnail: node.thumbnail ?? undefined,
    };
  }

  private sanitizeDescription(value?: string | null): string | undefined {
    if (!value) {
      return undefined;
    }
    return value
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private castToAnimeFormat(value?: string | null): AnimeFormat | undefined {
    if (!value) {
      return undefined;
    }

    return ANIME_FORMAT_VALUES.includes(value as AnimeFormat) ? (value as AnimeFormat) : undefined;
  }

  private castToAnimeStatus(value?: string | null): AnimeStatus | undefined {
    if (!value) {
      return undefined;
    }

    return ANIME_STATUS_VALUES.includes(value as AnimeStatus) ? (value as AnimeStatus) : undefined;
  }

  private resolveSlug(media: {
    id: number;
    siteUrl?: string | null;
    title?: { romaji?: string };
  }): string {
    const slugFromUrl = this.parseSlugFromSiteUrl(media.siteUrl);
    if (slugFromUrl) {
      return slugFromUrl;
    }
    const base = media.title?.romaji ?? String(media.id);
    return base
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private parseSlugFromSiteUrl(siteUrl?: string | null): string | undefined {
    if (!siteUrl) {
      return undefined;
    }
    const match = siteUrl.match(/anime\/\d+\/([^/?#]+)/i);
    return match?.[1]?.toLowerCase();
  }

  private toSearchTerm(slug: string): string {
    return slug.replace(/-/g, ' ').trim();
  }

  private resolveTitle(title: { english?: string; romaji?: string } | undefined): string {
    return title?.english ?? title?.romaji ?? 'Untitled';
  }

  private getCurrentWeekWindow(): AiringWindow {
    const start = new Date();
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return { start, end };
  }
}

const LATEST_AIRING_QUERY = `
  query LatestAiring($start: Int!, $end: Int!) {
    Page(perPage: 25) {
      latestAiring: airingSchedules(airingAt_greater: $start, airingAt_lesser: $end, sort: TIME) {
        airingAt
        episode
        media {
          id
          siteUrl
          title {
            english
            romaji
            native
          }
          coverImage {
            large
            medium
            extraLarge
          }
          genres
          isAdult
          startDate {
            year
            month
            day
          }
          averageScore
        }
      }
    }
  }
`;

const SEARCH_QUERY = `
  query SearchAnime(
    $page: Int
    $perPage: Int
    $search: String
    $genre_in: [String!]
    $season: MediaSeason
    $seasonYear: Int
    $status: MediaStatus
    $format: MediaFormat
    $sort: [MediaSort!]
    $isAdult: Boolean
  ) {
    Page(page: $page, perPage: $perPage) {
      media(
        search: $search
        genre_in: $genre_in
        season: $season
        seasonYear: $seasonYear
        status: $status
        format: $format
        sort: $sort
        isAdult: $isAdult
        type: ANIME
      ) {
        id
        siteUrl
        title {
          english
          romaji
          native
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
        format
        status
        averageScore
        popularity
        genres
        isAdult
        nextAiringEpisode {
          airingAt
          episode
        }
      }
    }
  }
`;

const ANIME_DETAIL_QUERY = `
  query AnimeDetail($slug: String!) {
    Media(search: $slug, type: ANIME) {
      id
      siteUrl
      title {
        english
        romaji
        native
      }
      coverImage {
        extraLarge
        large
        medium
        color
      }
      isAdult
      bannerImage
      format
      status
      averageScore
      popularity
      genres
      nextAiringEpisode {
        airingAt
        episode
      }
      description
      episodes
      duration
      season
      seasonYear
      synonyms
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      studios {
        nodes {
          id
          name
          isAnimationStudio
        }
      }
      tags {
        id
        name
        description
        rank
        isAdult
      }
      streamingEpisodes {
        title
        url
        thumbnail
      }
    }
  }
`;

const ANIME_FORMAT_VALUES: readonly AnimeFormat[] = [
  'TV',
  'TV_SHORT',
  'MOVIE',
  'SPECIAL',
  'OVA',
  'ONA',
  'MUSIC',
] as const;

const ANIME_STATUS_VALUES: readonly AnimeStatus[] = [
  'FINISHED',
  'RELEASING',
  'NOT_YET_RELEASED',
  'CANCELLED',
  'HIATUS',
] as const;

interface LatestAiringQueryResponse {
  readonly Page: {
    readonly latestAiring: readonly LatestAiringNode[];
  };
}

interface LatestAiringNode {
  readonly airingAt: number;
  readonly episode: number;
  readonly media: AnimeSummaryNode;
}

interface SearchQueryResponse {
  readonly Page: {
    readonly media: readonly AnimeSummaryNode[];
  };
}

interface SearchQueryVariables {
  readonly page: number;
  readonly perPage: number;
  readonly search?: string;
  readonly genre_in?: readonly string[];
  readonly season?: string;
  readonly seasonYear?: number;
  readonly status?: string;
  readonly format?: string;
  readonly sort?: string;
  readonly isAdult?: boolean;
}

interface AnimeSummaryNode {
  readonly id: number;
  readonly siteUrl?: string | null;
  readonly title: {
    readonly english?: string;
    readonly romaji?: string;
    readonly native?: string;
  };
  readonly coverImage: {
    readonly extraLarge?: string;
    readonly large?: string;
    readonly medium?: string;
    readonly color?: string;
  };
  readonly format?: string | null;
  readonly status?: string | null;
  readonly averageScore?: number | null;
  readonly popularity?: number | null;
  readonly genres?: readonly string[];
  readonly isAdult?: boolean | null;
  readonly startDate?: {
    readonly year?: number;
    readonly month?: number;
    readonly day?: number;
  };
  readonly nextAiringEpisode?: {
    readonly airingAt: number;
    readonly episode: number;
  } | null;
}

interface AnimeDetailQueryResponse {
  readonly Media?: AnimeDetailNode | null;
}

type AnimeDetailNode = AnimeSummaryNode & {
  readonly bannerImage?: string | null;
  readonly description?: string | null;
  readonly episodes?: number | null;
  readonly duration?: number | null;
  readonly season?: string | null;
  readonly seasonYear?: number | null;
  readonly synonyms?: readonly string[];
  readonly startDate?: {
    readonly year?: number;
    readonly month?: number;
    readonly day?: number;
  };
  readonly endDate?: {
    readonly year?: number;
    readonly month?: number;
    readonly day?: number;
  };
  readonly studios?: {
    readonly nodes?: readonly AnimeStudioNode[];
  };
  readonly tags?: readonly AnimeTagNode[];
  readonly streamingEpisodes?: readonly StreamingEpisodeNode[];
};

interface AnimeStudioNode {
  readonly id: number;
  readonly name: string;
  readonly isAnimationStudio?: boolean | null;
}

interface AnimeTagNode {
  readonly id: number;
  readonly name: string;
  readonly description?: string | null;
  readonly rank?: number | null;
  readonly isAdult?: boolean | null;
}

interface StreamingEpisodeNode {
  readonly title: string;
  readonly url: string;
  readonly thumbnail?: string | null;
}

interface AnimeDetailQueryVariables {
  readonly slug: string;
}
