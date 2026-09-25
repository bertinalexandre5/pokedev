import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TEST_DEVS } from '../../testing/dev-fixtures';
import { Team } from './team';

describe('Team', () => {
  let team: Team;

  async function setup(): Promise<void> {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    team = TestBed.inject(Team);
    TestBed.tick();
    TestBed.inject(HttpTestingController).expectOne('data/devs.json').flush(TEST_DEVS);
    await TestBed.inject(ApplicationRef).whenStable();
  }

  beforeEach(() => localStorage.clear());

  it('ajoute puis retire un dev', async () => {
    await setup();
    team.toggle(1);
    expect(team.has(1)).toBe(true);
    expect(team.members().map((dev) => dev.name)).toEqual(['Stagiairon']);

    team.toggle(1);
    expect(team.size()).toBe(0);
  });

  it('refuse un septième membre', async () => {
    await setup();
    for (const id of [1, 2, 3, 4, 5, 6]) {
      team.toggle(id);
    }
    expect(team.isFull()).toBe(true);
    expect(team.toggle(7)).toBe(false);
    expect(team.size()).toBe(6);
  });

  it('calcule la couverture des types', async () => {
    await setup();
    team.toggle(1);
    team.toggle(11);
    expect(team.coverage()).toEqual(['frontend', 'backend', 'data']);
  });

  it("relit l'équipe sauvegardée", async () => {
    localStorage.setItem('pokedev.team.v1', JSON.stringify([2, 11]));
    await setup();
    expect(team.members().map((dev) => dev.id)).toEqual([2, 11]);
  });

  it('ignore un contenu de stockage corrompu', async () => {
    localStorage.setItem('pokedev.team.v1', '{pas du json');
    await setup();
    expect(team.size()).toBe(0);
  });
});
