import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it } from 'vitest';
import type { AnimeCardData } from './anime-card.component';
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
});
