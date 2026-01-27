import type { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { GenresPageComponent } from './pages/genres/genres-page.component';
import { AnimeDetailPageComponent } from './pages/anime-detail/anime-detail-page.component';
import { PolicyPageComponent } from './pages/policy/policy-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Anime Portal — Home',
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'genres',
    component: GenresPageComponent,
    title: 'Anime Portal — Genres',
    data: { breadcrumb: 'Genres' },
  },
  {
    path: 'anime/:slug',
    component: AnimeDetailPageComponent,
    title: 'Anime Portal — Anime Detail',
    data: { breadcrumb: 'Anime Detail' },
  },
  {
    path: 'policy',
    component: PolicyPageComponent,
    title: 'Anime Portal — Policy',
    data: { breadcrumb: 'Policy' },
  },
];
