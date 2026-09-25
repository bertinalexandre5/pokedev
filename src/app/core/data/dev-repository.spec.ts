import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TEST_DEVS } from '../../testing/dev-fixtures';
import { DevRepository } from './dev-repository';

describe('DevRepository', () => {
  let http: HttpTestingController;
  let repository: DevRepository;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpTestingController);
    repository = TestBed.inject(DevRepository);
    // Exécute les effets : la ressource envoie alors sa requête.
    TestBed.tick();
  });

  afterEach(() => http.verify());

  it('charge les devs depuis le fichier JSON', async () => {
    http.expectOne('data/devs.json').flush(TEST_DEVS);
    await TestBed.inject(ApplicationRef).whenStable();

    expect(repository.devs()).toHaveLength(3);
    expect(repository.byId(11)?.name).toBe('Requêtor');
  });

  it('passe en erreur si la réponse est invalide', async () => {
    http.expectOne('data/devs.json').flush([{ id: 'x' }]);
    await TestBed.inject(ApplicationRef).whenStable();

    expect(repository.error()).toBeTruthy();
    expect(repository.devs()).toEqual([]);
  });

  it('ajoute un dev personnalisé avec le numéro suivant et le sauvegarde', async () => {
    http.expectOne('data/devs.json').flush(TEST_DEVS);
    await TestBed.inject(ApplicationRef).whenStable();

    const id = repository.add({
      name: 'Testeuse',
      title: 'QA',
      types: ['backend'],
      stats: TEST_DEVS[0].stats,
      languages: ['Java'],
      catchphrase: 'Et si le champ est vide ?',
    });
    TestBed.tick();

    expect(id).toBe(12);
    expect(repository.byId(12)?.custom).toBe(true);
    expect(localStorage.getItem('pokedev.custom-devs.v1')).toContain('Testeuse');
  });
});
