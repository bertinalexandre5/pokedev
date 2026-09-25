import { Component, computed, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Team } from '../../core/team/team';
import { DEV_TYPES, MAX_TEAM_SIZE, MAX_TOTAL, STAT_KEYS } from '../../domain/dev.model';
import { totalStats } from '../../domain/dev-rules';
import { STAT_LABELS } from '../../domain/labels';
import { DexNumberPipe } from '../../shared/pipes/dex-number-pipe';
import { TypeLabelPipe } from '../../shared/pipes/type-label-pipe';
import { DevAvatar } from '../../shared/ui/dev-avatar';
import { EmptyState } from '../../shared/ui/empty-state';
import { StatBar } from '../../shared/ui/stat-bar';

@Component({
  selector: 'app-team-page',
  imports: [DecimalPipe, RouterLink, DexNumberPipe, TypeLabelPipe, DevAvatar, EmptyState, StatBar],
  templateUrl: './team-page.html',
  styleUrl: './team-page.css',
})
export class TeamPage {
  protected readonly team = inject(Team);

  protected readonly maxSize = MAX_TEAM_SIZE;
  protected readonly statKeys = STAT_KEYS;
  protected readonly statLabels = STAT_LABELS;
  protected readonly maxTotal = MAX_TOTAL;

  protected readonly missingTypes = computed(() =>
    DEV_TYPES.filter((type) => !this.team.coverage().includes(type)),
  );
  protected readonly averageTotal = computed(() => {
    const average = this.team.average();
    return average ? totalStats(average) : 0;
  });
}
