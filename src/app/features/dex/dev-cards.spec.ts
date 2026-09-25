import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TEST_DEVS } from '../../testing/dev-fixtures';
import { DevCard } from './dev-cards';

describe('DevCard', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  async function render(inTeam = false, teamFull = false) {
    const fixture = TestBed.createComponent(DevCard);
    fixture.componentRef.setInput('dev', TEST_DEVS[2]);
    fixture.componentRef.setInput('inTeam', inTeam);
    fixture.componentRef.setInput('teamFull', teamFull);
    await fixture.whenStable();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  }

  it('affiche le numéro, le nom, les types et le total', async () => {
    const { element } = await render();
    const text = element.textContent ?? '';

    expect(text).toContain('#011');
    expect(text).toContain('Requêtor');
    expect(text).toContain('Data');
    expect(text).toContain('Back-end');
    expect(text).toContain('Total : 335');
    expect(element.querySelector('a')?.getAttribute('href')).toBe('/devs/11');
  });

  it('émet le numéro du dev au clic', async () => {
    const { fixture, element } = await render();
    const emitted: number[] = [];
    fixture.componentInstance.teamToggled.subscribe((id) => emitted.push(id));

    element.querySelector('button')!.click();

    expect(emitted).toEqual([11]);
  });

  it("désactive l'ajout quand l'équipe est pleine", async () => {
    const { element } = await render(false, true);
    expect(element.querySelector('button')!.disabled).toBe(true);
  });

  it("permet de retirer un membre même si l'équipe est pleine", async () => {
    const { element } = await render(true, true);
    const button = element.querySelector('button')!;
    expect(button.disabled).toBe(false);
    expect(button.textContent).toContain('Retirer');
  });
});
