import type { AnimeDetail } from '../interfaces/anime-detail';
import type { AnimeFuzzyDate } from '../interfaces/anime-fuzzy-date';
import type { AnimeTitle } from '../interfaces/anime-title';

export function resolveSummaryTitle(title: AnimeTitle): string {
  return title.english ?? title.romaji ?? 'Untitled';
}

export function resolveRomajiSubtitle(title: AnimeTitle): string | undefined {
  const romaji = title.romaji?.trim();
  return romaji ? romaji : undefined;
}

export function formatRating(score: number | undefined): string | undefined {
  if (!score || Number.isNaN(score)) {
    return undefined;
  }

  return (score / 10).toFixed(1);
}

export function formatRatingOrDash(score: number | undefined): string {
  return formatRating(score) ?? '-';
}

export function resolveSeasonLabel(date: AnimeFuzzyDate | undefined): string {
  if (!date?.year || !date.month) {
    return 'Season TBD';
  }

  const month = date.month;
  const year = date.year;
  const season =
    month <= 3
      ? 'Winter'
      : month <= 6
        ? 'Spring'
        : month <= 9
          ? 'Summer'
          : month <= 12
            ? 'Fall'
            : 'Winter';

  return `${season} ${year}`;
}

export function formatNumberOrDash(value: number | undefined): string {
  if (!value || Number.isNaN(value)) {
    return '-';
  }
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatYearOrUnknown(value: number | undefined): string {
  return value ? String(value) : 'Unknown';
}

export function formatEpisodesOrUnknown(value: number | undefined): string {
  return value ? String(value) : 'Unknown';
}

export function formatStatusOrUnknown(value: string | undefined): string {
  if (!value) {
    return 'Unknown';
  }

  return value
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

export function formatStudioName(anime: AnimeDetail | undefined): string {
  const studio = anime?.studios?.[0]?.name;
  return studio ? studio : 'Unknown';
}

export function isDuplicateSubtitle(title: string, value: string): boolean {
  return title.length > 0 && title === value.trim().toLowerCase();
}
