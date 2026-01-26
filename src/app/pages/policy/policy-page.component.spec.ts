import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { PolicyPageComponent } from './policy-page.component';

describe('PolicyPageComponent', () => {
  it('renders policy sections', async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyPageComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(PolicyPageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const headings = compiled.querySelectorAll('h2');
    expect(headings.length).toBeGreaterThanOrEqual(4);
    expect(headings[0].textContent).toContain('Information');
  });
});
