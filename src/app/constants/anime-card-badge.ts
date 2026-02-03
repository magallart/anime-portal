export const ANIME_CARD_BADGE_ICON = {
  STAR: 'star',
} as const;

export type AnimeCardBadgeIcon = (typeof ANIME_CARD_BADGE_ICON)[keyof typeof ANIME_CARD_BADGE_ICON];
