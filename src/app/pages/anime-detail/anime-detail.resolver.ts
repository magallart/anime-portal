import { inject } from '@angular/core';
import { type ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { AnilistService } from '../../services/anilist.service';
import type { AnimeDetail } from '../../interfaces/anime-detail';

export const animeDetailResolver: ResolveFn<AnimeDetail> = (route) => {
  const slug = route.paramMap.get('slug');
  const router = inject(Router);
  const anilistService = inject(AnilistService);

  if (!slug) {
    void router.navigate(['/404']);
    return EMPTY;
  }

  return anilistService.getAnimeDetailsBySlug(slug).pipe(
    catchError((error) => {
      console.error('Anime detail resolver failed.', error);
      void router.navigate(['/404']);
      return EMPTY;
    }),
  );
};
