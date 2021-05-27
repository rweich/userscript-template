import createStore from 'localstory';

export default class Storage<T extends Record<string, unknown>> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - currently there is no type to use :(
  private store;

  public constructor(store: globalThis.Storage, namespace: string) {
    this.store = createStore(store, namespace);
  }

  public get(key: string): T[keyof T] {
    return this.store.get(key);
  }

  public set<K extends keyof T>(key: K, value: T[K], ttl?: number): void {
    this.store.set(key, value, { ttl });
  }
}
