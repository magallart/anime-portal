import { test, expect } from '@playwright/test';

const mockSlug = 'mock-anime';

const mockCover = {
  extraLarge: 'https://example.com/cover-xl.jpg',
  large: 'https://example.com/cover-lg.jpg',
  medium: 'https://example.com/cover-md.jpg',
  color: null,
};

const mockMedia = {
  id: 101,
  siteUrl: `https://anilist.co/anime/101/${mockSlug}`,
  title: {
    english: 'Mock Anime',
    romaji: 'Mock Anime',
    native: 'モックアニメ',
  },
  coverImage: mockCover,
  format: 'TV',
  status: 'RELEASING',
  averageScore: 84,
  popularity: 120000,
  genres: ['Action', 'Adventure'],
  isAdult: false,
};

test('smoke navigation home -> genres -> detail -> back', async ({ page }) => {
  await page.route('**/graphql.anilist.co', async (route) => {
    const body = route.request().postDataJSON() as { query?: string } | null;
    const query = body?.query ?? '';

    if (query.includes('LatestAiring')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            Page: {
              latestAiring: [
                {
                  airingAt: 1_700_000_100,
                  episode: 5,
                  media: {
                    ...mockMedia,
                    startDate: { year: 2024, month: 10, day: 1 },
                  },
                },
              ],
            },
          },
        }),
      });
      return;
    }

    if (query.includes('SearchAnime')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            Page: {
              pageInfo: {
                total: 1,
                perPage: 20,
                currentPage: 1,
                lastPage: 1,
                hasNextPage: false,
              },
              media: [
                {
                  ...mockMedia,
                  nextAiringEpisode: { airingAt: 1_700_000_100, episode: 5 },
                },
              ],
            },
          },
        }),
      });
      return;
    }

    if (query.includes('AnimeDetail')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            Media: {
              ...mockMedia,
              bannerImage: 'https://example.com/banner.jpg',
              description: 'A mock description for the anime detail page.',
              episodes: 12,
              duration: 24,
              season: 'FALL',
              seasonYear: 2024,
              synonyms: ['Mock Show'],
              startDate: { year: 2024, month: 10, day: 1 },
              endDate: { year: 2025, month: 3, day: 1 },
              studios: {
                nodes: [
                  {
                    id: 1,
                    name: 'Mock Studio',
                    isAnimationStudio: true,
                  },
                ],
              },
              tags: [
                {
                  id: 201,
                  name: 'Shonen',
                  description: null,
                  rank: 80,
                  isAdult: false,
                },
              ],
              streamingEpisodes: [],
            },
          },
        }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: {} }),
    });
  });

  await page.goto('/');
  await expect(page.getByRole('heading', { name: /discover the world of anime/i })).toBeVisible();

  await page.locator('[data-test="nav-genres"]').click();
  await expect(page).toHaveURL(/\/genres/);
  await expect(page.locator('app-anime-card')).toHaveCount(1);

  await page.locator('app-anime-card a').first().click();
  await expect(page).toHaveURL(new RegExp(`/anime/${mockSlug}`));
  await expect(page.getByRole('heading', { name: 'Mock Anime' })).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/genres/);

  await page.locator('[data-test="nav-home"]').click();
  await expect(page).toHaveURL('/');
});
