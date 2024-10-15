import { Query } from '@datorama/akita';

export class QueryWithGetter<S> extends Query<S> {
  get<K extends keyof S>(key: K): S[K] | undefined {
    return this.getValue()[key];
  }
}
