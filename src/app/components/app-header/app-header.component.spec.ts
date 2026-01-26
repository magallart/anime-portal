import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { AppHeaderComponent } from './app-header.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `<p>stub</p>`,
})
class StubComponent {}

describe('AppHeaderComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [AppHeaderComponent, StubComponent],
      providers: [
        provideRouter([
          { path: '', component: StubComponent },
          { path: 'genres', component: StubComponent },
        ]),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppHeaderComponent);
    const router = TestBed.inject(Router);
    router.initialNavigation();
    fixture.detectChanges();

    return { fixture, router };
  }

  it('renders the brand logo and nav links', async () => {
    const { fixture } = await setup();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('header')).toBeTruthy();
    expect(compiled.textContent).toContain('Anime Portal');

    const navLinks = compiled.querySelectorAll('nav a');
    expect(navLinks.length).toBe(2);
  });

  it('navigates to genres when the nav link is clicked', async () => {
    const { fixture, router } = await setup();
    const genresLink = fixture.nativeElement.querySelector(
      '[data-test="nav-genres"]',
    ) as HTMLAnchorElement;

    genresLink.click();
    await fixture.whenStable();

    expect(router.url).toBe('/genres');
  });
});
