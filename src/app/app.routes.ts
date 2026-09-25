import { Routes } from '@angular/router';
import { devIdGuard } from './core/navigation/dev-id-guard';
import { devTitleResolver } from './core/navigation/dev-title-resolver';
import { unsavedChangesGuard } from './core/navigation/unsaved-changes-guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'devs' },
  {
    path: 'devs',
    loadComponent: () => import('./features/dex/dev-page').then((m) => m.DexPage),
    title: 'Pokedev · Pokédex',
  },
  {
    path: 'devs/:id',
    loadComponent: () => import('./features/detail/dev-detail-page').then((m) => m.DevDetailPage),
    canActivate: [devIdGuard],
    title: devTitleResolver,
  },
  {
    path: 'equipe',
    loadComponent: () => import('./features/team/team-page').then((m) => m.TeamPage),
    title: 'Pokedev · Mon équipe',
  },
  {
    path: 'creer',
    loadComponent: () => import('./features/create/create-dev-page').then((m) => m.CreateDevPage),
    canDeactivate: [unsavedChangesGuard],
    title: 'Pokedev · Créer un dev',
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found-page').then((m) => m.NotFoundPage),
    title: 'Pokedev · Page introuvable',
  },
];
