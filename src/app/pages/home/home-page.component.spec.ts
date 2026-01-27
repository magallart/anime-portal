import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it } from 'vitest';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  it('renders hero content and highlights', async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Discover');
    expect(compiled.querySelectorAll('[data-test="home-highlight"]').length).toBe(3);
  });
});
