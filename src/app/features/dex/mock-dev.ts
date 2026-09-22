import { Dev } from '../../domain/dev.model';

/** Données fictives, en attendant le chargement HTTP. */
export const MOCK_DEVS: Dev[] = [
  {
    id: 1,
    name: 'Stagiairon',
    title: 'Stagiaire front-end',
    types: ['frontend'],
    stats: { code: 35, debug: 20, archi: 10, tests: 15, communication: 40, cafe: 60 },
    languages: ['HTML', 'CSS'],
    catchphrase: 'Ça marche sur ma machine.',
    evolvesTo: 2,
  },
  {
    id: 8,
    name: 'Kubernaute',
    title: 'Ingénieur DevOps',
    types: ['devops'],
    stats: { code: 55, debug: 60, archi: 50, tests: 40, communication: 40, cafe: 65 },
    languages: ['YAML', 'Go', 'Bash'],
    catchphrase: 'Redémarre le pod.',
  },
  {
    id: 11,
    name: 'Requêtor',
    title: 'Ingénieur data',
    types: ['data', 'backend'],
    stats: { code: 65, debug: 60, archi: 60, tests: 50, communication: 45, cafe: 55 },
    languages: ['SQL', 'Python', 'Scala'],
    catchphrase: 'Ajoute un index.',
  },
];
