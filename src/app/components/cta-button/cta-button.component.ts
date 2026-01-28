import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconChevronRightComponent } from '../icons/icon-chevron-right.component';

@Component({
  selector: 'app-cta-button',
  standalone: true,
  imports: [RouterLink, IconChevronRightComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-subtle transition hover:bg-primary/90 hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      [routerLink]="link()"
      [attr.aria-label]="label()"
    >
      {{ label() }}
      <app-icon-chevron-right />
    </a>
  `,
})
export class CtaButtonComponent {
  readonly label = input.required<string>();
  readonly link = input<readonly unknown[] | string>(['/']);
}
