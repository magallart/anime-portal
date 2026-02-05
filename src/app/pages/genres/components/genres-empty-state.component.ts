import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-genres-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-6 text-center text-sm text-muted-foreground"
      role="status"
      aria-live="polite"
    >
      <img
        src="/images/no-results.png"
        alt=""
        class="w-[26rem] max-w-full sm:w-[34rem]"
        loading="lazy"
        decoding="async"
      />
      <div class="space-y-2">
        <p class="text-2xl font-semibold text-foreground sm:text-3xl">
          Genre gremlins ate the results.
        </p>
        <p class="text-lg text-muted-foreground sm:text-xl">
          Tweak the filters and we'll try again.
        </p>
      </div>
    </div>
  `,
})
export class GenresEmptyStateComponent {}
