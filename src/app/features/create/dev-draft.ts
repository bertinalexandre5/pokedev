import { Dev, DevStats, DevType } from '../../domain/dev.model';

/** Valeurs saisies dans le formulaire de création. */
export interface DevDraft {
  name: string;
  title: string;
  primaryType: DevType;
  secondaryType: DevType | '';
  stats: DevStats;
  /** Langages séparés par des virgules. */
  languages: string;
  catchphrase: string;
}

export function emptyDraft(): DevDraft {
  return {
    name: '',
    title: '',
    primaryType: 'frontend',
    secondaryType: '',
    stats: { code: 50, debug: 50, archi: 50, tests: 50, communication: 50, cafe: 50 },
    languages: '',
    catchphrase: '',
  };
}

/** « TypeScript, , SQL » → ['TypeScript', 'SQL'] */
export function splitLanguages(text: string): string[] {
  return text
    .split(',')
    .map((language) => language.trim())
    .filter((language) => language !== '');
}

export function draftToDev(draft: DevDraft): Omit<Dev, 'id' | 'custom'> {
  return {
    name: draft.name.trim(),
    title: draft.title.trim(),
    types: draft.secondaryType ? [draft.primaryType, draft.secondaryType] : [draft.primaryType],
    stats: { ...draft.stats },
    languages: splitLanguages(draft.languages),
    catchphrase: draft.catchphrase.trim(),
  };
}
