import { TestBed } from '@angular/core/testing';
import type { ActivatedRouteSnapshot, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { firstValueFrom, isObservable, of, throwError } from 'rxjs';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { animeDetailResolver } from './anime-detail.resolver';
import { APP_ROUTES } from '../../constants/routes';
import { AnilistService } from '../../services/anilist.service';
import type { AnimeDetail } from '../../interfaces/anime-detail';

describe('animeDetailResolver', () => {
  let route: ActivatedRouteSnapshot;
  let router: { navigate: ReturnType<typeof vi.fn> };
  let anilistService: { getAnimeDetailsBySlug: ReturnType<typeof vi.fn> };

  const createParamMap = (slug: string | null): ParamMap => ({
    get: vi.fn().mockReturnValue(slug),
    getAll: vi.fn().mockReturnValue(slug ? [slug] : []),
    has: vi.fn().mockReturnValue(slug !== null),
    keys: slug ? ['slug'] : [],
  });

  const createRouteSnapshot = (slug: string | null): ActivatedRouteSnapshot =>
    ({
      paramMap: createParamMap(slug),
    }) as ActivatedRouteSnapshot;

  beforeEach(() => {
    route = createRouteSnapshot('placeholder-anime');

    router = { navigate: vi.fn() };
    anilistService = { getAnimeDetailsBySlug: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: AnilistService, useValue: anilistService },
      ],
    });
  });

  it('resolves anime detail for valid slug', async () => {
    const animeDetail: AnimeDetail = {
      id: 1,
      slug: 'placeholder-anime',
      title: { english: 'Placeholder' },
      coverImage: { large: 'https://example.com/cover.jpg' },
      genres: ['Action'],
      studios: [],
      tags: [],
    };

    anilistService.getAnimeDetailsBySlug.mockReturnValue(of(animeDetail));

    const result = TestBed.runInInjectionContext(() => animeDetailResolver(route, {} as never));

    const result$ = isObservable(result) ? result : of(result);
    const value = await firstValueFrom(result$);
    expect(value).toEqual(animeDetail);
    expect(anilistService.getAnimeDetailsBySlug).toHaveBeenCalledWith('placeholder-anime');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('redirects to 404 when slug is missing', async () => {
    route = createRouteSnapshot(null);

    const result = TestBed.runInInjectionContext(() => animeDetailResolver(route, {} as never));

    const result$ = isObservable(result) ? result : of(result);
    const value = await firstValueFrom(result$, { defaultValue: undefined });
    expect(value).toBeUndefined();
    expect(router.navigate).toHaveBeenCalledWith([APP_ROUTES.notFound]);
    expect(anilistService.getAnimeDetailsBySlug).not.toHaveBeenCalled();
  });

  it('redirects to 404 when service errors', async () => {
    const error = new Error('network');
    anilistService.getAnimeDetailsBySlug.mockReturnValue(throwError(() => error));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const result = TestBed.runInInjectionContext(() => animeDetailResolver(route, {} as never));

    const result$ = isObservable(result) ? result : of(result);
    const value = await firstValueFrom(result$, { defaultValue: undefined });
    expect(value).toBeUndefined();
    expect(router.navigate).toHaveBeenCalledWith([APP_ROUTES.notFound]);
    expect(consoleSpy).toHaveBeenCalledWith('Anime detail resolver failed.', error);
    consoleSpy.mockRestore();
  });
});
