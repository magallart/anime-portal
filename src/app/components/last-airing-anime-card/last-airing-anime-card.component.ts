import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import type { AiringEpisode } from '../../interfaces/airing-episode';

@Component({
  selector: 'app-last-airing-anime-card',
  standalone: true,
  imports: [DatePipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      class="flex items-center gap-4 rounded-xl border border-border bg-card p-card text-left shadow-subtle transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      [routerLink]="['/anime', episode().animeSlug]"
    >
      <div class="flex h-16 w-16 flex-none items-center justify-center rounded-xl bg-accent/20">
        @if (episode().coverImage) {
          <img
            [src]="episode().coverImage"
            [alt]="episode().title"
            class="h-16 w-16 rounded-xl object-cover"
            loading="lazy"
          />
        } @else {
          <span class="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            EP {{ episode().episodeNumber }}
          </span>
        }
      </div>
      <div class="space-y-1">
        <p class="text-sm font-medium text-primary">Episode {{ episode().episodeNumber }}</p>
        <p class="text-base font-heading text-foreground">{{ episode().title }}</p>
        <p class="text-xs text-muted-foreground">
          Airing {{ episode().airingAtDate | date: 'medium' }}
        </p>
      </div>
    </a>
  `,
})
export class LastAiringAnimeCardComponent {
  readonly episode = input.required<AiringEpisode>();
}
