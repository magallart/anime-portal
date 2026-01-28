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
      class="sticky top-0 z-30 w-full border-b border-border bg-gradient-to-r from-accent/80 via-background/90 to-accent/80 text-foreground shadow-subtle backdrop-blur supports-[backdrop-filter]:bg-accent/60"
    >
      <div class="mx-auto grid max-w-6xl grid-cols-[auto_1fr] items-center gap-4 px-gutter py-3">
        <a
          routerLink="/"
          class="group inline-flex items-center gap-3 rounded-xl text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Anime Portal home"
        >
          <span
            class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/90 text-lg font-semibold text-primary-foreground shadow-subtle transition group-hover:scale-105"
          >
            AP
          </span>
          <div class="hidden sm:block">
            <p class="font-heading text-lg leading-tight text-foreground">Anime Portal</p>
            <p class="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Curate your queue
            </p>
          </div>
        </a>

        <nav aria-label="Primary navigation" class="hidden justify-end md:flex">
          <ul class="flex items-center gap-3 text-sm font-medium">
            <li *ngFor="let link of navLinks">
              <a
                [routerLink]="link.path"
                routerLinkActive="text-primary-bright hover:text-primary-bright font-semibold"
                [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                class="rounded-xl px-4 py-2 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
