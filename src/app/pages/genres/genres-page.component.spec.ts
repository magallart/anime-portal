import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it, vi } from 'vitest';
import { NEVER, of, throwError } from 'rxjs';
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

  it('renders the genre filters surface and random anime grid', async () => {
    const getAnimeByFilters = vi.fn().mockReturnValue(of(buildSampleAnime(40)));
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
      page: 1,
      perPage: 200,
      sort: 'POPULARITY_DESC',
    });
  });

  it('loads 20 more anime when clicking load more', async () => {
    const getAnimeByFilters = vi.fn().mockReturnValue(of(buildSampleAnime(40)));

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

    const loadMoreButton = Array.from(compiled.querySelectorAll('button')).find((button) =>
      button.textContent?.includes('Load more'),
    );
    expect(loadMoreButton).toBeTruthy();
    (loadMoreButton as HTMLButtonElement).click();

    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-anime-card').length).toBe(40);
  });

  it('renders the load more button with the plus icon', async () => {
    const getAnimeByFilters = vi.fn().mockReturnValue(of(buildSampleAnime(20)));

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
    expect(compiled.querySelector('app-icon-square-rounded-plus')).toBeTruthy();
    expect(compiled.textContent).toContain('Showing 20 of 20');
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
    const getAnimeByFilters = vi.fn().mockReturnValue(of([]));

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
    expect(compiled.textContent).toContain('No anime matched this selection. Try another refresh.');
  });
});
