import { inject } from '@angular/core';
import type { CanActivateFn, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

const redirectToNotFound = (): UrlTree => inject(Router).parseUrl('/404');

export const animeSlugGuard: CanActivateFn = (route) => {
  const slug = route.paramMap.get('slug') ?? '';
  const isValid = slug.length > 0 && /^[a-z0-9-]+$/i.test(slug);

  return isValid ? true : redirectToNotFound();
};
