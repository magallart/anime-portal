import type { SelectOption } from './select-option';

export const ANILIST_RATING_OPTIONS: readonly SelectOption<string>[] = [
  { value: 'lt-5', label: 'Less than 5' },
  { value: '5-7', label: '5-7' },
  { value: 'gt-8', label: 'More than 8' },
];
