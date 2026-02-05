import { describe, expect, it } from 'vitest';
import {
  getCurrentWeekWindow,
  parseSlugFromSiteUrl,
  resolveSlug,
  resolveTitle,
  sanitizeDescription,
  toSearchTerm,
} from './anilist-utils';

describe('anilist-utils', () => {
  it('parses slugs and search terms', () => {
    expect(parseSlugFromSiteUrl('https://anilist.co/anime/1/demo-title')).toBe('demo-title');
    expect(resolveSlug({ id: 1, siteUrl: 'https://anilist.co/anime/1/demo-title' })).toBe(
      'demo-title',
    );
    expect(resolveSlug({ id: 7, title: { romaji: 'Demo Title' } })).toBe('demo-title');
    expect(toSearchTerm('demo-title')).toBe('demo title');
  });

  it('sanitizes descriptions and resolves titles', () => {
    expect(sanitizeDescription('<b>Demo</b>\n\nLine')).toBe('Demo Line');
    expect(resolveTitle({ english: 'English' })).toBe('English');
  });

  it('returns a valid airing window', () => {
    const window = getCurrentWeekWindow();
    expect(window.end.getTime()).toBeGreaterThan(window.start.getTime());
  });
});
