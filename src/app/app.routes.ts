import type { Routes } from '@angular/router';
import { APP_ROUTES } from './constants/routes';
import { animeSlugGuard } from './pages/anime-detail/anime-slug.guard';
import { animeDetailResolver } from './pages/anime-detail/anime-detail.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home-page.component').then((m) => m.HomePageComponent),
    title: 'Anime Portal — Home',
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'genres',
    loadComponent: () =>
      import('./pages/genres/genres-page.component').then((m) => m.GenresPageComponent),
    title: 'Anime Portal — Genres',
    data: { breadcrumb: 'Genres' },
  },
  {
    path: 'anime/:slug',
    loadComponent: () =>
      import('./pages/anime-detail/anime-detail-page.component').then(
        (m) => m.AnimeDetailPageComponent,
      ),
    title: 'Anime Portal — Anime Detail',
    data: { breadcrumb: 'Anime Detail' },
    canActivate: [animeSlugGuard],
    resolve: { anime: animeDetailResolver },
  },
  {
    path: 'policy',
    loadComponent: () =>
      import('./pages/policy/policy-page.component').then((m) => m.PolicyPageComponent),
    title: 'Anime Portal — Policy',
    data: { breadcrumb: 'Policy' },
  },
  {
    path: '404',
    loadComponent: () =>
      import('./pages/not-found/not-found-page.component').then((m) => m.NotFoundPageComponent),
    title: 'Anime Portal — Not found',
    data: { breadcrumb: 'Not found' },
  },
  {
    path: '**',
    redirectTo: APP_ROUTES.notFound,
  },
];
