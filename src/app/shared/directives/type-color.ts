import { Directive, computed, input } from '@angular/core';
import { DevType } from '../../domain/dev.model';

// La couleur associée à chaque type, en un seul endroit : si on change
// une couleur, tout ce qui utilise cette directive suit automatiquement.
const TYPE_COLORS: Record<DevType, string> = {
  frontend: '#d9480f',
  backend: '#1864ab',
  devops: '#2b8a3e',
  data: '#862e9c',
  mobile: '#c2255c',
  securite: '#495057',
};

/**
 * Directive d'attribut (pas un composant : pas de template à elle).
 * Elle s'accroche à un élément HTML existant et lui AJOUTE un
 * comportement — ici, une variable CSS --type-color, que les styles
 * de l'élément (ou de ses enfants) peuvent ensuite utiliser avec
 * var(--type-color).
 * Usage : <span [appTypeColor]="'data'">Data</span>
 */
@Directive({
  selector: '[appTypeColor]', // s'applique à tout élément portant cet attribut
  host: {
    // Liaisons sur l'élément qui PORTE la directive (l'élément hôte) :
    '[style.--type-color]': 'color()',
    '[attr.data-type]': 'appTypeColor()',
  },
})
export class TypeColor {
  // Le nom de l'entrée est le même que le sélecteur : ça permet d'écrire
  // directement [appTypeColor]="type" sans nom d'alias.
  readonly appTypeColor = input.required<DevType>();

  protected readonly color = computed(() => TYPE_COLORS[this.appTypeColor()]);
}
