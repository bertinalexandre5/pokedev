import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Point d'entrée de toute l'application : c'est le tout premier code exécuté.
// bootstrapApplication démarre Angular avec App comme composant racine
// (celui qui remplace la balise <app-root> dans src/index.html),
// et appConfig lui donne les "providers" globaux (routeur, HTTP, locale...).
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
