import { Injectable } from '@angular/core';
import { InstrumentsList } from '../interfaces';
import { StoreConfig } from '@datorama/akita';
import { StoreWithGetter } from '../../../utils';

export interface HomeState {
  instruments: InstrumentsList[];
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'home-store' })
export class HomeStore extends StoreWithGetter<HomeState> {
  constructor() {
    super({
      instruments: [],
    });
  }
}
