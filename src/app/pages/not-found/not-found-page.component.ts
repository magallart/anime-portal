import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { AppButtonIconDirective } from '../../components/app-button/app-button-icon.directive';
import { IconChevronRightComponent } from '../../components/icons/icon-chevron-right.component';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [AppButtonComponent, AppButtonIconDirective, IconChevronRightComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 px-gutter py-section text-center"
    >
      <p class="text-xs uppercase tracking-[0.4em] text-muted-foreground">404</p>
      <h1 class="text-4xl font-heading tracking-tight text-foreground">
        We couldn't find that page
      </h1>
      <p class="text-base text-muted-foreground">
        Double-check the link or return to a curated path. When anime slugs or routes are incorrect
        we guide you back to safe navigation.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <app-button label="Go home" [link]="['/']" size="sm" testId="not-found-home" />
        <app-button
          label="Explore genres"
          [link]="['/genres']"
          size="sm"
          variant="outline"
          testId="not-found-genres"
          iconPosition="right"
        >
          <app-icon-chevron-right appButtonIcon />
        </app-button>
      </div>
    </section>
  `,
})
export class NotFoundPageComponent {}
