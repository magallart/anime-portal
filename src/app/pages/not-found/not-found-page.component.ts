import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-gradient-to-b from-accent/50 via-background to-background">
      <div
        class="mx-auto flex min-h-[calc(100vh-6rem)] max-w-4xl flex-col items-center justify-center gap-6 px-gutter py-section text-center sm:gap-8"
      >
        <img
          src="/images/no-results.png"
          alt="Lost anime explorer illustration"
          class="w-full max-w-xs sm:max-w-md"
          loading="lazy"
          decoding="async"
        />
        <div class="space-y-3">
          <h1 class="text-4xl font-heading tracking-tight text-foreground sm:text-5xl">
            This scene hasn't aired
          </h1>
          <p class="text-base text-muted-foreground sm:text-lg">
            The link you followed doesn't exist. Jump back to Home or Genres from the top nav.
          </p>
        </div>
      </div>
    </section>
  `,
})
export class NotFoundPageComponent {}
