import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Une garde : une fonction appelée par le routeur AVANT d'afficher une
 * page, qui peut refuser l'accès. Déclarée sur la route 'devs/:id' dans
 * app.routes.ts. Refuse les numéros invalides (/devs/abc, /devs/0)
 * et redirige vers la page 404.
 */
export const devIdGuard: CanActivateFn = (route) => {
  // route.paramMap.get('id') lit le paramètre :id de l'URL ; c'est
  // toujours une chaîne de caractères, même si ça ressemble à un nombre.
  const id = Number(route.paramMap.get('id'));

  // Si c'est un entier positif, true = on autorise l'accès à la page.
  // Sinon, on renvoie une redirection (une UrlTree) au lieu de true/false :
  // le routeur va alors vers /introuvable, qui affiche la page 404.
  return Number.isInteger(id) && id > 0 ? true : inject(Router).parseUrl('/introuvable');
};
