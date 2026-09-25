import { Component, input } from '@angular/core';
import { DevType } from '../../domain/dev.model';
import { TypeColor } from '../directives/type-color';
import { TypeLabelPipe } from '../pipes/type-label-pipe';

/**
 * Pastille colorée affichant un type (ex. "Front-end").
 * La couleur vient de la directive TypeColor, appliquée à l'élément
 * hôte via hostDirectives ; le libellé français vient du pipe typeLabel.
 */
@Component({
  selector: 'app-type-badge',
  imports: [TypeLabelPipe], // pipe utilisé dans le template ci-dessous
  hostDirectives: [{ directive: TypeColor, inputs: ['appTypeColor: type'] }],
  template: `{{ type() | typeLabel }}`,
  styles: `
    :host {
      display: inline-block;
      padding: 0.1rem 0.6rem;
      border-radius: 999px;
      /* --type-color est fournie par TypeColor, posée sur ce même hôte. */
      background: var(--type-color);
      color: #fff;
      font-size: 0.8rem;
      font-weight: 600;
    }
  `,
})
export class TypeBadge {
  readonly type = input.required<DevType>();
}
