import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it } from 'vitest';
import { GenreFiltersComponent } from './genre-filters.component';

describe('GenreFiltersComponent', () => {
  it('renders the rating select with expected options', async () => {
    await TestBed.configureTestingModule({
      imports: [GenreFiltersComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenreFiltersComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Rating');
    const { ratingOptions } = fixture.componentInstance;
    expect(ratingOptions.map((option) => option.label)).toEqual([
      'Less than 5',
      '5-7',
      'More than 8',
    ]);
  });
});
