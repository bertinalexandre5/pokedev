// Ce fichier ne contient AUCUN code Angular : que des types et des
// constantes. C'est le "dictionnaire" de l'application : la forme des
// données, utilisée par tout le reste du projet (domain/, core/, features/).

/** Les six types de développeur, équivalents des types élémentaires d'un pokédex. */
export const DEV_TYPES = ['frontend', 'backend', 'devops', 'data', 'mobile', 'securite'] as const;
// (typeof DEV_TYPES)[number] fabrique une union à partir du tableau ci-dessus :
// DevType ne peut valoir que l'une de ces six chaînes, pas n'importe quoi.
export type DevType = (typeof DEV_TYPES)[number];

/** Les six statistiques d'un dev, chacune entre 0 et MAX_STAT. */
export const STAT_KEYS = ['code', 'debug', 'archi', 'tests', 'communication', 'cafe'] as const;
export type StatKey = (typeof STAT_KEYS)[number];
// Record<StatKey, number> = un objet qui a EXACTEMENT ces six clés,
// chacune associée à un nombre. Exemple : { code: 35, debug: 20, ... }.
export type DevStats = Record<StatKey, number>;

export const MAX_STAT = 100;
export const MAX_TOTAL = 420;
export const MAX_TEAM_SIZE = 6;

// La forme d'un dev : ce que chaque carte, fiche, etc. attend de recevoir.
export interface Dev {
  readonly id: number;
  readonly name: string;
  readonly title: string;
  /** Un ou deux types, le premier est le type principal. */
  readonly types: readonly DevType[];
  readonly stats: DevStats;
  readonly languages: readonly string[];
  readonly catchphrase: string;
  /** Numéro du dev vers lequel celui-ci évolue. */
  readonly evolvesTo?: number;
  /** Vrai pour un dev créé par l'utilisateur. */
  readonly custom?: boolean;
}

// La forme d'un filtre de recherche : utilisé par filterDevs (dev-rules.ts).
export interface DevFilter {
  readonly query: string;
  readonly type?: DevType;
}
