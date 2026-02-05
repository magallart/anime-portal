import type { AiringEpisode } from '../../interfaces/airing-episode';
import type { AnimeDetail } from '../../interfaces/anime-detail';
import type { AnimeStudio } from '../../interfaces/anime-studio';
import type { AnimeSummary } from '../../interfaces/anime-summary';
import type { AnimeTag } from '../../interfaces/anime-tag';
import type { StreamingEpisode } from '../../interfaces/streaming-episode';
import type {
  AnimeDetailNode,
  AnimeStudioNode,
  AnimeSummaryNode,
  AnimeTagNode,
  LatestAiringNode,
  StreamingEpisodeNode,
} from '../../interfaces/anilist-graphql';
import {
  castToAnimeFormat,
  castToAnimeStatus,
  resolveSlug,
  resolveTitle,
  sanitizeDescription,
} from './anilist-utils';

export function mapAiringEpisode(node: LatestAiringNode): AiringEpisode {
  return {
    animeId: node.media.id,
    animeSlug: resolveSlug(node.media),
    title: resolveTitle(node.media.title),
    titleNative: node.media.title?.native ?? undefined,
    titleRomaji: node.media.title?.romaji ?? undefined,
    episodeNumber: node.episode,
    airingAt: node.airingAt,
    airingAtDate: new Date(node.airingAt * 1000),
    coverImage:
      node.media.coverImage?.extraLarge ??
      node.media.coverImage?.large ??
      node.media.coverImage?.medium ??
      undefined,
    genres: node.media.genres ?? [],
    startDate: node.media.startDate ?? undefined,
    averageScore: node.media.averageScore ?? undefined,
  };
}

export function mapAnimeSummary(media: AnimeSummaryNode): AnimeSummary {
  return {
    id: media.id,
    slug: resolveSlug(media),
    title: media.title,
    coverImage: media.coverImage,
    format: castToAnimeFormat(media.format),
    status: castToAnimeStatus(media.status),
    averageScore: media.averageScore ?? undefined,
    popularity: media.popularity ?? undefined,
    genres: media.genres ?? [],
    nextAiringEpisode: media.nextAiringEpisode
      ? mapAiringEpisode({
          airingAt: media.nextAiringEpisode.airingAt,
          episode: media.nextAiringEpisode.episode,
          media,
        })
      : undefined,
  };
}

export function mapAnimeDetail(media: AnimeDetailNode): AnimeDetail {
  const summary = mapAnimeSummary(media);
  return {
    ...summary,
    description: sanitizeDescription(media.description),
    bannerImage: media.bannerImage ?? undefined,
    episodes: media.episodes ?? undefined,
    duration: media.duration ?? undefined,
    season: media.season ?? undefined,
    seasonYear: media.seasonYear ?? undefined,
    synonyms: media.synonyms ?? [],
    startDate: media.startDate ?? undefined,
    endDate: media.endDate ?? undefined,
    studios: media.studios?.nodes?.map(mapStudio) ?? [],
    tags: media.tags?.map(mapTag) ?? [],
    streamingEpisodes: media.streamingEpisodes?.map(mapStreamingEpisode) ?? [],
  };
}

function mapStudio(studio: AnimeStudioNode): AnimeStudio {
  return {
    id: studio.id,
    name: studio.name,
    isAnimationStudio: studio.isAnimationStudio ?? false,
  };
}

function mapTag(tag: AnimeTagNode): AnimeTag {
  return {
    id: tag.id,
    name: tag.name,
    description: tag.description ?? undefined,
    rank: tag.rank ?? undefined,
    isAdult: tag.isAdult ?? undefined,
  };
}

function mapStreamingEpisode(node: StreamingEpisodeNode): StreamingEpisode {
  return {
    title: node.title,
    url: node.url,
    thumbnail: node.thumbnail ?? undefined,
  };
}
