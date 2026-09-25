import { ResolveFn } from '@angular/router';
import { formatDexNumber } from '../../domain/dev-rules';

/**
 * Un resolver : calcule une valeur AVANT que la route ne s'affiche.
 * Utilisé ici comme "title" de la route 'devs/:id' dans app.routes.ts,
 * pour que l'onglet du navigateur affiche « Pokedev · #011 » plutôt
 * qu'un titre fixe identique pour toutes les fiches.
 */
export const devTitleResolver: ResolveFn<string> = (route) =>
  `Pokedev · ${formatDexNumber(Number(route.paramMap.get('id')))}`;
