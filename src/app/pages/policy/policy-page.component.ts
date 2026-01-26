import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';

interface PolicySection {
  readonly title: string;
  readonly body: string;
}

@Component({
  selector: 'app-policy-page',
  standalone: true,
  imports: [NgFor, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="mx-auto w-full max-w-3xl space-y-8 px-gutter py-section text-left">
      <header class="space-y-3 text-center">
        <p class="text-xs uppercase tracking-[0.4em] text-muted-foreground">Policy</p>
        <h1 class="text-3xl font-heading text-foreground">Community & Experience Policy</h1>
        <p class="text-base text-muted-foreground">
          The following guidelines explain how we collect, use, and protect your experience on Anime
          Portal.
        </p>
      </header>

      <section
        *ngFor="let block of sections"
        class="rounded-2xl border border-border bg-card/80 p-6 shadow-subtle"
      >
        <h2 class="text-xl font-heading text-foreground">{{ block.title }}</h2>
        <p class="mt-3 text-base leading-relaxed text-muted-foreground">
          {{ block.body }}
        </p>
      </section>

      <footer class="rounded-2xl border border-border bg-card/80 p-6 text-sm text-muted-foreground">
        Last updated on {{ lastUpdated | date: 'longDate' }}. Please revisit this page as we evolve
        our practices.
      </footer>
    </article>
  `,
})
export class PolicyPageComponent {
  protected readonly lastUpdated = new Date();

  protected readonly sections: PolicySection[] = [
    {
      title: '1. Information We Collect',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porta, lorem in porta pellentesque, turpis libero mattis quam, eu fermentum mi arcu sed nisi. Integer laoreet semper libero, id efficitur orci volutpat ac. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    },
    {
      title: '2. How We Use Your Data',
      body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Etiam varius orci ligula, vel pulvinar ante interdum vitae. Nullam ultricies risus ex, vitae volutpat enim tempor non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    },
    {
      title: '3. Content Moderation & Community',
      body: 'Quisque efficitur, arcu pulvinar rhoncus tincidunt, turpis mauris commodo lectus, vitae faucibus dui risus non erat. Aliquam eu libero in risus mattis vestibulum ut eu odio. Fusce dapibus ligula nec ex malesuada, vitae luctus justo condimentum.',
    },
    {
      title: '4. Your Controls & Contact',
      body: 'Aenean in lorem blandit, fringilla elit sit amet, condimentum lacus. Maecenas suscipit ex at nunc auctor molestie. Duis tempus orci massa, ac ultricies magna iaculis ac. Cras volutpat diam vel metus rhoncus, vitae blandit risus mattis.',
    },
  ];
}
