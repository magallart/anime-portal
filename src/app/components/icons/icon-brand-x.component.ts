import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-icon-brand-x',
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
      <path d="M4 4l16 16" />
      <path d="M20 4L4 20" />
    </svg>
  `,
})
export class IconBrandXComponent {}
