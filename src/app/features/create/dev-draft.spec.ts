import { draftToDev, emptyDraft, splitLanguages } from './dev-draft';

describe('splitLanguages', () => {
  it('découpe, nettoie et ignore les éléments vides', () => {
    expect(splitLanguages(' TypeScript, , SQL ')).toEqual(['TypeScript', 'SQL']);
  });
});

describe('draftToDev', () => {
  it("n'ajoute pas de type secondaire vide", () => {
    const dev = draftToDev({ ...emptyDraft(), name: ' Testeuse ', primaryType: 'data' });
    expect(dev.name).toBe('Testeuse');
    expect(dev.types).toEqual(['data']);
  });

  it('conserve le type secondaire', () => {
    const dev = draftToDev({ ...emptyDraft(), primaryType: 'data', secondaryType: 'backend' });
    expect(dev.types).toEqual(['data', 'backend']);
  });
});
