import { ANIME_CARD_BADGE_ICON } from '../constants/anime-card-badge';
import type { AiringEpisode } from '../interfaces/airing-episode';
import type { AnimeCardData } from '../interfaces/anime-card-data';
import type { AnimeDetail } from '../interfaces/anime-detail';
import type { AnimeInfoItem } from '../interfaces/anime-info-item';
import type { AnimeStat } from '../interfaces/anime-stat';
import type { AnimeSummary } from '../interfaces/anime-summary';
import {
  formatEpisodesOrUnknown,
  formatNumberOrDash,
  formatRating,
  formatRatingOrDash,
  formatStatusOrUnknown,
  formatStudioName,
  formatYearOrUnknown,
  resolveRomajiSubtitle,
  resolveSeasonLabel,
  resolveSummaryTitle,
} from '../utils/anime-formatters';

export interface EpisodeCardOptions {
  readonly compactTags?: boolean;
  readonly hideTags?: boolean;
}

export interface SummaryCardOptions {
  readonly activeGenre?: string;
  readonly compactTags?: boolean;
  readonly hideTags?: boolean;
}

export function mapEpisodeToCard(
  episode: AiringEpisode,
  options: EpisodeCardOptions = {},
): AnimeCardData {
  const seasonLabel = resolveSeasonLabel(episode.startDate);
  const rating = formatRating(episode.averageScore);
  return {
    id: episode.animeId,
    slug: episode.animeSlug,
    title: episode.title,
    imageUrl: episode.coverImage,
    badge: `EP ${episode.episodeNumber}`,
    season: seasonLabel,
    rating,
    tags: episode.genres?.slice(0, 2) ?? [],
    compactTags: options.compactTags,
    hideTags: options.hideTags,
  };
}

export function mapSummaryToCard(
  anime: AnimeSummary,
  options: SummaryCardOptions = {},
): AnimeCardData {
  const title = resolveSummaryTitle(anime.title);
  const subtitle = resolveRomajiSubtitle(anime.title);
  const rating = formatRating(anime.averageScore);
  const tags = resolveCardTags(anime.genres ?? [], options.activeGenre);
  return {
    id: anime.id,
    slug: anime.slug,
    title,
    subtitle,
    imageUrl: anime.coverImage?.extraLarge ?? anime.coverImage?.large ?? anime.coverImage?.medium,
    badge: rating,
    badgeIcon: rating ? ANIME_CARD_BADGE_ICON.STAR : undefined,
    tags,
    compactTags: options.compactTags,
    hideTags: options.hideTags,
  };
}

export function buildAnimeStats(anime: AnimeDetail | undefined): AnimeStat[] {
  return [
    { value: formatRatingOrDash(anime?.averageScore), icon: 'star' },
    { value: formatNumberOrDash(anime?.popularity), icon: 'eye' },
  ];
}

export function buildAnimeInfoItems(anime: AnimeDetail | undefined): AnimeInfoItem[] {
  return [
    { label: 'Year', value: formatYearOrUnknown(anime?.seasonYear), icon: 'calendar' },
    { label: 'Episodes', value: formatEpisodesOrUnknown(anime?.episodes), icon: 'episodes' },
    { label: 'Status', value: formatStatusOrUnknown(anime?.status), icon: 'status' },
    { label: 'Studio', value: formatStudioName(anime), icon: 'studio' },
  ];
}

function resolveCardTags(genres: readonly string[], activeGenre?: string): readonly string[] {
  if (!genres.length) {
    return [];
  }

  const normalizedActive = activeGenre?.toLowerCase();
  const hasActive = normalizedActive
    ? genres.some((genre) => genre.toLowerCase() === normalizedActive)
    : false;

  if (!activeGenre || !hasActive) {
    return genres.slice(0, 2);
  }

  const remaining = genres.filter((genre) => genre.toLowerCase() !== normalizedActive);
  return [activeGenre, ...remaining].slice(0, 2);
}
