import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
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
        <a
          routerLink="/"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-subtle transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          data-test="not-found-home"
        >
          Go home
        </a>
        <a
          routerLink="/genres"
          class="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          data-test="not-found-genres"
        >
          Explore genres
        </a>
      </div>
    </section>
  `,
})
export class NotFoundPageComponent {}
