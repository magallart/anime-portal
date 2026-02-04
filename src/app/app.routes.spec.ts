import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { of } from 'rxjs';
import { routes } from './app.routes';
import { HomePageComponent } from './pages/home/home-page.component';
import { GenresPageComponent } from './pages/genres/genres-page.component';
import { AnimePageComponent } from './pages/anime/anime-page.component';
import { AnimeDetailPageComponent } from './pages/anime-detail/anime-detail-page.component';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';
import { AnilistService } from './services/anilist.service';
import type { AnimeDetail } from './interfaces/anime-detail';

describe('App Routes', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    const animeDetail: AnimeDetail = {
      id: 1,
      slug: 'placeholder-anime',
      title: { english: 'Placeholder' },
      coverImage: { large: 'https://example.com/cover.jpg' },
      genres: ['Action'],
      studios: [],
      tags: [],
    };

    const emptySearchPage = {
      items: [],
      pageInfo: {
        total: 0,
        perPage: 20,
        currentPage: 1,
        lastPage: 1,
        hasNextPage: false,
      },
    };

    await TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        {
          provide: AnilistService,
          useValue: {
            getAiringThisWeek: vi.fn().mockReturnValue(of([])),
            getHighestRatedAnime: vi.fn().mockReturnValue(of([])),
            getAnimeByFilters: vi.fn().mockReturnValue(of(emptySearchPage)),
            getAnimeDetailsBySlug: vi.fn().mockReturnValue(of(animeDetail)),
          },
        },
      ],
    }).compileComponents();

    harness = await RouterTestingHarness.create();
  });

  it('navigates to the Home page', async () => {
    const component = await harness.navigateByUrl('/', HomePageComponent);
    expect(component).toBeInstanceOf(HomePageComponent);
  });

  it('navigates to the Genres page', async () => {
    const component = await harness.navigateByUrl('/genres', GenresPageComponent);
    expect(component).toBeInstanceOf(GenresPageComponent);
  });

  it('navigates to the Anime placeholder page', async () => {
    const component = await harness.navigateByUrl('/anime', AnimePageComponent);
    expect(component).toBeInstanceOf(AnimePageComponent);
  });

  it('navigates to the Anime Detail page using a valid slug', async () => {
    const component = await harness.navigateByUrl(
      '/anime/placeholder-anime',
      AnimeDetailPageComponent,
    );
    expect(component).toBeInstanceOf(AnimeDetailPageComponent);
  });

  it('redirects to not found when slug is invalid', async () => {
    const component = await harness.navigateByUrl('/anime/invalid_slug', NotFoundPageComponent);
    expect(component).toBeInstanceOf(NotFoundPageComponent);
  });

  it('redirects to not found for unknown paths', async () => {
    const component = await harness.navigateByUrl('/totally-missing', NotFoundPageComponent);
    expect(component).toBeInstanceOf(NotFoundPageComponent);
  });
});
