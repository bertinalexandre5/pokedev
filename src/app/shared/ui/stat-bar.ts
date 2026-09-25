import { Component, computed, input } from '@angular/core';
import { MAX_STAT } from '../../domain/dev.model';

/** Barre horizontale représentant une statistique sur 100. Réutilisée sur plusieurs écrans. */
@Component({
  selector: 'app-stat-bar',
  template: `
    <span class="label">{{ label() }}</span>
    <span class="track" aria-hidden="true">
      <!-- La largeur en % vient directement du calcul percent() ci-dessous. -->
      <span class="fill" [style.width.%]="percent()"></span>
    </span>
    <span class="value">{{ value() }}</span>
  `,
  host: {
    // Ces liaisons sont sur <app-stat-bar> elle-même (l'élément hôte),
    // pas sur un élément du template : elles rendent le composant
    // reconnaissable comme une barre de progression par un lecteur d'écran.
    role: 'meter',
    '[attr.aria-label]': 'label()',
    '[attr.aria-valuenow]': 'value()',
    'aria-valuemin': '0',
    '[attr.aria-valuemax]': 'max()',
    '[class.highlight]': 'highlight()',
  },
  styles: `
    :host {
      display: grid;
      grid-template-columns: 8rem 1fr 2.5rem;
      align-items: center;
      gap: 0.5rem;
    }
    .track {
      height: 0.6rem;
      border-radius: 999px;
      background: var(--border);
      overflow: hidden;
    }
    .fill {
      display: block;
      height: 100%;
      background: var(--type-color, var(--accent));
    }
    .value {
      text-align: end;
      font-variant-numeric: tabular-nums;
    }
    :host(.highlight) .label {
      font-weight: 700;
    }
  `,
})
export class StatBar {
  readonly label = input.required<string>();
  readonly value = input.required<number>();
  readonly max = input(MAX_STAT); // valeur par défaut : 100
  readonly highlight = input(false); // met le libellé en gras si vrai

  // Se recalcule automatiquement si value() ou max() change.
  // Math.min(100, ...) empêche la barre de dépasser 100% même si
  // value() était, par erreur, plus grand que max().
  protected readonly percent = computed(() =>
    Math.min(100, Math.round((this.value() / this.max()) * 100)),
  );
}
