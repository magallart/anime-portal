import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  readonly label: string;
  readonly path: string;
  readonly testId: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="fixed left-0 right-0 top-0 z-30 w-full border-b border-accent/40 bg-accent/95 text-accent-foreground shadow-subtle backdrop-blur supports-[backdrop-filter]:bg-accent/80"
    >
      <div class="mx-auto flex max-w-6xl items-center justify-between px-gutter py-4">
        <a
          routerLink="/"
          class="group flex items-center gap-3 rounded-full text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Anime Portal home"
        >
          <span
            class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/90 text-lg font-semibold text-primary-foreground shadow-subtle transition group-hover:scale-105"
          >
            AP
          </span>
          <div class="hidden sm:block">
            <p class="font-heading text-lg leading-tight text-accent-foreground">Anime Portal</p>
            <p class="text-xs uppercase tracking-[0.35em] text-accent-foreground/70">
              Curate your queue
            </p>
          </div>
        </a>

        <nav aria-label="Primary navigation">
          <ul class="flex items-center gap-3 text-sm font-medium">
            <li *ngFor="let link of navLinks">
              <a
                [routerLink]="link.path"
                routerLinkActive="text-primary"
                [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                class="rounded-full px-4 py-2 text-accent-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                [attr.data-test]="link.testId"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `,
})
export class AppHeaderComponent {
  protected readonly navLinks: NavLink[] = [
    { label: 'Home', path: '/', testId: 'nav-home' },
    { label: 'Genres', path: '/genres', testId: 'nav-genres' },
  ];
}
