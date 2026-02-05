import { describe, expect, it } from 'vitest';
import { mapAiringEpisode, mapAnimeDetail, mapAnimeSummary } from './anilist-mappers';

describe('anilist-mappers', () => {
  it('maps airing nodes into episodes', () => {
    const episode = mapAiringEpisode({
      airingAt: 1_700_000_000,
      episode: 3,
      media: {
        id: 10,
        siteUrl: 'https://anilist.co/anime/10/demo',
        title: { english: 'Demo' },
        coverImage: { large: 'cover.jpg' },
        genres: ['Action'],
        isAdult: false,
        startDate: { year: 2024, month: 1, day: 1 },
        averageScore: 80,
      },
    });

    expect(episode.animeSlug).toBe('demo');
    expect(episode.episodeNumber).toBe(3);
  });

  it('maps summaries and details', () => {
    const summary = mapAnimeSummary({
      id: 2,
      siteUrl: 'https://anilist.co/anime/2/summary',
      title: { english: 'Summary' },
      coverImage: { large: 'cover.jpg' },
      format: 'TV',
      status: 'RELEASING',
      averageScore: 85,
      popularity: 1000,
      genres: ['Action'],
      isAdult: false,
      nextAiringEpisode: { airingAt: 1_700_000_000, episode: 1 },
    });

    expect(summary.slug).toBe('summary');
    expect(summary.format).toBe('TV');

    const detail = mapAnimeDetail({
      id: 2,
      siteUrl: 'https://anilist.co/anime/2/summary',
      title: { english: 'Summary' },
      coverImage: { large: 'cover.jpg' },
      format: 'TV',
      status: 'RELEASING',
      averageScore: 85,
      popularity: 1000,
      genres: ['Action'],
      isAdult: false,
      nextAiringEpisode: { airingAt: 1_700_000_000, episode: 1 },
      bannerImage: 'banner.jpg',
      description: 'Description',
      episodes: 12,
      duration: 24,
      season: 'FALL',
      seasonYear: 2024,
      synonyms: [],
      startDate: { year: 2024, month: 10, day: 1 },
      endDate: { year: 2025, month: 3, day: 1 },
      studios: { nodes: [{ id: 1, name: 'Studio', isAnimationStudio: true }] },
      tags: [{ id: 1, name: 'Tag', description: null, rank: 80, isAdult: false }],
      streamingEpisodes: [],
    });

    expect(detail.bannerImage).toBe('banner.jpg');
    expect(detail.studios[0]?.name).toBe('Studio');
  });
});
