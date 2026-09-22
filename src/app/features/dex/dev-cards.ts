import { Component, computed, input, output } from '@angular/core';
import { Dev } from '../../domain/dev.model';
import { totalStats } from '../../domain/dev.rules';

@Component({
  selector: 'app-dev-card',
  template: `
    <article class="card" [class.in-team]="inTeam()">
      <p>#{{ dev().id }}</p>
      <h3>{{ dev().name }}</h3>
      <p>{{ dev().title }}</p>
      <p>
        @for (type of dev().types; track type) {
          <span class="type">{{ type }}</span>
        }
      </p>
      <p>Total : {{ total() }}</p>
      <button type="button" (click)="teamToggled.emit(dev().id)">
        {{ inTeam() ? 'Retirer de l’équipe' : 'Ajouter à l’équipe' }}
      </button>
    </article>
  `,
  styles: `
    .card {
      padding: 1rem;
      border: 1px solid var(--border);
      border-radius: 0.75rem;
    }
    .card.in-team {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }
    .type {
      margin-right: 0.25rem;
      padding: 0 0.5rem;
      border: 1px solid var(--border);
      border-radius: 999px;
    }
  `,
})
export class DevCard {
  readonly dev = input.required<Dev>();
  readonly inTeam = input(false);
  readonly teamToggled = output<number>();

  protected readonly total = computed(() => totalStats(this.dev().stats));
}
