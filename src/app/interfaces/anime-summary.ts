import type { AiringEpisode } from './airing-episode';
import type { AnimeCoverImage } from './anime-cover-image';
import type { AnimeFormat } from './anime-format';
import type { AnimeStatus } from './anime-status';
import type { AnimeTitle } from './anime-title';

export interface AnimeSummary {
  readonly id: number;
  readonly slug: string;
  readonly title: AnimeTitle;
  readonly coverImage: AnimeCoverImage;
  readonly format?: AnimeFormat;
  readonly status?: AnimeStatus;
  readonly averageScore?: number;
  readonly popularity?: number;
  readonly genres: readonly string[];
  readonly nextAiringEpisode?: AiringEpisode;
}
