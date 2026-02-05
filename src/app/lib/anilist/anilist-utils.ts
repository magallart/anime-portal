import type { AiringWindow } from '../../interfaces/airing-window';
import { ANIME_FORMAT, type AnimeFormat } from '../../interfaces/anime-format';
import { ANIME_STATUS, type AnimeStatus } from '../../interfaces/anime-status';
import type { AnimeTitle } from '../../interfaces/anime-title';

const ANIME_FORMAT_VALUES: readonly AnimeFormat[] = Object.values(ANIME_FORMAT);
const ANIME_STATUS_VALUES: readonly AnimeStatus[] = Object.values(ANIME_STATUS);

export function castToAnimeFormat(value?: string | null): AnimeFormat | undefined {
  if (!value) {
    return undefined;
  }

  return ANIME_FORMAT_VALUES.includes(value as AnimeFormat) ? (value as AnimeFormat) : undefined;
}

export function castToAnimeStatus(value?: string | null): AnimeStatus | undefined {
  if (!value) {
    return undefined;
  }

  return ANIME_STATUS_VALUES.includes(value as AnimeStatus) ? (value as AnimeStatus) : undefined;
}

export function sanitizeDescription(value?: string | null): string | undefined {
  if (!value) {
    return undefined;
  }

  const withLineBreaks = value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<p[^>]*>/gi, '');

  return withLineBreaks
    .replace(/<[^>]+>/g, '')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function resolveSlug(media: {
  id: number;
  siteUrl?: string | null;
  title?: AnimeTitle;
}): string {
  const slugFromUrl = parseSlugFromSiteUrl(media.siteUrl);
  if (slugFromUrl) {
    return slugFromUrl;
  }
  const base = media.title?.romaji ?? String(media.id);
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function parseSlugFromSiteUrl(siteUrl?: string | null): string | undefined {
  if (!siteUrl) {
    return undefined;
  }
  const match = siteUrl.match(/anime\/\d+\/([^/?#]+)/i);
  return match?.[1]?.toLowerCase();
}

export function toSearchTerm(slug: string): string {
  return slug.replace(/-/g, ' ').trim();
}

export function resolveTitle(title: AnimeTitle | undefined): string {
  return title?.english ?? title?.romaji ?? 'Untitled';
}

export function getCurrentWeekWindow(): AiringWindow {
  const start = new Date();
  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  return { start, end };
}
