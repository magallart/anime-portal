import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-icon-brand-discord',
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
      <path d="M10.5 6.5a10 10 0 0 1 3 0" />
      <path
        d="M9 7a15 15 0 0 0-4.5 2.5A17 17 0 0 0 3 15.5a16 16 0 0 0 5 2 17 17 0 0 0 8 0 16 16 0 0 0 5-2 17 17 0 0 0-1.5-6 15 15 0 0 0-4.5-2.5"
      />
      <path d="M8.5 13.5h.01" />
      <path d="M15.5 13.5h.01" />
      <path d="M8 17a7 7 0 0 0 8 0" />
    </svg>
  `,
})
export class IconBrandDiscordComponent {}
