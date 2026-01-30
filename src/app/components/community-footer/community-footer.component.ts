import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppButtonComponent } from '../app-button/app-button.component';
import { AppButtonIconDirective } from '../app-button/app-button-icon.directive';
import { IconBrandDiscordComponent } from '../icons/icon-brand-discord.component';
import { IconBrandFacebookComponent } from '../icons/icon-brand-facebook.component';
import { IconBrandInstagramComponent } from '../icons/icon-brand-instagram.component';
import { IconBrandXComponent } from '../icons/icon-brand-x.component';
import { IconBrandYoutubeComponent } from '../icons/icon-brand-youtube.component';
import { StatsStripComponent } from '../stats-strip/stats-strip.component';

interface SocialLink {
  readonly key: 'facebook' | 'x' | 'instagram' | 'youtube';
  readonly label: string;
  readonly href: string;
}

@Component({
  selector: 'app-community-footer',
  standalone: true,
  imports: [
    AppButtonComponent,
    AppButtonIconDirective,
    StatsStripComponent,
    IconBrandDiscordComponent,
    IconBrandFacebookComponent,
    IconBrandInstagramComponent,
    IconBrandXComponent,
    IconBrandYoutubeComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="border-t border-border bg-gradient-to-br from-secondary/40 via-accent/80 to-background py-section"
    >
      <div class="mx-auto flex max-w-6xl flex-col gap-8 px-gutter">
        <app-stats-strip />
        <div class="flex flex-col items-center gap-4 text-center">
          <h2 class="text-3xl font-heading text-foreground">Join our community</h2>
          <p class="max-w-2xl text-sm text-muted-foreground">
            Connect with fellow fans, share watchlists, and get early access to upcoming features.
          </p>
          <app-button
            label="Join Discord"
            href="https://discord.com"
            [external]="true"
            size="sm"
            iconPosition="left"
          >
            <app-icon-brand-discord appButtonIcon />
          </app-button>

          <div class="flex flex-wrap items-center justify-center gap-3">
            @for (link of socialLinks; track link.label) {
              <a
                class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                [href]="link.href"
                target="_blank"
                rel="noopener"
                [attr.aria-label]="link.label"
              >
                @switch (link.key) {
                  @case ('facebook') {
                    <app-icon-brand-facebook />
                  }
                  @case ('x') {
                    <app-icon-brand-x />
                  }
                  @case ('instagram') {
                    <app-icon-brand-instagram />
                  }
                  @case ('youtube') {
                    <app-icon-brand-youtube />
                  }
                }
              </a>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CommunityFooterComponent {
  protected readonly socialLinks: SocialLink[] = [
    { key: 'facebook', label: 'Facebook', href: 'https://facebook.com' },
    { key: 'x', label: 'X', href: 'https://x.com' },
    { key: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
    { key: 'youtube', label: 'YouTube', href: 'https://youtube.com' },
  ];
}
