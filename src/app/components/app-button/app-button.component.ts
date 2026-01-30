import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

type ButtonVariant = 'primary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';
type IconPosition = 'left' | 'right';

const BASE_CLASSES =
  'inline-flex items-center justify-center rounded-xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground shadow-subtle hover:bg-primary/90',
  outline: 'border border-border text-foreground hover:bg-accent/30',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm font-semibold',
  md: 'px-5 py-2 text-sm font-semibold',
  lg: 'px-6 py-3 text-sm font-medium',
};

const ICON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: '[&>svg]:h-5 [&>svg]:w-5',
  md: '[&>svg]:h-4 [&>svg]:w-4',
  lg: '[&>svg]:h-4 [&>svg]:w-4',
};

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #buttonContent>
      <span class="inline-flex items-center" [class]="iconClasses()">
        <ng-content select="[appButtonIcon]" />
      </span>
      <span>{{ label() }}</span>
    </ng-template>

    @if (href()) {
      <a
        [href]="href()!"
        [attr.target]="external() ? '_blank' : null"
        [attr.rel]="external() ? 'noopener' : null"
        [attr.aria-label]="ariaLabel() ?? label()"
        [attr.data-test]="testId()"
        [class]="buttonClasses()"
      >
        <ng-container [ngTemplateOutlet]="buttonContent" />
      </a>
    } @else if (link()) {
      <a
        [routerLink]="link()!"
        [attr.aria-label]="ariaLabel() ?? label()"
        [attr.data-test]="testId()"
        [class]="buttonClasses()"
      >
        <ng-container [ngTemplateOutlet]="buttonContent" />
      </a>
    } @else {
      <button
        [attr.type]="type()"
        [attr.aria-label]="ariaLabel() ?? label()"
        [attr.data-test]="testId()"
        [class]="buttonClasses()"
      >
        <ng-container [ngTemplateOutlet]="buttonContent" />
      </button>
    }
  `,
})
export class AppButtonComponent {
  readonly label = input.required<string>();
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly iconPosition = input<IconPosition>('left');
  readonly href = input<string | null>(null);
  readonly link = input<readonly unknown[] | string | null>(null);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly external = input(false);
  readonly testId = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);

  protected readonly buttonClasses = computed(() => {
    const variant = VARIANT_CLASSES[this.variant()];
    const size = SIZE_CLASSES[this.size()];
    const direction = this.iconPosition() === 'right' ? 'flex-row-reverse' : '';
    return `${BASE_CLASSES} ${variant} ${size} gap-2 ${direction}`.trim();
  });

  protected readonly iconClasses = computed(() => ICON_SIZE_CLASSES[this.size()]);
}
