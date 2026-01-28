import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-icon-brand-youtube',
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
      <rect x="3" y="7" width="18" height="10" rx="3" />
      <path d="M11 10l4 2-4 2z" />
    </svg>
  `,
})
export class IconBrandYoutubeComponent {}
