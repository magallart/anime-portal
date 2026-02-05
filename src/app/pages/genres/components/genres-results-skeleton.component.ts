import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-genres-results-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-2 gap-layout sm:grid-cols-3 lg:grid-cols-4">
      @for (slot of slots(); track slot) {
        <div class="rounded-xl border border-border bg-card/60 p-4 shadow-subtle animate-pulse">
          <div class="aspect-[2/3] w-full rounded-xl bg-muted/60"></div>
          <div class="mt-4 h-3 w-3/4 rounded bg-muted/70"></div>
          <div class="mt-2 h-3 w-1/2 rounded bg-muted/50"></div>
          <div class="mt-4 flex gap-2">
            <span class="h-5 w-16 rounded-full bg-accent/60"></span>
            <span class="h-5 w-12 rounded-full bg-accent/50"></span>
          </div>
        </div>
      }
    </div>
  `,
})
export class GenresResultsSkeletonComponent {
  readonly slots = input<readonly number[]>([]);
}
