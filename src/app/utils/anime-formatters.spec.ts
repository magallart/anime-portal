import { describe, expect, it } from 'vitest';
import type { AnimeDetail } from '../interfaces/anime-detail';
import {
  formatEpisodesOrUnknown,
  formatNumberOrDash,
  formatRating,
  formatRatingOrDash,
  formatStatusOrUnknown,
  formatStudioName,
  formatYearOrUnknown,
  isDuplicateSubtitle,
  resolveRomajiSubtitle,
  resolveSeasonLabel,
  resolveSummaryTitle,
} from './anime-formatters';

describe('anime-formatters', () => {
  it('resolves titles and subtitles', () => {
    expect(resolveSummaryTitle({ english: 'English' })).toBe('English');
    expect(resolveSummaryTitle({ romaji: 'Romaji' })).toBe('Romaji');
    expect(resolveSummaryTitle({})).toBe('Untitled');
    expect(resolveRomajiSubtitle({ romaji: '  Romaji  ' })).toBe('Romaji');
    expect(resolveRomajiSubtitle({ english: 'English' })).toBeUndefined();
  });

  it('formats ratings and numbers', () => {
    expect(formatRating(85)).toBe('8.5');
    expect(formatRating(undefined)).toBeUndefined();
    expect(formatRatingOrDash(undefined)).toBe('-');
    expect(formatNumberOrDash(12000)).toBe('12,000');
  });

  it('formats season and metadata defaults', () => {
    expect(resolveSeasonLabel({ year: 2024, month: 1, day: 1 })).toBe('Winter 2024');
    expect(resolveSeasonLabel(undefined)).toBe('Season TBD');
    expect(formatYearOrUnknown(undefined)).toBe('Unknown');
    expect(formatEpisodesOrUnknown(undefined)).toBe('Unknown');
    expect(formatStatusOrUnknown(undefined)).toBe('Unknown');
    expect(formatStatusOrUnknown('NOT_YET_RELEASED')).toBe('Not Yet Released');
  });

  it('formats studio name and subtitle duplication', () => {
    const anime: AnimeDetail = {
      id: 1,
      slug: 'demo',
      title: { english: 'Demo' },
      coverImage: { large: 'cover.jpg' },
      genres: [],
      studios: [{ id: 2, name: 'Studio', isAnimationStudio: true }],
      tags: [],
    };
    expect(formatStudioName(anime)).toBe('Studio');
    expect(isDuplicateSubtitle('demo', ' Demo ')).toBe(true);
  });
});
