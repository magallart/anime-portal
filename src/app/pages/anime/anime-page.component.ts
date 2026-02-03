import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { AppButtonIconDirective } from '../../components/app-button/app-button-icon.directive';
import { IconCalendarComponent } from '../../components/icons/icon-calendar.component';
import { IconStarComponent } from '../../components/icons/icon-star.component';
import { IconTrendingUpComponent } from '../../components/icons/icon-trending-up.component';

interface AnimeStat {
  readonly label: string;
  readonly value: string;
  readonly icon: 'star' | 'trending';
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
    IconStarComponent,
    IconTrendingUpComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="mx-auto max-w-6xl px-gutter pb-section pt-8">
      <section
        class="relative overflow-hidden rounded-3xl border border-border bg-card/70 shadow-subtle"
      >
        <div
          class="h-52 bg-gradient-to-br from-primary/30 via-background to-secondary/40 sm:h-64 lg:h-72"
          aria-hidden="true"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent"
          aria-hidden="true"
        ></div>

        <div class="relative z-10 grid gap-8 px-6 pb-8 pt-10 lg:grid-cols-[240px,1fr]">
          <div class="space-y-4">
            <div
              class="aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border bg-muted/30"
              aria-hidden="true"
            ></div>
            <div class="flex flex-wrap gap-2">
              @for (tag of tags; track tag) {
                <span
                  class="inline-flex items-center rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-foreground"
                >
                  {{ tag }}
                </span>
              }
            </div>
          </div>

          <div class="space-y-6">
            <div class="space-y-3">
              <p class="text-xs uppercase tracking-[0.4em] text-muted-foreground">Placeholder</p>
              <h1 class="text-4xl font-heading tracking-tight text-foreground">Mob Psycho 100</h1>
              <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                @for (stat of stats; track stat.label) {
                  <span class="inline-flex items-center gap-2">
                    @if (stat.icon === 'star') {
                      <app-icon-star class="h-4 w-4 text-primary-bright" />
                    } @else {
                      <app-icon-trending-up class="h-4 w-4 text-primary-bright" />
                    }
                    <span class="text-foreground">{{ stat.value }}</span>
                    <span class="text-muted-foreground">{{ stat.label }}</span>
                  </span>
                }
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
                        <app-icon-trending-up class="h-4 w-4 text-primary-bright" />
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
              <h2 class="text-lg font-heading text-foreground">Sinopsis</h2>
              <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                Un estudiante con poderes psiquicos intenta vivir una vida normal mientras mantiene
                sus emociones bajo control.
              </p>
            </div>

            <app-button label="Ver ahora" size="md" className="w-full">
              <app-icon-star appButtonIcon />
            </app-button>
          </div>
        </div>
      </section>
    </article>
  `,
})
export class AnimePageComponent {
  protected readonly tags = ['Accion', 'Comedia', 'Sobrenatural'];
  protected readonly stats: AnimeStat[] = [
    { label: '/10', value: '8.7', icon: 'star' },
    { label: 'visualizaciones', value: '4.6M', icon: 'trending' },
  ];
  protected readonly infoItems: InfoItem[] = [
    { label: 'Ano', value: '2016', icon: 'calendar' },
    { label: 'Episodios', value: '37', icon: 'episodes' },
    { label: 'Estado', value: 'Finalizado', icon: 'status' },
  ];
}
