import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-icon-trending-up',
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
      <path d="m3 17 6-6 4 4 7-7" />
      <path d="M14 7h7v7" />
    </svg>
  `,
})
export class IconTrendingUpComponent {}
