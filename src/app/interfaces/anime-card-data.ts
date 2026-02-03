import type { AnimeCardBadgeIcon } from '../constants/anime-card-badge';

export interface AnimeCardData {
  readonly id: number;
  readonly slug: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly imageUrl?: string;
  readonly badge?: string;
  readonly badgeIcon?: AnimeCardBadgeIcon;
  readonly season?: string;
  readonly rating?: string;
  readonly year?: number;
  readonly tags?: readonly string[];
  readonly compactTags?: boolean;
  readonly hideTags?: boolean;
}
