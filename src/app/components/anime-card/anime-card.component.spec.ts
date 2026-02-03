import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it } from 'vitest';
import { ANIME_CARD_BADGE_ICON } from '../../constants/anime-card-badge';
import type { AnimeCardData } from '../../interfaces/anime-card-data';
import { AnimeCardComponent } from './anime-card.component';

const baseCard: AnimeCardData = {
  id: 1,
  slug: 'mystic-journey',
  title: 'Mystic Journey',
};

describe('AnimeCardComponent', () => {
  it('renders a fallback genre when tags are missing', async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeCardComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(AnimeCardComponent);
    fixture.componentRef.setInput('card', baseCard);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Anime');
  });

  it('renders provided genres without the fallback', async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeCardComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(AnimeCardComponent);
    fixture.componentRef.setInput('card', { ...baseCard, tags: ['Action'] });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Action');
    expect(compiled.textContent).not.toContain('Anime');
  });

  it('renders compact tag styles when enabled', async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeCardComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(AnimeCardComponent);
    fixture.componentRef.setInput('card', { ...baseCard, tags: ['Action'], compactTags: true });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tagList = compiled.querySelector('ul');
    const tag = compiled.querySelector('li');
    expect(tagList?.className).toContain('gap-1.5');
    expect(tag?.className).toContain('py-0.5');
  });

  it('hides tags when configured', async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeCardComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(AnimeCardComponent);
    fixture.componentRef.setInput('card', { ...baseCard, tags: ['Action'], hideTags: true });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('ul')).toBeNull();
    expect(compiled.textContent).not.toContain('Action');
  });

  it('renders subtitle and badge when provided', async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeCardComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(AnimeCardComponent);
    fixture.componentRef.setInput('card', {
      ...baseCard,
      subtitle: 'Misutikku Jaanii',
      badge: '8.6',
      badgeIcon: ANIME_CARD_BADGE_ICON.STAR,
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Misutikku Jaanii');
    expect(compiled.textContent).toContain('8.6');
    expect(compiled.querySelector('app-icon-star')).toBeTruthy();
    expect(compiled.querySelector('.anime-card-badge')?.className).toContain('bg-warning');
  });

  it('renders a placeholder subtitle line when no subtitle or meta exists', async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeCardComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(AnimeCardComponent);
    fixture.componentRef.setInput('card', { ...baseCard, hideTags: true });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p[aria-hidden="true"]')).toBeTruthy();
  });
});
