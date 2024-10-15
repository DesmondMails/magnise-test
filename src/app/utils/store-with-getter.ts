import { Store } from '@datorama/akita';

export class StoreWithGetter<S> extends Store<S> {
  get<K extends keyof S>(key: K): S[K] | undefined {
    return this.getValue()[key];
  }
}
