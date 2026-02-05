import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { AppToastService } from '../../services/app-toast.service';
import { IconAlertTriangleComponent } from '../icons/icon-alert-triangle.component';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgIf, NgFor, IconAlertTriangleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (hasToasts()) {
      <div
        class="fixed left-4 right-4 top-20 z-50 flex max-w-sm flex-col gap-4 sm:left-auto sm:right-4"
        role="region"
        aria-live="polite"
      >
        @for (toast of toasts(); track toast.id) {
          <div
            class="flex items-start gap-4 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive-foreground shadow-subtle"
            role="alert"
            aria-live="assertive"
          >
            <span
              class="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20"
            >
              <app-icon-alert-triangle />
            </span>
            <div class="min-w-0 flex-1 space-y-1">
              <p class="text-sm font-semibold text-destructive-foreground">{{ toast.title }}</p>
              <p class="text-xs text-destructive-foreground/90">{{ toast.message }}</p>
            </div>
            <button
              type="button"
              class="inline-flex items-center rounded-lg px-2 py-1 text-xs font-semibold text-destructive-foreground/80 transition hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              (click)="dismiss(toast.id)"
            >
              Close
            </button>
          </div>
        }
      </div>
    }
  `,
})
export class AppToastComponent {
  private readonly toastService = inject(AppToastService);

  protected readonly toasts = this.toastService.toasts;
  protected readonly hasToasts = computed(() => this.toasts().length > 0);

  protected dismiss(id: number): void {
    this.toastService.dismiss(id);
  }
}
