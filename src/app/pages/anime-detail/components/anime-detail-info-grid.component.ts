import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconCalendarComponent } from '../../../components/icons/icon-calendar.component';
import { IconDeviceDesktopComponent } from '../../../components/icons/icon-device-desktop.component';
import { IconPlayerPlayComponent } from '../../../components/icons/icon-player-play.component';
import { IconStarComponent } from '../../../components/icons/icon-star.component';
import type { AnimeInfoItem } from '../../../interfaces/anime-info-item';

@Component({
  selector: 'app-anime-detail-info-grid',
  standalone: true,
  imports: [
    IconCalendarComponent,
    IconDeviceDesktopComponent,
    IconPlayerPlayComponent,
    IconStarComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mt-6 rounded-2xl border border-border bg-background/70 p-5 shadow-subtle">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        @for (item of infoItems(); track item.label) {
          <div class="space-y-2">
            <div
              class="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
            >
              @if (item.icon === 'calendar') {
                <app-icon-calendar class="h-4 w-4 text-primary-bright" />
              } @else if (item.icon === 'episodes') {
                <app-icon-player-play class="text-primary-bright" />
              } @else if (item.icon === 'studio') {
                <app-icon-device-desktop class="h-4 w-4 text-primary-bright" />
              } @else {
                <app-icon-star class="h-4 w-4 text-primary-bright" />
              }
              <span>{{ item.label }}</span>
            </div>
            <p class="text-sm font-semibold text-foreground">{{ item.value }}</p>
          </div>
        }
      </div>
    </div>
  `,
})
export class AnimeDetailInfoGridComponent {
  readonly infoItems = input<readonly AnimeInfoItem[]>([]);
}
