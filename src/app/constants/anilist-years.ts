import type { SelectOption } from './select-option';

const currentYear = new Date().getFullYear();
const startYear = 1990;

export const ANILIST_YEAR_OPTIONS: readonly SelectOption<number>[] = Array.from(
  { length: currentYear - startYear + 1 },
  (_, index) => {
    const year = currentYear - index;
    return { value: year, label: String(year) };
  },
);
