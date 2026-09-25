import { InjectionToken } from '@angular/core';

// inject() marche directement avec une classe (inject(Team)), mais une
// simple chaîne de caractères comme une URL n'a pas d'identité propre
// pour Angular. Un InjectionToken lui en donne une, comme une étiquette.
/** Adresse de la liste des devs. Un jeton d'injection permet de la remplacer (tests, autre serveur). */
export const DEVS_URL = new InjectionToken<string>('DEVS_URL', {
  factory: () => 'data/devs.json', // valeur utilisée si rien ne la remplace
});
