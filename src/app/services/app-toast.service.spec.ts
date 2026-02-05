import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppToastService } from './app-toast.service';

describe('AppToastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('adds and removes a toast', () => {
    const service = TestBed.inject(AppToastService);

    const id = service.showError('Unable to reach AniList.', { duration: 0 });

    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0]?.id).toBe(id);

    service.dismiss(id);
    expect(service.toasts().length).toBe(0);
  });

  it('auto-dismisses a toast after the duration', () => {
    vi.useFakeTimers();
    const service = TestBed.inject(AppToastService);

    service.showError('Temporary outage.', { duration: 1000 });
    expect(service.toasts().length).toBe(1);

    vi.advanceTimersByTime(1000);
    expect(service.toasts().length).toBe(0);

    vi.useRealTimers();
  });
});
