import { DevType, StatKey } from './dev.model';

export const TYPE_LABELS: Record<DevType, string> = {
  frontend: 'Front-end',
  backend: 'Back-end',
  devops: 'DevOps',
  data: 'Data',
  mobile: 'Mobile',
  securite: 'Sécurité',
};

export const STAT_LABELS: Record<StatKey, string> = {
  code: 'Code',
  debug: 'Debug',
  archi: 'Architecture',
  tests: 'Tests',
  communication: 'Communication',
  cafe: 'Café',
};
