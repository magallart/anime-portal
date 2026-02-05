import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import type { NavLink } from '../../interfaces/nav-link';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="sticky top-0 z-30 w-full border-b border-border bg-gradient-to-r from-accent/80 via-background/90 to-accent/80 text-foreground shadow-subtle backdrop-blur supports-[backdrop-filter]:bg-accent/60"
    >
      <div
        class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-gutter py-3"
      >
        <a
          routerLink="/"
          class="group inline-flex items-center gap-3 rounded-xl text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Anime Portal home"
        >
          <img
            src="/images/logo.png"
            alt="Anime Portal"
            class="h-11 w-auto max-w-[10rem] object-contain transition group-hover:scale-[1.02]"
            loading="eager"
            decoding="async"
          />
          <span
            class="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl supports-[background-clip:text]:bg-gradient-to-r supports-[background-clip:text]:from-primary-bright supports-[background-clip:text]:via-primary supports-[background-clip:text]:to-primary supports-[background-clip:text]:bg-clip-text supports-[background-clip:text]:text-transparent"
          >
            Anime Portal
          </span>
        </a>

        <nav
          aria-label="Primary navigation"
          class="flex w-full justify-center sm:w-auto sm:justify-end"
        >
          <ul
            class="flex flex-wrap items-center justify-center gap-2 text-xs font-medium sm:gap-3 sm:text-sm"
          >
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
    { label: 'HOME', path: '/', testId: 'nav-home' },
    { label: 'GENRES', path: '/genres', testId: 'nav-genres' },
  ];
}
