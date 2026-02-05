import { ChangeDetectionStrategy, Component, input, type Type } from '@angular/core';
import { AnimeSectionComponent } from '../../components/anime-section/anime-section.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { CommunityFooterComponent } from '../../components/community-footer/community-footer.component';
import type { AnimeCardData } from '../../interfaces/anime-card-data';

@Component({
  selector: 'app-home-page-view',
  standalone: true,
  imports: [AnimeSectionComponent, HeroSectionComponent, CommunityFooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero-section />

    <section>
      <div class="w-full border-y border-border bg-accent/70">
        <div class="mx-auto max-w-6xl px-gutter py-section">
          <app-anime-section
            title="Highest-rated anime"
            [icon]="mostViewedIcon()"
            [items]="mostViewedCards()"
            [loading]="loading()"
            [error]="error()"
            gridClass="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          />
        </div>
      </div>

      <div class="mx-auto max-w-6xl px-gutter py-section">
        <app-anime-section
          title="Latest releases"
          [icon]="latestReleaseIcon()"
          [items]="latestReleaseCards()"
          [loading]="loading()"
          [error]="error()"
          gridClass="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        />
      </div>
    </section>

    <app-community-footer />
  `,
})
export class HomePageViewComponent {
  readonly mostViewedIcon = input.required<Type<unknown>>();
  readonly latestReleaseIcon = input.required<Type<unknown>>();
  readonly mostViewedCards = input<readonly AnimeCardData[]>([]);
  readonly latestReleaseCards = input<readonly AnimeCardData[]>([]);
  readonly loading = input(false);
  readonly error = input<string | null>(null);
}
