import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import type { AnimeDetail } from '../../interfaces/anime-detail';
import type { AnimeInfoItem } from '../../interfaces/anime-info-item';
import type { AnimeStat } from '../../interfaces/anime-stat';
import { AnimeDetailPageViewComponent } from './anime-detail-page-view.component';

@Component({
  selector: 'app-anime-detail-page',
  standalone: true,
  imports: [AnimeDetailPageViewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-anime-detail-page-view
      [title]="title()"
      [subtitleRomaji]="subtitleRomaji()"
      [subtitleNative]="subtitleNative()"
      [synopsis]="synopsis()"
      [bannerImage]="bannerImage()"
      [coverImage]="coverImage()"
      [posterAlt]="posterAlt()"
      [displayTags]="displayTags()"
      [stats]="stats()"
      [infoItems]="infoItems()"
    />
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
