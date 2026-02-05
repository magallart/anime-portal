import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it } from 'vitest';
import { NotFoundPageComponent } from './not-found-page.component';

describe('NotFoundPageComponent', () => {
  it('offers navigation options back into the app', async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundPageComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(NotFoundPageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('scene');
    expect(compiled.textContent).not.toContain('Error 404');
    expect(compiled.querySelector('img')).toBeTruthy();
    expect(compiled.querySelectorAll('[data-test^="not-found"]').length).toBe(0);
  });
});
