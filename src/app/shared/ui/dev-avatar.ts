import { Component, computed, input } from '@angular/core';
import { DevType } from '../../domain/dev.model';
import { TypeColor } from '../directives/type-color';

/**
 * Avatar généré : les initiales du dev, sur un disque de la couleur
 * de son type principal. Composant réutilisé sur plusieurs écrans
 * (carte, fiche...), donc rangé dans shared/ui.
 */
@Component({
  selector: 'app-dev-avatar',
  // hostDirectives applique TypeColor directement sur <app-dev-avatar>
  // elle-même, et renomme son entrée "appTypeColor" en "type" pour cet
  // usage précis : on écrit [type]="..." plutôt que [appTypeColor]="...".
  hostDirectives: [{ directive: TypeColor, inputs: ['appTypeColor: type'] }],
  host: { role: 'img', '[attr.aria-label]': '"Avatar de " + name()' },
  template: `{{ initials() }}`,
  styles: `
    :host {
      display: grid;
      place-items: center;
      /* --avatar-size est réglable depuis l'extérieur (voir dev-detail-page.html
         qui utilise style="--avatar-size: 6rem"), avec 3.5rem par défaut. */
      width: var(--avatar-size, 3.5rem);
      aspect-ratio: 1;
      border-radius: 50%;
      background: var(--type-color);
      color: #fff;
      font-weight: 700;
      font-size: calc(var(--avatar-size, 3.5rem) / 2.6);
    }
  `,
})
export class DevAvatar {
  readonly name = input.required<string>();
  readonly type = input.required<DevType>();

  // Calcule les initiales à partir du nom : coupe sur les espaces et les
  // tirets, garde au plus 2 morceaux, prend la première lettre de chacun.
  // "Pare-Feulin" → ["Pare", "Feulin"] → "P" + "F" → "PF".
  protected readonly initials = computed(() =>
    this.name()
      .split(/[\s-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join(''),
  );
}
