import { TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { firstValueFrom, of } from 'rxjs';
import { AnilistService } from './anilist.service';
import { GraphqlClientService } from './graphql-client.service';

describe('AnilistService', () => {
  let service: AnilistService;
  let executeSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    executeSpy = vi.fn();
    TestBed.configureTestingModule({
      providers: [
        AnilistService,
        {
          provide: GraphqlClientService,
          useValue: { execute: executeSpy },
        },
      ],
    });

    service = TestBed.inject(AnilistService);
  });

  it('maps airing schedule results into domain models', async () => {
    executeSpy.mockReturnValue(
      of({
        Page: {
          airingSchedules: [
            {
              airingAt: 1_700_000_000,
              episode: 5,
              media: {
                id: 123,
                siteUrl: 'https://anilist.co/anime/123/sample-show/',
                title: { english: 'Sample Show', romaji: 'Sample' },
                coverImage: { large: 'large.jpg', medium: 'med.jpg', extraLarge: 'xl.jpg' },
                genres: ['Action'],
              },
            },
          ],
        },
      }),
    );

    const window = { start: new Date(0), end: new Date(0) };
    const result = await firstValueFrom(service.getAiringScheduleThisWeek(window));

    expect(executeSpy).toHaveBeenCalledWith(expect.stringContaining('airingSchedules'), {
      start: 0,
      end: 0,
    });
    expect(result).toEqual([
      expect.objectContaining({
        animeId: 123,
        animeSlug: 'sample-show',
        title: 'Sample Show',
        episodeNumber: 5,
      }),
    ]);
  });

  it('passes GenreFilter options to the search query and maps summaries', async () => {
    executeSpy.mockReturnValue(
      of({
        Page: {
          media: [
            {
              id: 999,
              siteUrl: 'https://anilist.co/anime/999/cool-show/',
              title: { romaji: 'Cool Show' },
              coverImage: { large: 'cover.png' },
              genres: ['Drama'],
            },
          ],
        },
      }),
    );

    const filters = {
      genres: ['Drama'],
      page: 2,
      perPage: 5,
      sort: 'SCORE_DESC',
    } as const;

    const result = await firstValueFrom(service.getAnimeByFilters(filters));

    expect(executeSpy).toHaveBeenCalledWith(expect.stringContaining('SearchAnime'), {
      page: 2,
      perPage: 5,
      search: undefined,
      genre_in: ['Drama'],
      season: undefined,
      seasonYear: undefined,
      status: undefined,
      format: undefined,
      sort: 'SCORE_DESC',
    });
    expect(result[0]).toMatchObject({ id: 999, slug: 'cool-show', genres: ['Drama'] });
  });

  it('sanitizes descriptions for anime detail lookups', async () => {
    executeSpy.mockReturnValue(
      of({
        Media: {
          id: 456,
          siteUrl: 'https://anilist.co/anime/456/detail-anime/',
          title: { english: 'Detail' },
          coverImage: { large: 'cover.jpg' },
          description: '<p>Strong <em>story</em></p>',
          studios: { nodes: [{ id: 1, name: 'Studio A', isAnimationStudio: true }] },
          tags: [{ id: 10, name: 'Mystery' }],
        },
      }),
    );

    const result = await firstValueFrom(service.getAnimeDetailsBySlug('detail-anime'));

    expect(executeSpy).toHaveBeenCalledWith(expect.stringContaining('AnimeDetail'), {
      slug: 'detail anime',
    });
    expect(result.description).toBe('Strong story');
    expect(result.studios[0]).toEqual({
      id: 1,
      name: 'Studio A',
      isAnimationStudio: true,
    });
  });
});
