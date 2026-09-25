import { Service, computed, inject } from '@angular/core';
import { MAX_TEAM_SIZE } from '../../domain/dev.model';
import { averageStats, teamCoverage } from '../../domain/dev-rules';
import { DevRepository } from '../data/dev-repository';
import { persistedSignal } from '../storage/persisted-signal';

const TEAM_KEY = 'pokedev.team.v1';

function isIdList(value: unknown): value is number[] {
  return Array.isArray(value) && value.every((id) => Number.isInteger(id));
}

/** L'équipe de l'utilisateur : au plus six devs, conservée dans le navigateur. */
@Service()
export class Team {
  private readonly repository = inject(DevRepository);
  private readonly ids = persistedSignal<number[]>(TEAM_KEY, [], isIdList);

  readonly members = computed(() =>
    this.ids()
      .map((id) => this.repository.byId(id))
      .filter((dev) => dev !== undefined),
  );
  readonly size = computed(() => this.ids().length);
  readonly isFull = computed(() => this.size() >= MAX_TEAM_SIZE);
  readonly coverage = computed(() => teamCoverage(this.members()));
  readonly average = computed(() => averageStats(this.members()));

  has(id: number): boolean {
    return this.ids().includes(id);
  }

  /** Ajoute ou retire un dev. Renvoie false si l'équipe est pleine. */
  toggle(id: number): boolean {
    if (this.has(id)) {
      this.ids.update((ids) => ids.filter((current) => current !== id));
      return true;
    }
    if (this.isFull()) {
      return false;
    }
    this.ids.update((ids) => [...ids, id]);
    return true;
  }

  clear(): void {
    this.ids.set([]);
  }
}
