export const BUTTON_VARIANT = {
  PRIMARY: 'primary',
  OUTLINE: 'outline',
  GHOST: 'ghost',
  GHOST_ACTIVE: 'ghost-active',
} as const;

export type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];
