import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface AnimeCardData {
  readonly id: number;
  readonly slug: string;
  readonly title: string;
  readonly imageUrl?: string;
  readonly badge?: string;
  readonly meta?: string;
  readonly year?: number;
  readonly tags?: readonly string[];
}

@Component({
  selector: 'app-anime-card',
  standalone: true,
  imports: [RouterLink],
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
            <h3 class="line-clamp-2 text-base font-semibold text-foreground">
              {{ card().title }}
            </h3>
            @if (card().meta) {
              <p class="text-xs text-muted-foreground">{{ card().meta }}</p>
            }
          </div>

          @if (card().tags?.length) {
            <ul class="flex flex-wrap gap-2" aria-label="Tags">
              @for (tag of card().tags; track tag) {
                <li
                  class="rounded-full bg-accent/70 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground"
                >
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
}
