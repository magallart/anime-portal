import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-icon-calendar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M16 3v4" />
      <path d="M8 3v4" />
      <path d="M4 10h16" />
    </svg>
  `,
})
export class IconCalendarComponent {}
