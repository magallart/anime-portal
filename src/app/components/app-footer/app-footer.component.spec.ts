import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it } from 'vitest';
import { AppFooterComponent } from './app-footer.component';

describe('AppFooterComponent', () => {
  it('renders footer copy text', async () => {
    await TestBed.configureTestingModule({
      imports: [AppFooterComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppFooterComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Anime Portal');
    const link = compiled.querySelector('a');
    expect(link?.getAttribute('href')).toBe('/policy');
  });
});
