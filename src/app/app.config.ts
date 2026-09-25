import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { loadingInterceptor } from './core/http/loading-interceptor';

// Enregistre les règles de formatage françaises (dates, nombres, monnaie...)
// pour que les pipes comme "number" ou "date" affichent un résultat en français.
registerLocaleData(localeFr);

// La configuration globale de l'application : tout ce qu'Angular doit
// mettre en place UNE SEULE FOIS, avant même d'afficher le premier composant.
// C'est ici qu'on "branche" les grandes briques : routage, HTTP, langue...
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    // Active le routeur avec la table de routes (app.routes.ts), et
    // withComponentInputBinding() permet de recevoir les paramètres d'URL
    // (ex. :id ou ?type=...) directement comme des input() de composant.
    provideRouter(routes, withComponentInputBinding()),

    // Active HttpClient (utilisé par httpResource) et lui ajoute
    // l'intercepteur loadingInterceptor, qui s'exécute pour CHAQUE requête.
    provideHttpClient(withInterceptors([loadingInterceptor])),

    // Force la locale de l'application à 'fr', quelle que soit la langue
    // du navigateur, pour que les pipes number/date/currency soient en français.
    { provide: LOCALE_ID, useValue: 'fr' },
  ],
};
