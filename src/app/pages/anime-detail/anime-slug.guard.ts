import { inject } from '@angular/core';
import type { CanActivateFn, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

const placeholderValidSlugs = new Set(['placeholder-anime']);

const redirectToNotFound = (): UrlTree => inject(Router).parseUrl('/404');

export const animeSlugGuard: CanActivateFn = (route) => {
  const slug = route.paramMap.get('slug') ?? '';
  const isValid =
    slug.length > 0 && /^[a-z0-9-]+$/i.test(slug) && placeholderValidSlugs.has(slug.toLowerCase());

  return isValid ? true : redirectToNotFound();
};
