import { Component } from '@angular/core';

/**
 * Bloc « état vide » réutilisable : un cadre en pointillés, dont le
 * CONTENU est fourni par le parent (projection de contenu). Ce composant
 * ne sait pas à l'avance ce qu'il va afficher — texte d'erreur, message
 * "aucun résultat", bouton "réessayer"... c'est celui qui l'utilise qui décide.
 * Le slot [actions] reçoit les boutons ou liens, le reste va dans le message.
 */
@Component({
  selector: 'app-empty-state',
  template: `
    <!-- <ng-content /> sans "select" récupère tout ce qui n'a pas
         d'autre destination précise (ici : le texte du message). -->
    <div class="message"><ng-content /></div>
    <!-- select="[actions]" ne récupère QUE ce qui porte l'attribut
         "actions" (ex. <button actions>...). C'est un tri par étiquette. -->
    <div class="actions"><ng-content select="[actions]" /></div>
  `,
  styles: `
    :host {
      display: block;
      padding: 2rem 1rem;
      border: 2px dashed var(--border);
      border-radius: 0.75rem;
      text-align: center;
    }
    /* Masque l'emplacement des actions si rien n'y a été projeté. */
    .actions:empty {
      display: none;
    }
    .actions {
      margin-top: 1rem;
    }
  `,
})
export class EmptyState {}
