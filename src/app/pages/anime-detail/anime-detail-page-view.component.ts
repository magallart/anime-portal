import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { AppButtonIconDirective } from '../../components/app-button/app-button-icon.directive';
import { IconExternalLinkComponent } from '../../components/icons/icon-external-link.component';
import type { AnimeInfoItem } from '../../interfaces/anime-info-item';
import type { AnimeStat } from '../../interfaces/anime-stat';
import { AnimeDetailHeroComponent } from './components/anime-detail-hero.component';
import { AnimeDetailInfoGridComponent } from './components/anime-detail-info-grid.component';
import { AnimeDetailStatsComponent } from './components/anime-detail-stats.component';
import { AnimeDetailSynopsisComponent } from './components/anime-detail-synopsis.component';

@Component({
  selector: 'app-anime-detail-page-view',
  standalone: true,
  imports: [
    AppButtonComponent,
    AppButtonIconDirective,
    IconExternalLinkComponent,
    AnimeDetailHeroComponent,
    AnimeDetailInfoGridComponent,
    AnimeDetailStatsComponent,
    AnimeDetailSynopsisComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="pb-section">
      <section class="relative">
        <app-anime-detail-hero
          [bannerImage]="bannerImage()"
          [coverImage]="coverImage()"
          [posterAlt]="posterAlt()"
          [title]="title()"
          [subtitleRomaji]="subtitleRomaji()"
          [subtitleNative]="subtitleNative()"
          [displayTags]="displayTags()"
        >
          <app-anime-detail-stats [stats]="stats()" [displayTags]="displayTags()" />
          <app-anime-detail-info-grid [infoItems]="infoItems()" />
          <app-anime-detail-synopsis [synopsis]="synopsis()" />
          <div class="flex justify-center pt-4">
            <app-button label="Watch now" size="lg" className="min-w-48 px-10 text-base">
              <app-icon-external-link appButtonIcon />
            </app-button>
          </div>
        </app-anime-detail-hero>
      </section>
    </article>
  `,
})
export class AnimeDetailPageViewComponent {
  readonly title = input.required<string>();
  readonly subtitleRomaji = input<string | undefined>(undefined);
  readonly subtitleNative = input<string | undefined>(undefined);
  readonly synopsis = input.required<string>();
  readonly bannerImage = input<string | undefined>(undefined);
  readonly coverImage = input<string | undefined>(undefined);
  readonly posterAlt = input.required<string>();
  readonly displayTags = input<readonly string[]>([]);
  readonly stats = input<readonly AnimeStat[]>([]);
  readonly infoItems = input<readonly AnimeInfoItem[]>([]);
}
