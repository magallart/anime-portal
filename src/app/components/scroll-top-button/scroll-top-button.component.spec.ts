import { TestBed } from '@angular/core/testing';
import { describe, expect, it, beforeEach } from 'vitest';
import { ScrollTopButtonComponent } from './scroll-top-button.component';

describe('ScrollTopButtonComponent', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    });
  });

  it('hides the button when at the top of the page', async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollTopButtonComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ScrollTopButtonComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')).toBeNull();
  });

  it('shows the button after scrolling past the threshold', async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollTopButtonComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ScrollTopButtonComponent);
    fixture.detectChanges();

    Object.defineProperty(window, 'scrollY', {
      value: 400,
      writable: true,
      configurable: true,
    });
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')).toBeTruthy();
  });
});
