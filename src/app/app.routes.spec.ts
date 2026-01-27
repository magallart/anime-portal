import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { routes } from './app.routes';
import { HomePageComponent } from './pages/home/home-page.component';
import { GenresPageComponent } from './pages/genres/genres-page.component';
import { AnimeDetailPageComponent } from './pages/anime-detail/anime-detail-page.component';

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

  it('navigates to the Anime Detail page using a slug', async () => {
    const component = await harness.navigateByUrl(
      '/anime/the-anime-name',
      AnimeDetailPageComponent,
    );
    expect(component).toBeInstanceOf(AnimeDetailPageComponent);
  });
});
