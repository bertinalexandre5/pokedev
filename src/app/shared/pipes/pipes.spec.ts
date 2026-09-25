import { DexNumberPipe } from './dex-number-pipe';
import { TypeLabelPipe } from './type-label-pipe';

describe('DexNumberPipe', () => {
  it('complète le numéro sur trois chiffres', () => {
    expect(new DexNumberPipe().transform(7)).toBe('#007');
  });
});

describe('TypeLabelPipe', () => {
  it('renvoie le libellé français', () => {
    expect(new TypeLabelPipe().transform('securite')).toBe('Sécurité');
  });
});
