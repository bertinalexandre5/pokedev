import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Dev } from '../../domain/dev.model';
import { totalStats } from '../../domain/dev-rules';
import { DexNumberPipe } from '../../shared/pipes/dex-number-pipe';
import { DevAvatar } from '../../shared/ui/dev-avatar';
import { TypeBadge } from '../../shared/ui/type-badge';

// Un composant D'AFFICHAGE (pas une page) : il reçoit tout ce dont il a
// besoin par ses entrées, et ne connaît RIEN de l'équipe ni du réseau.
// C'est ce qui le rend réutilisable et testable tout seul.
@Component({
  selector: 'app-dev-card',
  imports: [RouterLink, DexNumberPipe, DevAvatar, TypeBadge],
  templateUrl: './dev-cards.html',
  styleUrl: './dev-cards.css',
})
export class DevCard {
  readonly dev = input.required<Dev>(); // obligatoire : pas de carte sans dev
  readonly inTeam = input(false); // déjà dans l'équipe ?
  readonly teamFull = input(false); // l'équipe est-elle pleine ?

  // La sortie : la carte ne fait qu'ANNONCER un clic, elle ne décide
  // jamais d'ajouter ou de retirer elle-même (voir dev-page.ts qui
  // écoute cet événement avec (teamToggled)="team.toggle($event)").
  readonly teamToggled = output<number>();

  protected readonly total = computed(() => totalStats(this.dev().stats));
}
