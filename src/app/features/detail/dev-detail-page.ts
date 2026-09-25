import { Component, computed, inject, input, linkedSignal, numberAttribute } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DevRepository } from '../../core/data/dev-repository';
import { Team } from '../../core/team/team';
import { STAT_KEYS, StatKey } from '../../domain/dev.model';
import { bestStat, previousEvolution, totalStats } from '../../domain/dev-rules';
import { STAT_LABELS } from '../../domain/labels';
import { DexNumberPipe } from '../../shared/pipes/dex-number-pipe';
import { TypeColor } from '../../shared/directives/type-color';
import { DevAvatar } from '../../shared/ui/dev-avatar';
import { EmptyState } from '../../shared/ui/empty-state';
import { StatBar } from '../../shared/ui/stat-bar';
import { TypeBadge } from '../../shared/ui/type-badge';

// La page de fiche, affichée sur /devs/:id (voir app.routes.ts).
@Component({
  selector: 'app-dev-detail-page',
  imports: [RouterLink, DexNumberPipe, TypeColor, DevAvatar, EmptyState, StatBar, TypeBadge],
  templateUrl: './dev-detail-page.html',
  styleUrl: './dev-detail-page.css',
})
export class DevDetailPage {
  private readonly repository = inject(DevRepository);
  protected readonly team = inject(Team);

  // Le paramètre :id de l'URL est toujours une chaîne ; numberAttribute
  // le convertit automatiquement en nombre (grâce à withComponentInputBinding()
  // dans app.config.ts, qui relie les paramètres d'URL aux entrées).
  /** Paramètre de route :id, converti en nombre. */
  readonly id = input.required({ transform: numberAttribute });

  protected readonly statKeys = STAT_KEYS;
  protected readonly statLabels = STAT_LABELS;
  protected readonly isLoading = this.repository.isLoading;

  // undefined si aucun dev ne porte ce numéro (numéro inconnu, ou
  // données pas encore chargées) : le template gère ce cas (voir le html).
  protected readonly dev = computed(() => this.repository.byId(this.id()));

  protected readonly total = computed(() => {
    const dev = this.dev();
    return dev ? totalStats(dev.stats) : 0;
  });

  // Le dev qui "évolue vers" celui-ci (lien "← précédent").
  protected readonly previous = computed(() => {
    const dev = this.dev();
    return dev ? previousEvolution(this.repository.devs(), dev) : undefined;
  });

  // Le dev vers lequel celui-ci évolue (lien "suivant →").
  protected readonly next = computed(() => {
    const target = this.dev()?.evolvesTo;
    return target === undefined ? undefined : this.repository.byId(target);
  });

  /**
   * Statistique mise en avant : par défaut la meilleure du dev affiché.
   * L'utilisateur peut en choisir une autre (focusedStat.set(key)) ; ce
   * choix est un linkedSignal, PAS un simple computed, car il doit être
   * MODIFIABLE par un clic, tout en se RÉINITIALISANT automatiquement
   * quand on passe à un autre dev (changement de dev = nouvelle valeur
   * calculée par cette fonction).
   */
  protected readonly focusedStat = linkedSignal<StatKey | undefined>(() => {
    const dev = this.dev();
    return dev ? bestStat(dev.stats) : undefined;
  });

  protected readonly devCount = computed(() => this.repository.devs().length);

  /** Rang du dev pour la statistique mise en avant (1 = meilleur). */
  protected readonly focusedRank = computed(() => {
    const dev = this.dev();
    const key = this.focusedStat();
    if (!dev || !key) {
      return undefined;
    }
    // On compte combien de devs font MIEUX que celui-ci sur cette
    // statistique, puis +1 : c'est son rang (1 = personne ne fait mieux).
    return this.repository.devs().filter((other) => other.stats[key] > dev.stats[key]).length + 1;
  });

  /** Autres devs partageant le type principal (affichés en bas de page). */
  protected readonly sameType = computed(() => {
    const dev = this.dev();
    if (!dev) {
      return [];
    }
    return this.repository
      .devs()
      .filter((other) => other.id !== dev.id && other.types.includes(dev.types[0]));
  });
}
