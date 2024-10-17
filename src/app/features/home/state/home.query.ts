import { Injectable } from '@angular/core';
import { QueryWithGetter } from '@utils/index';
import { HomeState, HomeStore } from './home.store';

@Injectable({
  providedIn: 'root',
})
export class HomeQuery extends QueryWithGetter<HomeState> {
  readonly providers$ = this.select((state) => state.providers);
  readonly instrumentsOptions$ = this.select((state) => state.instrumentsOptions);

  constructor(protected override store: HomeStore) {
    super(store);
  }
}
