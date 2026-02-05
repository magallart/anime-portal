import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-icon-alert-triangle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 9v2m0 4v.01m-8.03 2.47l7.06 -12.24a2 2 0 0 1 3.46 0l7.06 12.24a2 2 0 0 1 -1.73 3h-14.12a2 2 0 0 1 -1.73 -3z"
      />
    </svg>
  `,
})
export class IconAlertTriangleComponent {}
