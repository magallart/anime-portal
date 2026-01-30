import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it, vi } from 'vitest';
import { of, throwError } from 'rxjs';
import type { AiringEpisode } from '../../interfaces/airing-episode';
import type { AnimeSummary } from '../../interfaces/anime-summary';
import { AnilistService } from '../../services/anilist.service';
import { HomePageComponent } from './home-page.component';

const sampleEpisodes: AiringEpisode[] = [
  {
    animeId: 1,
    animeSlug: 'great-adventure',
    title: 'Great Adventure',
    episodeNumber: 7,
    airingAt: 1_700_000_000,
    airingAtDate: new Date(1_700_000_000 * 1000),
    coverImage: 'cover.jpg',
  },
];
const sampleMostViewed: AnimeSummary[] = [
  {
    id: 99,
    slug: 'top-hit',
    title: { english: 'Top Hit' },
    coverImage: { extraLarge: 'top.jpg' },
    genres: ['Action'],
    popularity: 100,
    averageScore: 85,
  },
];

describe('HomePageComponent', () => {
  const setup = async (
    returnValue = of(sampleEpisodes),
    mostViewedValue = of(sampleMostViewed),
  ) => {
    const getAiringMock = vi.fn().mockReturnValue(returnValue);
    const getMostViewedMock = vi.fn().mockReturnValue(mostViewedValue);

    await TestBed.configureTestingModule({
      imports: [HomePageComponent, RouterTestingModule],
      providers: [
        {
          provide: AnilistService,
          useValue: {
            getAiringThisWeek: getAiringMock,
            getMostViewedAnime: getMostViewedMock,
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();
    return { fixture, getAiringMock, getMostViewedMock };
  };

  it('renders hero content and anime sections', async () => {
    const { fixture, getAiringMock, getMostViewedMock } = await setup();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Discover the World of Anime');
    expect(compiled.textContent).toContain('Most viewed anime');
    expect(compiled.textContent).toContain('Latest releases');
    expect(getAiringMock).toHaveBeenCalled();
    expect(getMostViewedMock).toHaveBeenCalled();
  });

  it('surfaces an error message when airing feed fails', async () => {
    const { fixture } = await setup(throwError(() => new Error('fail')));
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Unable to load the home feed right now.');
  });
});
