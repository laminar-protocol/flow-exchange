import { Action as ReduxAction, Reducer } from 'redux';
import { ApiActionTypesRecord } from 'helpers/typeCreator';

export interface State<T, P = any, E = any> {
  value?: T;
  loading: boolean;
  lastPayload?: P;
  error?: E;
}

export interface Action<T> extends ReduxAction<string> {
  payload?: T;
  error?: boolean;
}

export const initialState: State<any, any, any> = {
  loading: false,
};

export function createReducer<T, P = any, E = any>(apiAction: ApiActionTypesRecord): Reducer<State<T, P, E>, Action<P | T | E>> {
  return (state = initialState, { type, payload }: Action<P | T | E>) => {
    switch (type) {
      case apiAction.requested:
        return {
          ...state,
          loading: true,
          lastPayload: payload as P,
          error: undefined,
        };
      case apiAction.cancelled:
        return {
          ...state,
          loading: false,
          error: payload as E,
        };
      case apiAction.completed:
        return {
          ...state,
          loading: false,
          value: payload as T,
          error: undefined,
        };
      case apiAction.failed:
        return {
          ...state,
          loading: false,
          error: payload as E,
        };
      default:
        return state;
    }
  };
}
