import { equals, mapObjIndexed } from 'ramda';
import { Epic, StateObservable, ofType } from 'redux-observable';
import { ObservableInput, combineLatest, from, of } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';

import ReducerBuilder from './reducerBuilder';

export const initialState = <T, P, E = any>(): ApiLoadableState<T, P, E> => ({
  loading: false,
});

export function createReducer<T, P, E = any>(apiAction: ApiActionTypesRecord<Partial<ApiLoadableState<T, P, E>>>) {
  return new ReducerBuilder(initialState<T, P, E>())
    .handle(apiAction.requested, (state, { payload }) => ({
      loading: true,
      params: payload?.params,
      value: equals(payload?.params, state.params) ? state.value : undefined,
    }))
    .handle(apiAction.completed, (_state, { payload }) => ({
      loading: false,
      value: payload?.value,
      error: undefined,
    }))
    .handle([apiAction.cancelled, apiAction.failed], (_state, { payload }) => ({
      loading: false,
      error: payload?.error,
    }))
    .build();
}

export function createEpic<S, T, P, E = any>(
  apiAction: ApiActionTypesRecord<Partial<ApiLoadableState<T, P, E>>>,
  run: (params: P, state: StateObservable<S>) => ObservableInput<T>,
  additionalTrigger?: Epic<any, any, S>,
): Epic<any, any, S> {
  const types = mapObjIndexed(x => x().type, apiAction);
  return (action$, state$, dep) => {
    let from$;
    if (additionalTrigger) {
      const trigger$ = additionalTrigger(action$, state$, dep);
      from$ = combineLatest(trigger$, action$.pipe(ofType(types.requested))).pipe(map(([, act]) => act));
    } else {
      from$ = action$.pipe(ofType(types.requested));
    }

    // eslint-disable-next-line no-unexpected-multiline
    return from$.pipe(
      ofType(types.requested),
      switchMap(({ payload }) =>
        from(run(payload?.params, state$)).pipe(
          map(resp => apiAction.completed({ value: resp })),
          catchError((error: E) => of(apiAction.failed({ error }))),
          takeUntil(action$.pipe(ofType(types.cancelled))),
        ),
      ),
    );
  };
}
