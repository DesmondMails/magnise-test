import { Injectable } from '@angular/core';
import { StoreWithGetter } from '@utils/index';
import { StoreConfig } from '@datorama/akita';
import { InstrumentOptions, Providers, StockData } from '../interfaces';

export interface HomeState {
  instrumentsRawData: StockData[];
  instrumentsOptions: InstrumentOptions[];
  userSubscriptions: Map<string, string>;
  providers: Providers[];
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'home-store' })
export class HomeStore extends StoreWithGetter<HomeState> {
  constructor() {
    super({
      instrumentsRawData: [],
      instrumentsOptions: [],
      userSubscriptions: new Map(),
    });
  }
}
