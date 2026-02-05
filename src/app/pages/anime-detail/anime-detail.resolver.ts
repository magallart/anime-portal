import { inject } from '@angular/core';
import { type ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { AnilistService } from '../../services/anilist.service';
import type { AnimeDetail } from '../../interfaces/anime-detail';
import { AppToastService } from '../../services/app-toast.service';
import { APP_ROUTES } from '../../constants/routes';

export const animeDetailResolver: ResolveFn<AnimeDetail> = (route) => {
  const slug = route.paramMap.get('slug');
  const router = inject(Router);
  const anilistService = inject(AnilistService);
  const toastService = inject(AppToastService);

  if (!slug) {
    void router.navigate([APP_ROUTES.notFound]);
    return EMPTY;
  }

  return anilistService.getAnimeDetailsBySlug(slug).pipe(
    catchError((error) => {
      console.error('Anime detail resolver failed.', error);
      toastService.showError('Unable to load anime details right now.');
      void router.navigate([APP_ROUTES.notFound]);
      return EMPTY;
    }),
  );
};
