import { ChangeDetectionStrategy, Component, input, type Type } from '@angular/core';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { AnimeCardComponent, type AnimeCardData } from '../anime-card/anime-card.component';

@Component({
  selector: 'app-anime-section',
  standalone: true,
  imports: [NgClass, NgComponentOutlet, AnimeCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="space-y-6">
      <header class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span
            class="inline-flex h-11 w-11 items-center justify-center text-primary"
            aria-hidden="true"
          >
            <ng-container *ngComponentOutlet="icon()" />
          </span>
          <div>
            <h2 class="text-2xl font-heading text-foreground">{{ title() }}</h2>
            @if (subtitle()) {
              <p class="text-sm text-muted-foreground">{{ subtitle() }}</p>
            }
          </div>
        </div>
      </header>

      @if (loading()) {
        <div class="grid gap-6" [ngClass]="gridClass()">
          @for (slot of skeletonSlots; track slot) {
            <div class="rounded-xl border border-border bg-card/60 p-4 shadow-subtle animate-pulse">
              <div class="aspect-[2/3] w-full rounded-xl bg-muted/60"></div>
              <div class="mt-4 h-3 w-3/4 rounded bg-muted/70"></div>
              <div class="mt-2 h-3 w-1/2 rounded bg-muted/50"></div>
              <div class="mt-4 flex gap-2">
                <span class="h-5 w-16 rounded-full bg-accent/60"></span>
                <span class="h-5 w-12 rounded-full bg-accent/50"></span>
              </div>
            </div>
          }
        </div>
      } @else if (error()) {
        <div
          class="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive-foreground"
          role="status"
          aria-live="polite"
        >
          {{ error() }}
        </div>
      } @else if (!items().length) {
        <div
          class="rounded-xl border border-border bg-card/60 p-6 text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          {{ emptyMessage() }}
        </div>
      } @else {
        <div class="grid gap-6" [ngClass]="gridClass()">
          @for (item of items(); track item.id) {
            <app-anime-card [card]="item" />
          }
        </div>
      }
    </section>
  `,
})
export class AnimeSectionComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string | null>(null);
  readonly icon = input.required<Type<unknown>>();
  readonly items = input<readonly AnimeCardData[]>([]);
  readonly loading = input(false);
  readonly error = input<string | null>(null);
  readonly emptyMessage = input('No titles available right now. Please check back soon.');
  readonly gridClass = input('grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4');
  protected readonly skeletonSlots = Array.from({ length: 8 }, (_, index) => index);
}
