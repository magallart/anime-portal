import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { describe, expect, it } from 'vitest';
import { AnimeDetailPageComponent } from './anime-detail-page.component';

describe('AnimeDetailPageComponent', () => {
  it('renders placeholder facts', async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeDetailPageComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(AnimeDetailPageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Unknown anime');
    expect(compiled.textContent).toContain('Year');
    expect(compiled.textContent).toContain('Episodes');
    expect(compiled.textContent).toContain('Status');
    expect(compiled.textContent).toContain('Studio');
    expect(compiled.textContent).toContain('Synopsis');
    expect(compiled.textContent).toContain('No synopsis available.');
  });

  it('renders resolved anime data', async () => {
    const data$ = of({
      anime: {
        id: 21,
        slug: 'one-piece',
        title: { english: 'ONE PIECE', romaji: 'ONE PIECE', native: 'ONE PIECE' },
        coverImage: { large: 'https://example.com/cover.jpg' },
        genres: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy'],
        studios: [{ id: 1, name: 'Toei Animation', isAnimationStudio: true }],
        tags: [],
        averageScore: 88,
        popularity: 660474,
        seasonYear: 1999,
        status: 'RELEASING',
        episodes: undefined,
        description: 'Pirates and adventure await.',
      },
    });

    await TestBed.configureTestingModule({
      imports: [AnimeDetailPageComponent, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: data$,
            paramMap: of(convertToParamMap({ slug: 'one-piece' })),
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AnimeDetailPageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('ONE PIECE');
    expect(compiled.textContent).toContain('Toei Animation');
    expect(compiled.textContent).toContain('1999');
    expect(compiled.textContent).toContain('Releasing');
    expect(compiled.textContent).toContain('8.8');
    expect(compiled.textContent).toContain('660,474');
    expect(compiled.textContent).toContain('Pirates and adventure await.');
  });
});
