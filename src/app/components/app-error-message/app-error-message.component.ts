import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive-foreground"
      role="status"
      aria-live="polite"
    >
      {{ message() }}
    </div>
  `,
})
export class AppErrorMessageComponent {
  readonly message = input.required<string>();
}
