import produce from 'immer';
import create, {
  StateCreator,
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

const createState = <T>(config: StateCreator<T>): [UseStore<T>, StoreApi<T>] => {
  return create(immer(config));
};

export default createState;
