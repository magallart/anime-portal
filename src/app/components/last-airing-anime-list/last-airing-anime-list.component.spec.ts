import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it } from 'vitest';
import { LastAiringAnimeListComponent } from './last-airing-anime-list.component';
import type { AiringEpisode } from '../../interfaces/airing-episode';

const sampleEpisodes: AiringEpisode[] = [
  {
    animeId: 1,
    animeSlug: 'great-adventure',
    title: 'Great Adventure',
    titleRomaji: 'Great Adventure',
    episodeNumber: 7,
    airingAt: 1_700_000_000,
    airingAtDate: new Date(1_700_000_000 * 1000),
    coverImage: 'cover.jpg',
  },
];

describe('LastAiringAnimeListComponent', () => {
  it('renders empty state when no episodes exist', async () => {
    await TestBed.configureTestingModule({
      imports: [LastAiringAnimeListComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(LastAiringAnimeListComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No airing slots are available');
  });

  it('renders airing episodes grid', async () => {
    await TestBed.configureTestingModule({
      imports: [LastAiringAnimeListComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(LastAiringAnimeListComponent);
    fixture.componentRef.setInput('episodes', sampleEpisodes);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('article').length).toBe(1);
    expect(compiled.textContent).toContain('Great Adventure');
  });

  it('limits visible episodes to the first 10 items', async () => {
    await TestBed.configureTestingModule({
      imports: [LastAiringAnimeListComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(LastAiringAnimeListComponent);
    const episodes = Array.from({ length: 15 }, (_, index) => ({
      animeId: index + 1,
      animeSlug: `slug-${index + 1}`,
      title: `Anime ${index + 1}`,
      episodeNumber: index + 1,
      airingAt: 1_700_000_000 + index,
      airingAtDate: new Date((1_700_000_000 + index) * 1000),
    })) satisfies readonly AiringEpisode[];

    fixture.componentRef.setInput('episodes', episodes);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('article').length).toBe(15);
  });
});
