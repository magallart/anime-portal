import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { routes } from './app.routes';
import { HomePageComponent } from './pages/home/home-page.component';
import { GenresPageComponent } from './pages/genres/genres-page.component';
import { AnimeDetailPageComponent } from './pages/anime-detail/anime-detail-page.component';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';

describe('App Routes', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
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

  it('navigates to the Anime Detail page using a valid slug', async () => {
    const component = await harness.navigateByUrl(
      '/anime/placeholder-anime',
      AnimeDetailPageComponent,
    );
    expect(component).toBeInstanceOf(AnimeDetailPageComponent);
  });

  it('redirects to not found when slug is invalid', async () => {
    const component = await harness.navigateByUrl('/anime/not-real', NotFoundPageComponent);
    expect(component).toBeInstanceOf(NotFoundPageComponent);
  });

  it('redirects to not found for unknown paths', async () => {
    const component = await harness.navigateByUrl('/totally-missing', NotFoundPageComponent);
    expect(component).toBeInstanceOf(NotFoundPageComponent);
  });
});
