import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconCalendarComponent } from '../icons/icon-calendar.component';
import { IconStarComponent } from '../icons/icon-star.component';

export interface AnimeCardData {
  readonly id: number;
  readonly slug: string;
  readonly title: string;
  readonly imageUrl?: string;
  readonly badge?: string;
  readonly season?: string;
  readonly rating?: string;
  readonly year?: number;
  readonly tags?: readonly string[];
  readonly compactTags?: boolean;
  readonly hideTags?: boolean;
}

@Component({
  selector: 'app-anime-card',
  standalone: true,
  imports: [RouterLink, IconCalendarComponent, IconStarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="group">
      <a
        class="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-subtle transition duration-300 ease-out hover:-translate-y-1 hover:shadow-medium hover:ring-1 hover:ring-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        [routerLink]="['/anime', card().slug]"
        [attr.aria-label]="card().title"
      >
        <div class="relative aspect-[2/3] w-full overflow-hidden bg-muted/40">
          @if (card().imageUrl) {
            <img
              [src]="card().imageUrl"
              [alt]="card().title"
              class="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
          } @else {
            <div
              class="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground"
            >
              No cover
            </div>
          }

          @if (card().badge) {
            <span
              class="absolute right-3 top-3 inline-flex items-center rounded-full bg-primary/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground"
            >
              {{ card().badge }}
            </span>
          }
        </div>

        <div class="flex flex-1 flex-col gap-3 p-4">
          <div class="space-y-1">
            <h3 class="truncate text-base font-semibold text-foreground">
              {{ card().title }}
            </h3>
            @if (card().season || card().rating) {
              <div class="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                @if (card().season) {
                  <span class="inline-flex items-center gap-1">
                    <span class="text-primary">
                      <app-icon-calendar />
                    </span>
                    {{ card().season }}
                  </span>
                }
                @if (card().rating) {
                  <span class="inline-flex items-center gap-1">
                    <span class="text-primary">
                      <app-icon-star />
                    </span>
                    {{ card().rating }}
                  </span>
                }
              </div>
            }
          </div>

          @if (!card().hideTags) {
            <ul [class]="tagListClass()" aria-label="Tags">
              @for (tag of displayTags(); track tag) {
                <li [class]="tagClass()">
                  {{ tag }}
                </li>
              }
            </ul>
          }
        </div>
      </a>
    </article>
  `,
})
export class AnimeCardComponent {
  readonly card = input.required<AnimeCardData>();
  protected readonly displayTags = computed(() => {
    const tags = this.card().tags ?? [];
    return tags.length ? tags : ['Anime'];
  });
  protected readonly tagListClass = computed(() =>
    this.card().compactTags ? 'flex flex-wrap gap-1.5' : 'flex flex-wrap gap-2',
  );
  protected readonly tagClass = computed(() =>
    this.card().compactTags
      ? 'rounded-full bg-accent/70 px-2 py-0.5 text-xs font-semibold uppercase leading-none tracking-wide text-accent-foreground'
      : 'rounded-full bg-accent/70 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground',
  );
}
