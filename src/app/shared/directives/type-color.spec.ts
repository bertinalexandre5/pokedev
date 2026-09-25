import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DevType } from '../../domain/dev.model';
import { TypeColor } from './type-color';

@Component({
  imports: [TypeColor],
  template: `<span [appTypeColor]="type()">badge</span>`,
})
class Host {
  readonly type = signal<DevType>('data');
}

describe('TypeColor', () => {
  it('applique la couleur du type et la met à jour', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const span = (fixture.nativeElement as HTMLElement).querySelector('span')!;

    expect(span.style.getPropertyValue('--type-color')).toBe('#862e9c');
    expect(span.dataset['type']).toBe('data');

    fixture.componentInstance.type.set('devops');
    await fixture.whenStable();
    expect(span.style.getPropertyValue('--type-color')).toBe('#2b8a3e');
  });
});
