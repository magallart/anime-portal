import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-icon-clock',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M12 7v5l3 3" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  `,
})
export class IconClockComponent {}
