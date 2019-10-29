import { of, ObservableInput, from, combineLatest } from 'rxjs';
import { map, switchMap, takeUntil, catchError } from 'rxjs/operators';
import { mapObjIndexed } from 'ramda';
import { ofType, Epic } from 'redux-observable';

import { Action, ApiActionTypesRecord } from './typeCreator';
import ReducerBuilder from './reducerBuilder';

// Handles one API resource request
// TODO: support multiple requests for a kind with ID

export interface State<T, P = void, E = any> {
  value?: T;
  loading: boolean;
  params?: P;
  error?: E;
}

export type PartialState<T, P = void, E = any> = Partial<State<T, P, E>>;

export interface ApiLodableAction<T> extends Action<T> {
  error?: boolean;
}

export const initialState = <T, P, E = any>(): State<T, P, E> => ({
  loading: false,
});

export function createReducer<T, P, E = any>(apiAction: ApiActionTypesRecord<Partial<State<T, P, E>>>) {
  return new ReducerBuilder(initialState<T, P, E>())
    .handle(apiAction.requested, (_state, { payload }) => ({
      loading: true,
      params: payload && payload.params,
    }))
    .handle(apiAction.completed, (_state, { payload }) => ({
      loading: false,
      value: payload && payload.value,
      error: undefined,
    }))
    .handle([apiAction.cancelled, apiAction.failed], (_state, { payload }) => ({
      loading: false,
      error: payload && payload.error,
    }))
    .build();
}

export function createEpic<S, T, P, E = any>(
  apiAction: ApiActionTypesRecord<Partial<State<T, P, E>>>,
  run: (params: P | undefined, state: S) => ObservableInput<T>,
  additionalTrigger?: Epic<any, any, S>,
): Epic<any, any, S> {
  const types = mapObjIndexed((x) => x().type, apiAction);
  return (action$, state$, dep) => {
    let from$;
    if (additionalTrigger) {
      const trigger$ = additionalTrigger(action$, state$, dep);
      from$ = combineLatest(trigger$, action$.pipe(ofType(types.requested))).pipe(map(([, act]) => act));
    } else {
      from$ = action$.pipe(ofType(types.requested));
    }
    return from$.pipe(
      ofType(types.requested),
      switchMap(({ payload }) =>
        from(run(payload && payload.params, state$.value)).pipe(
          map((resp) => apiAction.completed({ value: resp })),
          catchError((error: E) => {
            console.error(error); // TODO redux logger middleware for failed actions
            return of(apiAction.failed({ error }));
          }),
          takeUntil(action$.pipe(ofType(types.cancelled))),
        )),
    );
  }
}
