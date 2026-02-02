import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it } from 'vitest';
import type { MatSelectChange } from '@angular/material/select';
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

  it('disables action buttons until a filter is selected', async () => {
    await TestBed.configureTestingModule({
      imports: [GenreFiltersComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenreFiltersComponent);
    fixture.detectChanges();

    let compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(1);
    buttons.forEach((button) => {
      expect(button.disabled).toBe(true);
    });

    fixture.componentInstance.onGenreChange({ value: 'Action' } as MatSelectChange);
    fixture.detectChanges();

    compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelectorAll('button').forEach((button) => {
      expect(button.disabled).toBe(false);
    });
  });
});
