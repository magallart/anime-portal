import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconEyeComponent } from '../../../components/icons/icon-eye.component';
import { IconStarComponent } from '../../../components/icons/icon-star.component';
import type { AnimeStat } from '../../../interfaces/anime-stat';

@Component({
  selector: 'app-anime-detail-stats',
  standalone: true,
  imports: [IconEyeComponent, IconStarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-wrap items-center gap-3 text-sm text-muted-foreground sm:gap-4">
      @for (stat of stats(); track stat.icon) {
        <span class="inline-flex items-center gap-2">
          @if (stat.icon === 'star') {
            <app-icon-star class="h-4 w-4 text-primary-bright" />
          } @else {
            <app-icon-eye class="h-4 w-4 text-primary-bright" />
          }
          <span class="text-foreground">{{ stat.value }}</span>
        </span>
      }
      @if (displayTags().length) {
        <div class="flex w-full flex-wrap gap-2 sm:ml-auto sm:w-auto sm:justify-end">
          @for (tag of displayTags(); track tag) {
            <span
              class="inline-flex items-center rounded-full border border-border bg-gradient-to-r from-primary/60 via-primary/40 to-secondary/60 px-3 py-1 text-xs text-primary-foreground"
            >
              {{ tag }}
            </span>
          }
        </div>
      }
    </div>
  `,
})
export class AnimeDetailStatsComponent {
  readonly stats = input<readonly AnimeStat[]>([]);
  readonly displayTags = input<readonly string[]>([]);
}
