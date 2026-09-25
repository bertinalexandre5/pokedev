// Les types de dev.model.ts n'existent qu'À LA COMPILATION : une fois le
// code exécuté, rien ne garantit qu'une réponse venue du serveur (le
// fichier JSON) ait vraiment cette forme. Ce fichier VÉRIFIE une donnée
// à l'exécution (type guard), avant de faire confiance à ses types.
import { DEV_TYPES, Dev, DevType, STAT_KEYS } from '../../domain/dev.model';

// Vrai si la valeur est un objet "normal" (pas null, pas un tableau brut,
// pas un nombre...). Sert de première vérification avant d'aller plus loin.
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/** Vrai si la valeur est l'une des six chaînes valides de DEV_TYPES. */
export function isDevType(value: unknown): value is DevType {
  return typeof value === 'string' && (DEV_TYPES as readonly string[]).includes(value);
}

/** Vérifie à l'exécution qu'une valeur a bien la forme d'un Dev. */
export function isDev(value: unknown): value is Dev {
  if (!isRecord(value) || !isRecord(value['stats'])) {
    return false;
  }
  const stats = value['stats'];
  const types = value['types'];
  const languages = value['languages'];
  // On vérifie CHAQUE champ un par un : le bon type, la bonne forme.
  // Si un seul est faux, "&&" fait échouer tout de suite le reste.
  return (
    typeof value['id'] === 'number' &&
    typeof value['name'] === 'string' &&
    typeof value['title'] === 'string' &&
    typeof value['catchphrase'] === 'string' &&
    Array.isArray(types) &&
    types.length >= 1 &&
    types.length <= 2 &&
    types.every(isDevType) &&
    Array.isArray(languages) &&
    languages.every((language) => typeof language === 'string') &&
    STAT_KEYS.every((key) => typeof stats[key] === 'number') &&
    (value['evolvesTo'] === undefined || typeof value['evolvesTo'] === 'number')
  );
}

/**
 * Valide une réponse brute (venue du JSON) ; lève une erreur si ce n'est
 * pas un tableau de devs valides. Utilisée par DevRepository comme
 * option "parse" de httpResource : si elle lève une erreur, la ressource
 * passe automatiquement en état "error", géré par le template.
 */
export function parseDevs(raw: unknown): Dev[] {
  if (!Array.isArray(raw)) {
    throw new Error('Réponse inattendue : une liste de devs était attendue.');
  }
  const invalid = raw.findIndex((item) => !isDev(item));
  if (invalid !== -1) {
    throw new Error(`Réponse inattendue : l'élément ${invalid} n'est pas un dev valide.`);
  }
  // À ce stade, chaque élément a été vérifié : on peut affirmer le type.
  return raw as Dev[];
}
