import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { AppButtonComponent } from '../app-button/app-button.component';
import { AppButtonIconDirective } from '../app-button/app-button-icon.directive';
import { IconArrowUpComponent } from '../icons/icon-arrow-up.component';

const SHOW_THRESHOLD_PX = 320;

@Component({
  selector: 'app-scroll-top-button',
  standalone: true,
  imports: [AppButtonComponent, AppButtonIconDirective, IconArrowUpComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isVisible()) {
      <div class="scroll-top-reveal fixed bottom-6 right-6 z-40">
        <app-button label="Back to top" size="sm" (click)="scrollToTop()">
          <app-icon-arrow-up appButtonIcon />
        </app-button>
      </div>
    }
  `,
})
export class ScrollTopButtonComponent {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly isVisible = signal(false);
  private readonly handleScroll = () => {
    if (typeof window === 'undefined') {
      return;
    }
    this.isVisible.set(window.scrollY > SHOW_THRESHOLD_PX);
  };

  protected scrollToTop(): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private bindScrollListener(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', this.handleScroll);
    });
  }

  constructor() {
    this.bindScrollListener();
  }
}
