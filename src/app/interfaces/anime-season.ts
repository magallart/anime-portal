export const ANIME_SEASON = {
  WINTER: 'WINTER',
  SPRING: 'SPRING',
  SUMMER: 'SUMMER',
  FALL: 'FALL',
} as const;

export type AnimeSeason = (typeof ANIME_SEASON)[keyof typeof ANIME_SEASON];
