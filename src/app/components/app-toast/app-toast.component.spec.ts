import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { AppToastComponent } from './app-toast.component';
import { AppToastService } from '../../services/app-toast.service';

describe('AppToastComponent', () => {
  it('renders an error toast', () => {
    TestBed.configureTestingModule({
      imports: [AppToastComponent],
    });

    const fixture = TestBed.createComponent(AppToastComponent);
    const toastService = TestBed.inject(AppToastService);

    toastService.showError('Unable to reach AniList.', {
      title: 'Network error',
      duration: 0,
    });

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Network error');
    expect(compiled.textContent).toContain('Unable to reach AniList.');
  });

  it('dismisses a toast when close is clicked', () => {
    TestBed.configureTestingModule({
      imports: [AppToastComponent],
    });

    const fixture = TestBed.createComponent(AppToastComponent);
    const toastService = TestBed.inject(AppToastService);

    toastService.showError('Temporary error.', { duration: 0 });
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(toastService.toasts().length).toBe(0);
  });
});
