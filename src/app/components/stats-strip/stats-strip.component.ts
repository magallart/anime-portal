import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { StatItem } from '../../interfaces/stat-item';

@Component({
  selector: 'app-stats-strip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="w-full">
      <div class="grid gap-4 md:grid-cols-3">
        @for (stat of stats; track stat.label) {
          <div
            class="rounded-xl border border-border bg-gradient-to-br from-primary/10 via-card to-secondary/10 p-6 text-center shadow-subtle"
          >
            <p class="text-3xl font-heading font-semibold text-foreground">{{ stat.value }}</p>
            <p class="mt-2 text-sm text-muted-foreground">{{ stat.label }}</p>
          </div>
        }
      </div>
    </section>
  `,
})
export class StatsStripComponent {
  protected readonly stats: StatItem[] = [
    { value: '1000+', label: 'Available Anime' },
    { value: '50K+', label: 'Active Users' },
    { value: '100+', label: 'Weekly Releases' },
  ];
}
