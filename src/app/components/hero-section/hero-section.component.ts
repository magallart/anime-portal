import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CtaButtonComponent } from '../cta-button/cta-button.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CtaButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="border-b border-border bg-gradient-to-b from-accent/80 via-background to-background"
    >
      <div
        class="mx-auto flex max-w-6xl flex-col items-center gap-6 px-gutter pb-16 pt-6 text-center sm:pb-24 sm:pt-10"
      >
        <p class="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
          Now streaming
        </p>
        <h1 class="text-4xl font-heading tracking-tight text-foreground sm:text-5xl">
          Discover the World of
          <span class="text-primary">Anime</span>
        </h1>
        <p class="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Explore curated seasonal highlights, most-viewed hits, and weekly drops in a cinematic,
          night-inspired experience tailored for anime fans.
        </p>
        <app-cta-button label="Explore Genres" [link]="['/genres']" />
      </div>
    </section>
  `,
})
export class HeroSectionComponent {}
