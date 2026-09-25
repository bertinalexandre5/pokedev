import { WritableSignal, effect, signal } from '@angular/core';

/**
 * Signal dont la valeur est sauvegardée dans le localStorage à chaque modification.
 * `isValid` vérifie la valeur relue : le contenu du localStorage n'est pas fiable.
 * À appeler dans un contexte d'injection (champ ou constructeur d'un service).
 */
export function persistedSignal<T>(
  key: string,
  initial: T,
  isValid: (value: unknown) => value is T,
): WritableSignal<T> {
  const state = signal<T>(read(key, initial, isValid));
  effect(() => {
    const value = state();
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // quota dépassé ou stockage indisponible : l'application reste utilisable
    }
  });
  return state;
}

function read<T>(key: string, initial: T, isValid: (value: unknown) => value is T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) {
      const parsed: unknown = JSON.parse(raw);
      if (isValid(parsed)) {
        return parsed;
      }
    }
  } catch {
    // JSON corrompu ou stockage indisponible
  }
  return initial;
}
