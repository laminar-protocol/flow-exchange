import { createEpic } from '_app/helpers/apiLoadableSingle';
import { accountSelector, apiSelector } from '_app/selectors/provider.selector';
import { StateObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import types, { actions } from 'types';

export const changeAccount: Epic = action$ =>
  action$.pipe(
    ofType(types.provider.account.changed),
    map(() => actions.margin.allowance.requested()),
  );

export const allowance = createEpic(
  actions.margin.allowance,
  async (_params, state$: StateObservable<AppState>) => {
    const api = apiSelector(state$.value);
    const account = accountSelector(state$.value);
    return api.getAllowance(account);
  },
  action$ => action$.pipe(ofType(types.provider.network.completed), take(1)),
);

export const toggleEnable = createEpic(
  actions.margin.toggleTrading,
  async (enable, state$: StateObservable<AppState>) => {
    const api = apiSelector(state$.value);
    const account = accountSelector(state$.value);
    return api.toggleEnable(account, enable);
  },
);

export const updateAllowance: Epic = action$ =>
  action$.pipe(
    ofType(types.margin.toggleTrading.completed),
    mergeMap(({ payload }) => of(actions.margin.allowance.cancelled(), actions.margin.allowance.completed(payload))),
  );

export const openPosition = createEpic(
  actions.margin.openPosition,
  async ({ name, amount, pool }, state$: StateObservable<AppState>) => {
    const api = apiSelector(state$.value);
    const account = accountSelector(state$.value);
    return api.openPosition(account, { name, amount, pool });
  },
);

export const closePosition = createEpic(
  actions.margin.closePosition,
  async ({ name, id }, state$: StateObservable<AppState>) => {
    const api = apiSelector(state$.value);
    const account = accountSelector(state$.value);
    return api.closePosition(account, { name, id });
  },
);
