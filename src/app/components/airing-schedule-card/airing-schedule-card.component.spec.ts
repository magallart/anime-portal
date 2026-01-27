import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it } from 'vitest';
import type { AiringEpisode } from '../../interfaces/airing-episode';
import { AiringScheduleCardComponent } from './airing-schedule-card.component';

const episode: AiringEpisode = {
  animeId: 1,
  animeSlug: 'great-adventure',
  title: 'Great Adventure',
  episodeNumber: 7,
  airingAt: 1_700_000_000,
  airingAtDate: new Date(1_700_000_000 * 1000),
  coverImage: 'cover.jpg',
};

describe('AiringScheduleCardComponent', () => {
  it('renders episode information with router link', async () => {
    await TestBed.configureTestingModule({
      imports: [AiringScheduleCardComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(AiringScheduleCardComponent);
    fixture.componentRef.setInput('episode', episode);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a');
    expect(link?.getAttribute('href')).toContain('/anime/great-adventure');
    expect(compiled.textContent).toContain('Episode 7');
    expect(compiled.querySelector('img')?.getAttribute('src')).toContain('cover.jpg');
  });
});
