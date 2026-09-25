// Les libellés affichés à l'écran (en français), séparés du code technique.
// DevType et StatKey restent des mots-clés internes ('frontend', 'code'...) ;
// ces objets font la traduction vers ce que voit l'utilisateur.
import { DevType, StatKey } from './dev.model';

// Utilisé par TypeLabelPipe : {{ 'securite' | typeLabel }} → "Sécurité".
export const TYPE_LABELS: Record<DevType, string> = {
  frontend: 'Front-end',
  backend: 'Back-end',
  devops: 'DevOps',
  data: 'Data',
  mobile: 'Mobile',
  securite: 'Sécurité',
};

// Utilisé par la fiche d'un dev pour nommer chaque barre de statistique.
export const STAT_LABELS: Record<StatKey, string> = {
  code: 'Code',
  debug: 'Debug',
  archi: 'Architecture',
  tests: 'Tests',
  communication: 'Communication',
  cafe: 'Café',
};
