import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-icon-external-link',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />
      <path d="M10 14l10 -10" />
      <path d="M15 4h5v5" />
    </svg>
  `,
})
export class IconExternalLinkComponent {}
