import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it, vi } from 'vitest';
import { of } from 'rxjs';
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
    const getAnimeByFilters = vi.fn().mockReturnValue(of(buildSampleAnime(20)));
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.25);

    try {
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
        page: 6,
        perPage: 20,
        sort: 'POPULARITY_DESC',
      });
    } finally {
      randomSpy.mockRestore();
    }
  });
});
