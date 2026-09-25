import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormField,
  form,
  max,
  maxLength,
  min,
  minLength,
  required,
  submit,
  validate,
} from '@angular/forms/signals';
import { DevRepository } from '../../core/data/dev-repository';
import { HasUnsavedChanges } from '../../core/navigation/unsaved-changes-guard';
import { DEV_TYPES, MAX_STAT, MAX_TOTAL, STAT_KEYS } from '../../domain/dev.model';
import { totalStats } from '../../domain/dev-rules';
import { STAT_LABELS } from '../../domain/labels';
import { TypeLabelPipe } from '../../shared/pipes/type-label-pipe';
import { DevDraft, draftToDev, emptyDraft, splitLanguages } from './dev-draft';

@Component({
  selector: 'app-create-dev-page',
  imports: [FormField, TypeLabelPipe],
  templateUrl: './create-dev-page.html',
  styleUrl: './create-dev-page.css',
})
export class CreateDevPage implements HasUnsavedChanges {
  private readonly repository = inject(DevRepository);
  private readonly router = inject(Router);

  protected readonly types = DEV_TYPES;
  protected readonly statKeys = STAT_KEYS;
  protected readonly statLabels = STAT_LABELS;
  protected readonly maxTotal = MAX_TOTAL;

  protected readonly draft = signal<DevDraft>(emptyDraft());
  private readonly saved = signal(false);

  protected readonly devForm = form(this.draft, (path) => {
    required(path.name, { message: 'Le nom est obligatoire.' });
    minLength(path.name, 2, { message: 'Au moins 2 caractères.' });
    maxLength(path.name, 30, { message: 'Au plus 30 caractères.' });
    validate(path.name, ({ value }) => {
      const name = value().trim().toLowerCase();
      return this.repository.devs().some((dev) => dev.name.toLowerCase() === name)
        ? { kind: 'unique', message: 'Ce nom est déjà pris.' }
        : undefined;
    });

    required(path.title, { message: 'Le poste est obligatoire.' });
    maxLength(path.title, 50, { message: 'Au plus 50 caractères.' });

    validate(path.secondaryType, ({ value, valueOf }) =>
      value() !== '' && value() === valueOf(path.primaryType)
        ? { kind: 'duplicate', message: 'Le type secondaire doit différer du type principal.' }
        : undefined,
    );

    for (const key of STAT_KEYS) {
      min(path.stats[key], 0, { message: 'Minimum : 0.' });
      max(path.stats[key], MAX_STAT, { message: `Maximum : ${MAX_STAT}.` });
    }
    validate(path.stats, ({ value }) =>
      totalStats(value()) > MAX_TOTAL
        ? { kind: 'total', message: `Le total ne doit pas dépasser ${MAX_TOTAL}.` }
        : undefined,
    );

    validate(path.languages, ({ value }) =>
      splitLanguages(value()).length === 0
        ? { kind: 'languages', message: 'Indiquez au moins un langage.' }
        : undefined,
    );
    maxLength(path.catchphrase, 120, { message: 'Au plus 120 caractères.' });
  });

  protected readonly total = computed(() => totalStats(this.draft().stats));

  hasUnsavedChanges(): boolean {
    return this.devForm().dirty() && !this.saved();
  }

  protected async save(event: Event): Promise<void> {
    event.preventDefault();
    await submit(this.devForm, async (field) => {
      const id = this.repository.add(draftToDev(field().value()));
      this.saved.set(true);
      await this.router.navigate(['/devs', id]);
      return undefined;
    });
  }
}
