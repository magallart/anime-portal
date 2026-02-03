import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { AppButtonComponent } from '../app-button/app-button.component';
import { AppButtonIconDirective } from '../app-button/app-button-icon.directive';
import { IconChevronLeftComponent } from '../icons/icon-chevron-left.component';
import { IconChevronRightComponent } from '../icons/icon-chevron-right.component';

type PageItem =
  | {
      kind: 'page';
      key: string;
      page: number;
      isCurrent: boolean;
    }
  | {
      kind: 'ellipsis';
      key: string;
    };

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    AppButtonComponent,
    AppButtonIconDirective,
    IconChevronLeftComponent,
    IconChevronRightComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="flex justify-center" aria-label="Pagination">
      <div class="inline-flex items-center gap-3">
        <app-button
          label="Previous"
          size="xs"
          variant="ghost"
          className="text-xl leading-none"
          labelClassName="text-xl leading-none"
          [disabled]="!canGoPrevious()"
          (click)="goToPrevious()"
        >
          <app-icon-chevron-left appButtonIcon />
        </app-button>

        @for (item of pageItems(); track item.key) {
          @if (item.kind === 'ellipsis') {
            <span class="px-2 text-xs text-muted-foreground">...</span>
          } @else {
            <app-button
              [label]="item.page.toString()"
              size="xs"
              [variant]="item.isCurrent ? 'ghost-active' : 'ghost'"
              className="text-sm leading-none"
              labelClassName="text-sm leading-none"
              [ariaLabel]="'Go to page ' + item.page"
              [ariaCurrent]="item.isCurrent ? 'page' : null"
              (click)="goToPage(item.page)"
            />
          }
        }

        <app-button
          label="Next"
          size="xs"
          variant="ghost"
          iconPosition="right"
          className="text-xl leading-none"
          labelClassName="text-xl leading-none"
          [disabled]="!canGoNext()"
          (click)="goToNext()"
        >
          <app-icon-chevron-right appButtonIcon />
        </app-button>
      </div>
    </nav>
  `,
})
export class PaginationComponent {
  readonly currentPage = input.required<number>();
  readonly totalPages = input.required<number>();
  readonly pageChange = output<number>();

  private readonly siblingCount = 1;

  protected readonly canGoPrevious = computed(() => this.currentPage() > 1);
  protected readonly canGoNext = computed(() => this.currentPage() < this.totalPages());

  protected readonly pageItems = computed<PageItem[]>(() => {
    const total = Math.max(this.totalPages(), 1);
    const current = Math.min(Math.max(this.currentPage(), 1), total);
    const siblings = this.siblingCount;
    const items: PageItem[] = [];

    const addPage = (page: number) => {
      items.push({
        kind: 'page',
        key: `page-${page}`,
        page,
        isCurrent: page === current,
      });
    };

    const addEllipsis = (key: string) => {
      items.push({ kind: 'ellipsis', key });
    };

    if (total <= 7) {
      for (let page = 1; page <= total; page += 1) {
        addPage(page);
      }
      return items;
    }

    addPage(1);

    const start = Math.max(2, current - siblings);
    const end = Math.min(total - 1, current + siblings);

    if (start > 2) {
      addEllipsis('ellipsis-start');
    }

    for (let page = start; page <= end; page += 1) {
      addPage(page);
    }

    if (end < total - 1) {
      addEllipsis('ellipsis-end');
    }

    addPage(total);

    return items;
  });

  protected goToPrevious(): void {
    if (!this.canGoPrevious()) {
      return;
    }

    this.pageChange.emit(this.currentPage() - 1);
  }

  protected goToNext(): void {
    if (!this.canGoNext()) {
      return;
    }

    this.pageChange.emit(this.currentPage() + 1);
  }

  protected goToPage(page: number): void {
    if (page === this.currentPage()) {
      return;
    }

    this.pageChange.emit(page);
  }
}
