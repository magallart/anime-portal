export const FILTER_ALL = 'all' as const;

export type FilterSelection = typeof FILTER_ALL | number | string;
