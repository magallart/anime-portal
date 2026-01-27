import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { AiringEpisode } from '../../interfaces/airing-episode';

@Component({
  selector: 'app-last-airing-anime-card',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      class="flex h-32 w-full items-stretch overflow-hidden bg-gradient-to-r from-primary to-secondary text-left text-primary-foreground shadow-subtle transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      [routerLink]="['/anime', episode().animeSlug]"
    >
      <div
        class="flex h-full w-28 flex-none items-center justify-center border-8 border-accent bg-accent/10"
      >
        @if (episode().coverImage) {
          <img
            [src]="episode().coverImage"
            [alt]="episode().title"
            class="h-full w-full object-cover"
            loading="lazy"
          />
        } @else {
          <span class="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            EP {{ episode().episodeNumber }}
          </span>
        }
      </div>
      <div class="relative flex min-w-0 flex-1 flex-col justify-center gap-1 pl-6 pr-14 pt-6">
        <span
          class="absolute left-6 top-2 inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground"
        >
          Episode {{ episode().episodeNumber }}
        </span>
        <p
          class="text-base font-heading font-semibold text-ink leading-tight line-clamp-2"
          [title]="episode().title"
        >
          {{ episode().title }}
        </p>
        <div class="h-px w-12 bg-primary-foreground/40"></div>
        <p
          class="w-full text-sm text-primary-foreground/80 leading-tight truncate"
          [title]="episode().titleRomaji ?? episode().title"
        >
          {{ episode().titleRomaji ?? episode().title }}
        </p>
      </div>
    </a>
  `,
})
export class LastAiringAnimeCardComponent {
  readonly episode = input.required<AiringEpisode>();
}
