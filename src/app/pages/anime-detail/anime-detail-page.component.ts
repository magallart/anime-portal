import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { AppButtonIconDirective } from '../../components/app-button/app-button-icon.directive';
import { IconCalendarComponent } from '../../components/icons/icon-calendar.component';
import { IconDeviceDesktopComponent } from '../../components/icons/icon-device-desktop.component';
import { IconEyeComponent } from '../../components/icons/icon-eye.component';
import { IconExternalLinkComponent } from '../../components/icons/icon-external-link.component';
import { IconPlayerPlayComponent } from '../../components/icons/icon-player-play.component';
import { IconStarComponent } from '../../components/icons/icon-star.component';
import type { AnimeDetail } from '../../interfaces/anime-detail';
import type { AnimeInfoItem } from '../../interfaces/anime-info-item';
import type { AnimeStat } from '../../interfaces/anime-stat';

@Component({
  selector: 'app-anime-detail-page',
  standalone: true,
  imports: [
    AppButtonComponent,
    AppButtonIconDirective,
    IconCalendarComponent,
    IconDeviceDesktopComponent,
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
        >
          @if (bannerImage()) {
            <img
              [src]="bannerImage()"
              alt=""
              aria-hidden="true"
              class="h-full w-full object-cover opacity-20 blur-[3px]"
            />
          }
        </div>
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
                >
                  @if (coverImage()) {
                    <img
                      [src]="coverImage()"
                      [alt]="posterAlt()"
                      class="h-full w-full object-cover"
                    />
                  }
                </div>
                @if (displayTags().length) {
                  <div class="flex flex-wrap gap-2 sm:hidden">
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

              <div class="space-y-6">
                <div class="space-y-3">
                  <h1 class="text-3xl font-heading tracking-tight text-foreground sm:text-4xl">
                    {{ title() }}
                  </h1>
                  <div class="space-y-1 text-sm text-muted-foreground">
                    @if (subtitleRomaji()) {
                      <p>{{ subtitleRomaji() }}</p>
                    }
                    @if (subtitleNative()) {
                      <p>{{ subtitleNative() }}</p>
                    }
                  </div>
                  <div
                    class="flex flex-wrap items-center gap-3 text-sm text-muted-foreground sm:gap-4"
                  >
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
                </div>

                <div class="rounded-2xl border border-border bg-background/70 p-5 shadow-subtle">
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

                <div class="rounded-2xl border border-border bg-background/70 p-5 shadow-subtle">
                  <h2 class="text-xl font-heading text-primary-bright">Synopsis</h2>
                  <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {{ synopsis() }}
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
export class AnimeDetailPageComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly anime = toSignal(
    this.route.data.pipe(map((data) => data['anime'] as AnimeDetail | undefined)),
    { initialValue: undefined },
  );

  protected readonly title = computed(() => {
    const anime = this.anime();
    return anime?.title?.english ?? anime?.title?.romaji ?? anime?.title?.native ?? 'Unknown anime';
  });

  protected readonly subtitleRomaji = computed(() => {
    const anime = this.anime();
    const romaji = anime?.title?.romaji?.trim();
    if (!romaji) {
      return undefined;
    }
    return this.isDuplicateSubtitle(romaji) ? undefined : romaji;
  });

  protected readonly subtitleNative = computed(() => {
    const anime = this.anime();
    const native = anime?.title?.native?.trim();
    if (!native) {
      return undefined;
    }
    return this.isDuplicateSubtitle(native) ? undefined : native;
  });

  protected readonly synopsis = computed(() => {
    const anime = this.anime();
    return anime?.description ?? 'No synopsis available.';
  });

  protected readonly bannerImage = computed(() => this.anime()?.bannerImage ?? undefined);

  protected readonly coverImage = computed(() => {
    const anime = this.anime();
    return anime?.coverImage?.extraLarge ?? anime?.coverImage?.large ?? anime?.coverImage?.medium;
  });

  protected readonly posterAlt = computed(() => `${this.title()} cover`);

  protected readonly displayTags = computed(() => this.anime()?.genres?.slice(0, 5) ?? []);

  protected readonly stats = computed<AnimeStat[]>(() => {
    const anime = this.anime();
    return [
      { value: this.formatRating(anime?.averageScore), icon: 'star' },
      { value: this.formatNumber(anime?.popularity), icon: 'eye' },
    ];
  });

  protected readonly infoItems = computed<AnimeInfoItem[]>(() => {
    const anime = this.anime();
    return [
      { label: 'Year', value: this.formatYear(anime?.seasonYear), icon: 'calendar' },
      { label: 'Episodes', value: this.formatEpisodes(anime?.episodes), icon: 'episodes' },
      { label: 'Status', value: this.formatStatus(anime?.status), icon: 'status' },
      { label: 'Studio', value: this.formatStudio(anime), icon: 'studio' },
    ];
  });

  private formatRating(score: number | undefined): string {
    if (!score || Number.isNaN(score)) {
      return '-';
    }
    return (score / 10).toFixed(1);
  }

  private formatNumber(value: number | undefined): string {
    if (!value || Number.isNaN(value)) {
      return '-';
    }
    return new Intl.NumberFormat('en-US').format(value);
  }

  private formatYear(value: number | undefined): string {
    return value ? String(value) : 'Unknown';
  }

  private formatEpisodes(value: number | undefined): string {
    return value ? String(value) : 'Unknown';
  }

  private formatStudio(anime: AnimeDetail | undefined): string {
    const studio = anime?.studios?.[0]?.name;
    return studio ? studio : 'Unknown';
  }

  private formatStatus(value: string | undefined): string {
    if (!value) {
      return 'Unknown';
    }
    return value
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }

  private isDuplicateSubtitle(value: string): boolean {
    const title = this.title().trim().toLowerCase();
    return title.length > 0 && title === value.trim().toLowerCase();
  }
}
