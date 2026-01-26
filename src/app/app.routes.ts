import type { Routes } from '@angular/router';
import { PolicyPageComponent } from './pages/policy/policy-page.component';

export const routes: Routes = [
  {
    path: 'policy',
    component: PolicyPageComponent,
    title: 'Anime Portal — Policy',
  },
];
