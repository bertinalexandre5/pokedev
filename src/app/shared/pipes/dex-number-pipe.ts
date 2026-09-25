import { Pipe, PipeTransform } from '@angular/core';
import { formatDexNumber } from '../../domain/dev-rules';

/**
 * Un pipe transforme une valeur POUR L'AFFICHAGE, dans un template :
 * {{ 7 | dexNumber }} → #007
 * Il ne fait que déléguer à formatDexNumber (domain/dev-rules.ts) :
 * la vraie logique reste testable sans Angular.
 */
@Pipe({ name: 'dexNumber' })
export class DexNumberPipe implements PipeTransform {
  transform(id: number): string {
    return formatDexNumber(id);
  }
}
