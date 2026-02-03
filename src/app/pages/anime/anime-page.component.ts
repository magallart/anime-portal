import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { AppButtonIconDirective } from '../../components/app-button/app-button-icon.directive';
import { IconCalendarComponent } from '../../components/icons/icon-calendar.component';
import { IconEyeComponent } from '../../components/icons/icon-eye.component';
import { IconPlayerPlayComponent } from '../../components/icons/icon-player-play.component';
import { IconExternalLinkComponent } from '../../components/icons/icon-external-link.component';
import { IconStarComponent } from '../../components/icons/icon-star.component';

interface AnimeStat {
  readonly label: string;
  readonly value: string;
  readonly icon: 'eye' | 'star';
}

interface InfoItem {
  readonly label: string;
  readonly value: string;
  readonly icon: 'calendar' | 'episodes' | 'status';
}

@Component({
  selector: 'app-anime-page',
  standalone: true,
  imports: [
    AppButtonComponent,
    AppButtonIconDirective,
    IconCalendarComponent,
    IconEyeComponent,
    IconExternalLinkComponent,
    IconPlayerPlayComponent,
    IconStarComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="pb-section">
      <section class="relative">
        <div
          class="h-56 w-full bg-gradient-to-br from-primary/30 via-background to-secondary/40 sm:h-72 lg:h-80"
          aria-hidden="true"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent"
          aria-hidden="true"
        ></div>

        <div class="relative z-10 -mt-20 px-gutter sm:-mt-28 lg:-mt-32">
          <div class="mx-auto max-w-6xl">
            <div class="grid gap-8 lg:grid-cols-[240px,1fr]">
              <div class="space-y-4">
                <div
                  class="aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border bg-muted/30"
                  aria-hidden="true"
                ></div>
                <div class="flex flex-wrap gap-2 sm:hidden">
                  @for (tag of tags; track tag) {
                    <span
                      class="inline-flex items-center rounded-full border border-border bg-gradient-to-r from-primary/60 via-primary/40 to-secondary/60 px-3 py-1 text-xs text-primary-foreground"
                    >
                      {{ tag }}
                    </span>
                  }
                </div>
              </div>

              <div class="space-y-6">
                <div class="space-y-3">
                  <p class="text-xs uppercase tracking-[0.4em] text-muted-foreground">Preview</p>
                  <h1 class="text-4xl font-heading tracking-tight text-foreground">
                    Mob Psycho 100
                  </h1>
                  <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    @for (stat of stats; track stat.label) {
                      <span class="inline-flex items-center gap-2">
                        @if (stat.icon === 'star') {
                          <app-icon-star class="h-4 w-4 text-primary-bright" />
                        } @else {
                          <app-icon-eye class="h-4 w-4 text-primary-bright" />
                        }
                        <span class="text-foreground">{{ stat.value }}</span>
                        @if (stat.label) {
                          <span class="text-muted-foreground">{{ stat.label }}</span>
                        }
                      </span>
                    }
                    <div class="flex flex-1 justify-end gap-2">
                      @for (tag of tags; track tag) {
                        <span
                          class="inline-flex items-center rounded-full border border-border bg-gradient-to-r from-primary/60 via-primary/40 to-secondary/60 px-3 py-1 text-xs text-primary-foreground"
                        >
                          {{ tag }}
                        </span>
                      }
                    </div>
                  </div>
                </div>

                <div class="rounded-2xl border border-border bg-background/70 p-5 shadow-subtle">
                  <div class="grid gap-4 sm:grid-cols-3">
                    @for (item of infoItems; track item.label) {
                      <div class="space-y-2">
                        <div
                          class="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
                        >
                          @if (item.icon === 'calendar') {
                            <app-icon-calendar class="h-4 w-4 text-primary-bright" />
                          } @else if (item.icon === 'episodes') {
                            <app-icon-player-play class="text-primary-bright" />
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

                <div class="rounded-2xl border border-border bg-background/70 p-5 shadow-subtle">
                  <h2 class="text-xl font-heading text-primary-bright">Synopsis</h2>
                  <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                    A student with psychic powers tries to live a normal life while keeping his
                    emotions under control.
                  </p>
                </div>

                <div class="flex justify-center pt-4">
                  <app-button label="Watch now" size="lg" className="min-w-48 px-10 text-base">
                    <app-icon-external-link appButtonIcon />
                  </app-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  `,
})
export class AnimePageComponent {
  protected readonly tags = ['Action', 'Comedy', 'Supernatural'];
  protected readonly stats: AnimeStat[] = [
    { label: '', value: '8.7', icon: 'star' },
    { label: '', value: '4.6M', icon: 'eye' },
  ];
  protected readonly infoItems: InfoItem[] = [
    { label: 'Year', value: '2016', icon: 'calendar' },
    { label: 'Episodes', value: '37', icon: 'episodes' },
    { label: 'Status', value: 'Finished', icon: 'status' },
  ];
}
