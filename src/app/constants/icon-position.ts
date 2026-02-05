export const ICON_POSITION = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type IconPosition = (typeof ICON_POSITION)[keyof typeof ICON_POSITION];
