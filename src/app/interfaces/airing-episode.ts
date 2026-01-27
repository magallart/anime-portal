export interface AiringEpisode {
  readonly animeId: number;
  readonly animeSlug: string;
  readonly title: string;
  readonly titleNative?: string;
  readonly titleRomaji?: string;
  readonly episodeNumber: number;
  readonly airingAt: number;
  readonly airingAtDate: Date;
  readonly coverImage?: string;
}
