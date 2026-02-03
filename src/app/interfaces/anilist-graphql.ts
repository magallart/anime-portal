export interface LatestAiringQueryResponse {
  readonly Page: {
    readonly latestAiring: readonly LatestAiringNode[];
  };
}

export interface LatestAiringNode {
  readonly airingAt: number;
  readonly episode: number;
  readonly media: AnimeSummaryNode;
}

export interface SearchQueryResponse {
  readonly Page: {
    readonly pageInfo: SearchQueryPageInfo;
    readonly media: readonly AnimeSummaryNode[];
  };
}

export interface SearchQueryVariables {
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

export interface SearchQueryPageInfo {
  readonly total: number;
  readonly perPage: number;
  readonly currentPage: number;
  readonly lastPage: number;
  readonly hasNextPage: boolean;
}

export interface AnimeSummaryNode {
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

export interface AnimeDetailQueryResponse {
  readonly Media?: AnimeDetailNode | null;
}

export interface AnimeDetailNode extends AnimeSummaryNode {
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
}

export interface AnimeStudioNode {
  readonly id: number;
  readonly name: string;
  readonly isAnimationStudio?: boolean | null;
}

export interface AnimeTagNode {
  readonly id: number;
  readonly name: string;
  readonly description?: string | null;
  readonly rank?: number | null;
  readonly isAdult?: boolean | null;
}

export interface StreamingEpisodeNode {
  readonly title: string;
  readonly url: string;
  readonly thumbnail?: string | null;
}

export interface AnimeDetailQueryVariables {
  readonly slug: string;
}
