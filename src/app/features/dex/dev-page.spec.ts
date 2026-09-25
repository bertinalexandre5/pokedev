import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { TEST_DEVS } from '../../testing/dev-fixtures';
import { DexPage } from './dev-page';

describe('DexPage', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  async function render(type?: string) {
    const fixture = TestBed.createComponent(DexPage);
    if (type) {
      fixture.componentRef.setInput('type', type);
    }
    TestBed.tick();
    http.expectOne('data/devs.json').flush(TEST_DEVS);
    await TestBed.inject(ApplicationRef).whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  const names = (element: HTMLElement) =>
    Array.from(element.querySelectorAll('app-dev-card h3')).map((h3) => h3.textContent?.trim());

  it('affiche tous les devs', async () => {
    const element = await render();
    expect(names(element)).toEqual(['Stagiairon', 'Juniorax', 'Requêtor']);
    expect(element.textContent).toContain('3 dev(s)');
  });

  it('filtre selon le paramètre de requête type', async () => {
    const element = await render('backend');
    expect(names(element)).toEqual(['Requêtor']);
  });

  it('ignore un type inconnu', async () => {
    const element = await render('cobol');
    expect(names(element)).toHaveLength(3);
  });

  it('filtre selon la recherche après le debounce', async () => {
    const element = await render();
    const input = element.querySelector<HTMLInputElement>('#search')!;
    input.value = 'junior';
    input.dispatchEvent(new Event('input'));

    await new Promise((resolve) => setTimeout(resolve, 250));
    await TestBed.inject(ApplicationRef).whenStable();

    expect(names(element)).toEqual(['Juniorax']);
  });

  it('ajoute un dev à l’équipe depuis sa carte', async () => {
    const element = await render();
    element.querySelector<HTMLButtonElement>('app-dev-card button')!.click();
    await TestBed.inject(ApplicationRef).whenStable();

    expect(element.querySelector('app-dev-card button')?.textContent).toContain('Retirer');
  });
});
