import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-icon-filter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="h-9 w-9"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16l-6 7v5l-4 4v-9z" />
    </svg>
  `,
})
export class IconFilterComponent {}
