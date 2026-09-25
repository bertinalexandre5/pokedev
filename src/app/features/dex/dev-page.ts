import { Component, ElementRef, computed, inject, input, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormField, debounce, form } from '@angular/forms/signals';
import { DevRepository } from '../../core/data/dev-repository';
import { Team } from '../../core/team/team';
import { DEV_TYPES } from '../../domain/dev.model';
import { filterDevs } from '../../domain/dev-rules';
import { isDevType } from '../../core/data/dev-validation';
import { TypeLabelPipe } from '../../shared/pipes/type-label-pipe';
import { TypeColor } from '../../shared/directives/type-color';
import { EmptyState } from '../../shared/ui/empty-state';
import { DevCard } from './dev-cards';

@Component({
  selector: 'app-dex-page',
  imports: [FormField, RouterLink, DevCard, EmptyState, TypeColor, TypeLabelPipe],
  templateUrl: './dex-page.html',
  styleUrl: './dev-page.css',
  host: { '(document:keydown./)': 'focusSearch($event)' },
})
export class DexPage {
  private readonly repository = inject(DevRepository);
  protected readonly team = inject(Team);

  /** Paramètre de requête ?type=… lié automatiquement par le routeur. */
  readonly type = input<string>();

  protected readonly types = DEV_TYPES;
  protected readonly isLoading = this.repository.isLoading;
  protected readonly error = this.repository.error;

  protected readonly search = signal({ query: '' });
  protected readonly searchForm = form(this.search, (path) => {
    debounce(path.query, 200);
  });

  private readonly searchInput = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');

  protected readonly selectedType = computed(() => {
    const type = this.type();
    return isDevType(type) ? type : undefined;
  });

  protected readonly devs = computed(() =>
    filterDevs(this.repository.devs(), {
      query: this.search().query,
      type: this.selectedType(),
    }),
  );

  protected reload(): void {
    this.repository.reload();
  }

  protected focusSearch(event: Event): void {
    const target = event.target as HTMLElement | null;
    if (target?.closest('input, textarea, select')) {
      return;
    }
    event.preventDefault();
    this.searchInput().nativeElement.focus();
  }

  protected resetSearch(): void {
    this.search.set({ query: '' });
  }
}
