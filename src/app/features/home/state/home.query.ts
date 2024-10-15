import { Injectable } from '@angular/core';
import { QueryWithGetter } from '../../../utils';
import { HomeState, HomeStore } from './home.store';

@Injectable({
  providedIn: 'root',
})
export class HomeQuery extends QueryWithGetter<HomeState> {
  readonly instruments$ = this.select((state) => state.instruments);

  constructor(protected override store: HomeStore) {
    super(store);
  }
}
