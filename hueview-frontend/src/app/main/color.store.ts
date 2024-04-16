import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface SelectedColorState {
  color: string;
}

@Injectable({
  providedIn: 'root',
})
export class ColorStore extends ComponentStore<SelectedColorState> {
  constructor() {
    super({ color: '' });
  }

  readonly color$ = this.select((state) => state.color);

  readonly setColor = this.updater((state, color: string) => ({
    ...state,
    color: color.replace('#', ''),
  }));
}
