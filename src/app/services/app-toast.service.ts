import { Injectable, signal } from '@angular/core';

export interface ToastOptions {
  readonly title?: string;
  readonly duration?: number;
}

export interface ToastMessage {
  readonly id: number;
  readonly title: string;
  readonly message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppToastService {
  readonly toasts = signal<ToastMessage[]>([]);

  private nextId = 1;
  private readonly timeouts = new Map<number, ReturnType<typeof setTimeout>>();

  showError(message: string, options: ToastOptions = {}): number {
    return this.addToast({
      title: options.title ?? 'Something went wrong',
      message,
      duration: options.duration,
    });
  }

  dismiss(id: number): void {
    const timeout = this.timeouts.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.timeouts.delete(id);
    }
    this.toasts.update((current) => current.filter((toast) => toast.id !== id));
  }

  private addToast(options: { title: string; message: string; duration?: number }): number {
    const id = this.nextId;
    this.nextId += 1;

    const toast: ToastMessage = {
      id,
      title: options.title,
      message: options.message,
    };

    this.toasts.update((current) => [...current, toast]);

    const duration = options.duration ?? 6000;
    if (duration > 0) {
      const timeout = setTimeout(() => this.dismiss(id), duration);
      this.timeouts.set(id, timeout);
    }

    return id;
  }
}
