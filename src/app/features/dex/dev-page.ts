import { Component, signal } from '@angular/core';
import { DevCard } from './dev-cards';
import { MOCK_DEVS } from './mock-dev';

@Component({
  selector: 'app-dex-page',
  imports: [DevCard],
  template: `
    <h1>Pokédex</h1>
    <p>{{ devs().length }} dev(s) · {{ teamIds().length }} dans l'équipe</p>
    <ul class="grid">
      @for (dev of devs(); track dev.id) {
        <li>
          <app-dev-card
            [dev]="dev"
            [inTeam]="teamIds().includes(dev.id)"
            (teamToggled)="toggle($event)"
          />
        </li>
      } @empty {
        <li>Aucun dev.</li>
      }
    </ul>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
      gap: 1rem;
      padding: 0;
      list-style: none;
    }
  `,
})
export class DexPage {
  protected readonly devs = signal(MOCK_DEVS);
  protected readonly teamIds = signal<number[]>([]);

  protected toggle(id: number): void {
    this.teamIds.update((ids) =>
      ids.includes(id) ? ids.filter((current) => current !== id) : [...ids, id],
    );
  }
}
