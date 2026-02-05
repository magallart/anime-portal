import type { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { GenresPageComponent } from './pages/genres/genres-page.component';
import { AnimeDetailPageComponent } from './pages/anime-detail/anime-detail-page.component';
import { NotFoundPageComponent } from './pages/not-found/not-found-page.component';
import { APP_ROUTES } from './constants/routes';
import { PolicyPageComponent } from './pages/policy/policy-page.component';
import { animeSlugGuard } from './pages/anime-detail/anime-slug.guard';
import { animeDetailResolver } from './pages/anime-detail/anime-detail.resolver';

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
    canActivate: [animeSlugGuard],
    resolve: { anime: animeDetailResolver },
  },
  {
    path: 'policy',
    component: PolicyPageComponent,
    title: 'Anime Portal — Policy',
    data: { breadcrumb: 'Policy' },
  },
  {
    path: '404',
    component: NotFoundPageComponent,
    title: 'Anime Portal — Not found',
    data: { breadcrumb: 'Not found' },
  },
  {
    path: '**',
    redirectTo: APP_ROUTES.notFound,
  },
];
