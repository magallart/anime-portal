export const ANIME_STATUS = {
  FINISHED: 'FINISHED',
  RELEASING: 'RELEASING',
  NOT_YET_RELEASED: 'NOT_YET_RELEASED',
  CANCELLED: 'CANCELLED',
  HIATUS: 'HIATUS',
} as const;

export type AnimeStatus = (typeof ANIME_STATUS)[keyof typeof ANIME_STATUS];
