import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { Loading } from './loading';

/**
 * Intercepteur fonctionnel : s'exécute pour CHAQUE requête HTTP envoyée
 * par l'application (déclaré dans app.config.ts). Il signale le début
 * et la fin de la requête au service Loading, pour la barre de chargement.
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(Loading);
  loading.start(); // avant d'envoyer la requête

  // next(req) envoie réellement la requête et renvoie sa réponse (un
  // Observable RxJS). finalize() s'exécute ENSUITE, dans tous les cas :
  // succès, erreur, ou requête annulée — le compteur ne reste donc
  // jamais bloqué à "en cours".
  return next(req).pipe(finalize(() => loading.stop()));
};
