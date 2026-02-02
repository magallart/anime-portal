import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it, vi } from 'vitest';
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
    expect(compiled.querySelector('app-icon-wash-dryclean-off')).toBeTruthy();
  });

  it('styles the clear filters button with the purple outline treatment', async () => {
    await TestBed.configureTestingModule({
      imports: [GenreFiltersComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenreFiltersComponent);
    fixture.componentInstance.onGenreChange({ value: 'Action' } as MatSelectChange);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const clearButton = Array.from(compiled.querySelectorAll('button')).find((button) =>
      button.textContent?.includes('Clear filters'),
    );
    expect(clearButton).toBeTruthy();
    expect(clearButton?.className).toContain('border-primary/60');
    expect(clearButton?.className).toContain('text-primary');
    expect(clearButton?.className).toContain('hover:bg-primary/10');
  });

  it('renders four selectors with expected labels', async () => {
    await TestBed.configureTestingModule({
      imports: [GenreFiltersComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenreFiltersComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const labels = Array.from(compiled.querySelectorAll('mat-label')).map((label) =>
      label.textContent?.trim(),
    );

    expect(labels).toEqual(['Genre', 'Year', 'Status', 'Rating']);
  });

  it('exposes options for each selector', async () => {
    await TestBed.configureTestingModule({
      imports: [GenreFiltersComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenreFiltersComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    expect(component.genreOptions.length).toBeGreaterThan(0);
    expect(component.yearOptions.length).toBeGreaterThan(0);
    expect(component.statusOptions.length).toBeGreaterThan(0);
    expect(component.ratingOptions).toEqual([
      { value: 'lt-5', label: 'Less than 5' },
      { value: '5-7', label: '5-7' },
      { value: 'gt-8', label: 'More than 8' },
    ]);
  });

  it('renders apply and clear filter buttons', async () => {
    await TestBed.configureTestingModule({
      imports: [GenreFiltersComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenreFiltersComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(compiled.querySelectorAll('button')).map((button) =>
      button.textContent?.replace(/\s+/g, ' ').trim(),
    );
    expect(buttons).toContain('Apply filters');
    expect(buttons).toContain('Clear filters');
  });

  it('emits the current selections when filters are applied', async () => {
    await TestBed.configureTestingModule({
      imports: [GenreFiltersComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(GenreFiltersComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    const emitSpy = vi.spyOn(component.filtersApplied, 'emit');
    component.onGenreChange({ value: 'Action' } as MatSelectChange);
    component.onYearChange({ value: 2022 } as MatSelectChange);
    component.onStatusChange({ value: 'RELEASING' } as MatSelectChange);
    component.onRatingChange({ value: '5-7' } as MatSelectChange);

    component.applyFilters();

    expect(emitSpy).toHaveBeenCalledWith({
      genre: 'Action',
      year: 2022,
      status: 'RELEASING',
      rating: '5-7',
    });
  });
});
