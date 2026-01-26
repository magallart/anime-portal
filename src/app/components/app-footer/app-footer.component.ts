import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="border-t border-accent/40 bg-accent text-sm text-accent-foreground">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-4 px-gutter py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"
      >
        <p>&copy; {{ currentYear }} Anime Portal. Curated discoveries for modern fans.</p>
        <p class="text-sm text-accent-foreground/70">
          Review our
          <a
            routerLink="/policy"
            class="font-medium text-primary underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
            >Policies</a
          >
          to understand how we manage your experience.
        </p>
      </div>
    </footer>
  `,
})
export class AppFooterComponent {
  protected readonly currentYear = new Date().getFullYear();
}
