import { Service, computed, signal } from '@angular/core';

/**
 * Compte les requêtes HTTP en cours pour afficher un indicateur global
 * (la barre bleue en haut de la page). Utilisé avec loadingInterceptor,
 * qui appelle start()/stop() automatiquement autour de chaque requête.
 */
@Service()
export class Loading {
  // Le nombre de requêtes en cours en ce moment (0 = rien ne charge).
  private readonly pending = signal(0);

  // active() vaut vrai dès qu'il y a AU MOINS une requête en cours.
  // Se recalcule automatiquement à chaque changement de "pending".
  readonly active = computed(() => this.pending() > 0);

  /** À appeler juste avant d'envoyer une requête. */
  start(): void {
    this.pending.update((count) => count + 1);
  }

  /** À appeler une fois la requête terminée (réussie ou non). */
  stop(): void {
    // Math.max(0, ...) empêche de descendre sous 0 par erreur.
    this.pending.update((count) => Math.max(0, count - 1));
  }
}
