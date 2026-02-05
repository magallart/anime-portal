import { describe, expect, it } from 'vitest';
import type { AiringEpisode } from '../interfaces/airing-episode';
import type { AnimeDetail } from '../interfaces/anime-detail';
import type { AnimeSummary } from '../interfaces/anime-summary';
import {
  buildAnimeInfoItems,
  buildAnimeStats,
  mapEpisodeToCard,
  mapSummaryToCard,
} from './anime-view-models';

describe('anime-view-models', () => {
  it('maps airing episodes to cards', () => {
    const episode: AiringEpisode = {
      animeId: 1,
      animeSlug: 'demo',
      title: 'Demo',
      episodeNumber: 4,
      airingAt: 1_700_000_000,
      airingAtDate: new Date(1_700_000_000 * 1000),
      coverImage: 'cover.jpg',
      genres: ['Action', 'Drama'],
      startDate: { year: 2024, month: 1, day: 1 },
      averageScore: 86,
    };

    const card = mapEpisodeToCard(episode, { hideTags: true });
    expect(card.slug).toBe('demo');
    expect(card.badge).toBe('EP 4');
    expect(card.rating).toBe('8.6');
    expect(card.hideTags).toBe(true);
  });

  it('maps summaries to cards and keeps active genre first', () => {
    const anime: AnimeSummary = {
      id: 2,
      slug: 'summary',
      title: { english: 'Summary' },
      coverImage: { large: 'cover.jpg' },
      genres: ['Fantasy', 'Action'],
      averageScore: 90,
    };

    const card = mapSummaryToCard(anime, { activeGenre: 'Action' });
    expect(card.tags?.[0]).toBe('Action');
    expect(card.badge).toBe('9.0');
  });

  it('builds detail stats and info blocks', () => {
    const anime: AnimeDetail = {
      id: 3,
      slug: 'detail',
      title: { english: 'Detail' },
      coverImage: { large: 'cover.jpg' },
      genres: [],
      studios: [{ id: 9, name: 'Studio', isAnimationStudio: true }],
      tags: [],
      seasonYear: 2020,
      episodes: 12,
      status: 'FINISHED',
      averageScore: 82,
      popularity: 50000,
    };

    const stats = buildAnimeStats(anime);
    const info = buildAnimeInfoItems(anime);
    expect(stats[0]?.value).toBe('8.2');
    expect(info.find((item) => item.label === 'Studio')?.value).toBe('Studio');
  });
});
