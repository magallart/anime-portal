import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-anime-detail-synopsis',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mt-6 rounded-2xl bg-background/70 p-5">
      <h2 class="text-xl font-heading text-primary-bright">Synopsis</h2>
      <p class="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
        {{ synopsis() }}
      </p>
    </div>
  `,
})
export class AnimeDetailSynopsisComponent {
  readonly synopsis = input.required<string>();
}
