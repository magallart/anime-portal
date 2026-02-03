import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it, vi } from 'vitest';
import { NEVER, of, throwError } from 'rxjs';
import {
  FILTER_ALL,
  GenreFiltersComponent,
} from '../../components/genre-filters/genre-filters.component';
import type { AnimeSearchPageInfo } from '../../interfaces/anime-search-page';
import type { AnimeSummary } from '../../interfaces/anime-summary';
import { AnilistService } from '../../services/anilist.service';
import { GenresPageComponent } from './genres-page.component';

describe('GenresPageComponent', () => {
  const buildSampleAnime = (count: number): AnimeSummary[] =>
    Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      slug: `anime-${index + 1}`,
      title: { english: `Anime ${index + 1}` },
      coverImage: { extraLarge: `cover-${index + 1}.jpg` },
      format: 'TV',
      status: 'RELEASING',
      averageScore: 80,
      popularity: 1000,
      genres: ['Action'],
    }));

  const buildSearchPage = (
    items: AnimeSummary[],
    overrides: Partial<AnimeSearchPageInfo> = {},
  ) => ({
    items,
    pageInfo: {
      total: items.length,
      perPage: 20,
      currentPage: 1,
      lastPage: 1,
      hasNextPage: false,
      ...overrides,
    },
  });

  it('renders the genre filters surface and random anime grid', async () => {
    const getAnimeByFilters = vi.fn().mockReturnValue(of(buildSearchPage(buildSampleAnime(20))));
    await TestBed.configureTestingModule({
      imports: [GenresPageComponent, RouterTestingModule],
      providers: [
        {
          provide: AnilistService,
          useValue: { getAnimeByFilters },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenresPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.genre-filters')).toBeTruthy();
    expect(compiled.textContent).toContain('Clear filters');
    expect(compiled.querySelectorAll('app-anime-card').length).toBe(20);
    expect(getAnimeByFilters).toHaveBeenCalledWith({
      genres: [],
      year: undefined,
      status: undefined,
      page: 1,
      perPage: 20,
      sort: 'POPULARITY_DESC',
    });
  });

  it('requests the next page when clicking next', async () => {
    const getAnimeByFilters = vi
      .fn()
      .mockReturnValueOnce(
        of(
          buildSearchPage(buildSampleAnime(20), {
            total: 40,
            lastPage: 2,
            hasNextPage: true,
          }),
        ),
      )
      .mockReturnValueOnce(
        of(
          buildSearchPage(buildSampleAnime(20), {
            currentPage: 2,
            total: 40,
            lastPage: 2,
            hasNextPage: false,
          }),
        ),
      );

    await TestBed.configureTestingModule({
      imports: [GenresPageComponent, RouterTestingModule],
      providers: [
        {
          provide: AnilistService,
          useValue: { getAnimeByFilters },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenresPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    let compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-anime-card').length).toBe(20);

    const nextButton = Array.from(compiled.querySelectorAll('button')).find((button) =>
      button.textContent?.includes('Next'),
    );
    expect(nextButton).toBeTruthy();
    (nextButton as HTMLButtonElement).click();

    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-anime-card').length).toBe(20);
    expect(getAnimeByFilters).toHaveBeenLastCalledWith({
      genres: [],
      year: undefined,
      status: undefined,
      page: 2,
      perPage: 20,
      sort: 'POPULARITY_DESC',
    });
  });

  it('renders pagination controls', async () => {
    const getAnimeByFilters = vi
      .fn()
      .mockReturnValue(of(buildSearchPage(buildSampleAnime(20), { total: 20 })));

    await TestBed.configureTestingModule({
      imports: [GenresPageComponent, RouterTestingModule],
      providers: [
        {
          provide: AnilistService,
          useValue: { getAnimeByFilters },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenresPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-icon-chevron-left')).toBeTruthy();
    expect(compiled.querySelector('app-icon-chevron-right')).toBeTruthy();
    expect(compiled.textContent).toContain('Page 1 of 1');
  });

  it('shows loading skeletons before results resolve', async () => {
    const getAnimeByFilters = vi.fn().mockReturnValue(NEVER);

    await TestBed.configureTestingModule({
      imports: [GenresPageComponent, RouterTestingModule],
      providers: [
        {
          provide: AnilistService,
          useValue: { getAnimeByFilters },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenresPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });

  it('shows an error message when the request fails', async () => {
    const getAnimeByFilters = vi.fn().mockReturnValue(throwError(() => new Error('fail')));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    await TestBed.configureTestingModule({
      imports: [GenresPageComponent, RouterTestingModule],
      providers: [
        {
          provide: AnilistService,
          useValue: { getAnimeByFilters },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenresPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Unable to load the genres list right now.');
    consoleSpy.mockRestore();
  });

  it('shows an empty message when no anime are returned', async () => {
    const getAnimeByFilters = vi.fn().mockReturnValue(of(buildSearchPage([])));

    await TestBed.configureTestingModule({
      imports: [GenresPageComponent, RouterTestingModule],
      providers: [
        {
          provide: AnilistService,
          useValue: { getAnimeByFilters },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenresPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Genre gremlins ate the results.');
    expect(compiled.textContent).toContain('Tweak the filters and we’ll try again.');
    expect(compiled.querySelector('img[src="/images/no-results.png"]')).toBeTruthy();
  });

  it('requests filtered anime when selections are applied', async () => {
    const getAnimeByFilters = vi.fn().mockReturnValue(of(buildSearchPage(buildSampleAnime(10))));
    await TestBed.configureTestingModule({
      imports: [GenresPageComponent, RouterTestingModule],
      providers: [
        {
          provide: AnilistService,
          useValue: { getAnimeByFilters },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenresPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const filterComponent = fixture.debugElement.query(By.directive(GenreFiltersComponent))
      .componentInstance as GenreFiltersComponent;
    filterComponent.filtersApplied.emit({
      genre: 'Drama',
      year: 2020,
      status: 'RELEASING',
      rating: FILTER_ALL,
    });

    fixture.detectChanges();
    await fixture.whenStable();

    expect(getAnimeByFilters).toHaveBeenLastCalledWith({
      genres: ['Drama'],
      year: 2020,
      status: 'RELEASING',
      page: 1,
      perPage: 20,
      sort: 'POPULARITY_DESC',
    });
  });

  it('filters the grid by the selected rating range', async () => {
    const ratedAnime: AnimeSummary[] = [
      {
        id: 1,
        slug: 'low-score',
        title: { english: 'Low Score' },
        coverImage: { extraLarge: 'cover-1.jpg' },
        format: 'TV',
        status: 'RELEASING',
        averageScore: 40,
        popularity: 500,
        genres: ['Action'],
      },
      {
        id: 2,
        slug: 'mid-score',
        title: { english: 'Mid Score' },
        coverImage: { extraLarge: 'cover-2.jpg' },
        format: 'TV',
        status: 'RELEASING',
        averageScore: 65,
        popularity: 600,
        genres: ['Action'],
      },
      {
        id: 3,
        slug: 'high-score',
        title: { english: 'High Score' },
        coverImage: { extraLarge: 'cover-3.jpg' },
        format: 'TV',
        status: 'RELEASING',
        averageScore: 92,
        popularity: 700,
        genres: ['Action'],
      },
    ];

    const getAnimeByFilters = vi.fn().mockReturnValue(of(buildSearchPage(ratedAnime)));
    await TestBed.configureTestingModule({
      imports: [GenresPageComponent, RouterTestingModule],
      providers: [
        {
          provide: AnilistService,
          useValue: { getAnimeByFilters },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenresPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const filterComponent = fixture.debugElement.query(By.directive(GenreFiltersComponent))
      .componentInstance as GenreFiltersComponent;
    filterComponent.filtersApplied.emit({
      genre: FILTER_ALL,
      year: FILTER_ALL,
      status: FILTER_ALL,
      rating: 'gt-8',
    });

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-anime-card').length).toBe(1);
    expect(compiled.textContent).toContain('High Score');
  });

  it('surfaces the selected genre in the card tags when filtering', async () => {
    const getAnimeByFilters = vi.fn().mockReturnValue(
      of(
        buildSearchPage([
          {
            id: 1,
            slug: 'genre-test',
            title: { english: 'Genre Test' },
            coverImage: { extraLarge: 'cover-1.jpg' },
            format: 'TV',
            status: 'RELEASING',
            averageScore: 78,
            popularity: 800,
            genres: ['Action', 'Drama'],
          },
        ]),
      ),
    );

    await TestBed.configureTestingModule({
      imports: [GenresPageComponent, RouterTestingModule],
      providers: [
        {
          provide: AnilistService,
          useValue: { getAnimeByFilters },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenresPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const filterComponent = fixture.debugElement.query(By.directive(GenreFiltersComponent))
      .componentInstance as GenreFiltersComponent;
    filterComponent.filtersApplied.emit({
      genre: 'Drama',
      year: FILTER_ALL,
      status: FILTER_ALL,
      rating: FILTER_ALL,
    });

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Drama');
  });
});
