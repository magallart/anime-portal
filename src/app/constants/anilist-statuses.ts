import type { AnimeStatus } from '../interfaces/anime-status';
import type { SelectOption } from './select-option';

export const ANILIST_STATUS_OPTIONS: readonly SelectOption<AnimeStatus>[] = [
  { value: 'RELEASING', label: 'Airing' },
  { value: 'FINISHED', label: 'Finished' },
  { value: 'NOT_YET_RELEASED', label: 'Not Yet Released' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'HIATUS', label: 'Hiatus' },
];
