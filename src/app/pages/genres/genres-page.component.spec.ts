import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it } from 'vitest';
import { GenresPageComponent } from './genres-page.component';

describe('GenresPageComponent', () => {
  it('renders the genre filters surface', async () => {
    await TestBed.configureTestingModule({
      imports: [GenresPageComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenresPageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.genre-filters')).toBeTruthy();
    expect(compiled.textContent).toContain('Clear filters');
  });
});
