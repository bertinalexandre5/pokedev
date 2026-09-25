import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmptyState } from '../../shared/ui/empty-state';

// Affichée pour toute URL inconnue (route '**' dans app.routes.ts),
// et par la garde devIdGuard quand /devs/:id reçoit un id invalide.
@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, EmptyState],
  template: `
    <h1>Page introuvable</h1>
    <app-empty-state>
      <p>Ce dev s'est échappé dans la nature.</p>
      <a actions routerLink="/devs">Retour au pokédex</a>
    </app-empty-state>
  `,
})
export class NotFoundPage {}
