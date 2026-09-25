import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Loading } from './core/http/loading';
import { Team } from './core/team/team';

// Le composant RACINE de l'application : c'est lui qui remplace <app-root>
// dans src/index.html. Son template (app.html) contient l'en-tête, la
// navigation, et <router-outlet /> : l'emplacement où s'affiche la page
// active selon l'URL (Pokédex, fiche d'un dev, page 404...).
@Component({
  selector: 'app-root',
  // Les directives utilisées dans app.html : routerLink (les liens),
  // routerLinkActive (surligne le lien de la page courante), router-outlet.
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // inject() demande à Angular l'instance déjà existante de ces services
  // (un seul exemplaire, partagé par toute l'application, voir @Service()
  // dans loading.ts et team.ts). On ne les crée jamais avec "new".
  protected readonly loading = inject(Loading);
  protected readonly team = inject(Team);
}
