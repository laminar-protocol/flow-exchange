import produce from 'immer';
import { useCallback } from 'react';
import create, {
  StateCreator,
  StateSelector,
  StoreApi,
  UseStore,
  GetState as ZustandGetState,
  SetState as ZustandSetState,
  State as ZustandState,
} from 'zustand';

export type State = ZustandState;
export type GetState<T> = ZustandGetState<T>;
export type SetState<T> = ZustandSetState<T>;

export const immer = <T>(config: StateCreator<T>) => {
  return (set: SetState<T>, get: GetState<T>, api: StoreApi<T>) =>
    config(
      fn =>
        set(
          produce(
            // @ts-ignore
            fn,
          ),
        ),
      get,
      api,
    );
};

interface UseStoreSelector<T> {
  <U>(selector: StateSelector<T, U>, deps?: ReadonlyArray<any>): U;
}

const createState = <T>(config: StateCreator<T>): [UseStore<T>, StoreApi<T>, UseStoreSelector<T>] => {
  const [useStore, storeApi] = create(immer(config));
  const useStoreSelector = <U>(selector: StateSelector<T, U>, deps: ReadonlyArray<any> = []) =>
    useStore(useCallback(selector, deps));

  return [useStore, storeApi, useStoreSelector];
};

export default createState;
