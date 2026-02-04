import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
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
    expect(compiled.querySelectorAll('[data-test="detail-fact"]').length).toBe(4);
  });
});
