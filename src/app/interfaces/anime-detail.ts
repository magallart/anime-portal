import type { AnimeFuzzyDate } from './anime-fuzzy-date';
import type { AnimeStudio } from './anime-studio';
import type { AnimeSummary } from './anime-summary';
import type { AnimeTag } from './anime-tag';
import type { StreamingEpisode } from './streaming-episode';

export interface AnimeDetail extends AnimeSummary {
  readonly description?: string;
  readonly bannerImage?: string;
  readonly episodes?: number;
  readonly duration?: number;
  readonly season?: string;
  readonly seasonYear?: number;
  readonly synonyms?: readonly string[];
  readonly startDate?: AnimeFuzzyDate;
  readonly endDate?: AnimeFuzzyDate;
  readonly studios: readonly AnimeStudio[];
  readonly tags: readonly AnimeTag[];
  readonly streamingEpisodes?: readonly StreamingEpisode[];
}
