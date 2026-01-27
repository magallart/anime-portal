import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { describe, expect, it } from 'vitest';
import { CtaButtonComponent } from './cta-button.component';

describe('CtaButtonComponent', () => {
  it('renders provided label and link', async () => {
    await TestBed.configureTestingModule({
      imports: [CtaButtonComponent, RouterTestingModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(CtaButtonComponent);
    fixture.componentRef.setInput('label', 'Ver más');
    fixture.componentRef.setInput('link', ['/section']);
    fixture.detectChanges();

    const button = fixture.nativeElement as HTMLElement;
    expect(button.textContent).toContain('Ver más');
    expect(fixture.componentRef.instance.link()).toEqual(['/section']);
  });
});
