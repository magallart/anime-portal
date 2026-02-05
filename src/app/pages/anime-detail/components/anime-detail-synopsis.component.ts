import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-anime-detail-synopsis',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-2xl border border-border bg-background/70 p-5 shadow-subtle">
      <h2 class="text-xl font-heading text-primary-bright">Synopsis</h2>
      <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
        {{ synopsis() }}
      </p>
    </div>
  `,
})
export class AnimeDetailSynopsisComponent {
  readonly synopsis = input.required<string>();
}
