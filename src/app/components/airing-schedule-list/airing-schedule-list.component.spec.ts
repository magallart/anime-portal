import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it } from 'vitest';
import { AiringScheduleListComponent } from './airing-schedule-list.component';
import type { AiringEpisode } from '../../interfaces/airing-episode';

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

describe('AiringScheduleListComponent', () => {
  it('renders empty state when no episodes exist', async () => {
    await TestBed.configureTestingModule({
      imports: [AiringScheduleListComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(AiringScheduleListComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No airing slots are scheduled');
  });

  it('renders airing episodes grid', async () => {
    await TestBed.configureTestingModule({
      imports: [AiringScheduleListComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(AiringScheduleListComponent);
    fixture.componentRef.setInput('episodes', sampleEpisodes);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('a').length).toBe(1);
    expect(compiled.textContent).toContain('Great Adventure');
    const imgSrc = compiled.querySelector('img')?.getAttribute('src');
    expect(imgSrc).toContain('cover');
  });
});
