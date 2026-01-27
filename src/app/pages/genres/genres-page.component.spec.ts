import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it } from 'vitest';
import { GenresPageComponent } from './genres-page.component';

describe('GenresPageComponent', () => {
  it('renders primers for placeholder genres', async () => {
    await TestBed.configureTestingModule({
      imports: [GenresPageComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenresPageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('watchlist');
    expect(compiled.querySelectorAll('[data-test="genre-primer"]').length).toBe(4);
  });
});
