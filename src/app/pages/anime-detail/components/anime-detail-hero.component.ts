import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-anime-detail-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
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
                <img [src]="coverImage()" [alt]="posterAlt()" class="h-full w-full object-cover" />
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
            </div>

            <ng-content />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AnimeDetailHeroComponent {
  readonly title = input.required<string>();
  readonly subtitleRomaji = input<string | undefined>(undefined);
  readonly subtitleNative = input<string | undefined>(undefined);
  readonly bannerImage = input<string | undefined>(undefined);
  readonly coverImage = input<string | undefined>(undefined);
  readonly posterAlt = input.required<string>();
  readonly displayTags = input<readonly string[]>([]);
}
