import { createEpic } from 'helpers/apiLoadable';
import { StateObservable } from 'redux-observable';
import { actions } from 'types';

import { apiSelector } from '../selectors/provider.selector';

export const spread: Epic = createEpic(
  actions.liquidityPool.spread,
  async ([poolAddr, tokenAddr], params, state$: StateObservable<AppState>) => {
    const api = apiSelector(state$.value);
    return api.getSpread(poolAddr, tokenAddr);
  },
);

export const liquidity: Epic = createEpic(
  actions.liquidityPool.liquidity,
  async (poolAddr, params, state$: StateObservable<AppState>) => {
    const api = apiSelector(state$.value);
    return api.getLiquidity(poolAddr);
  },
);

export const allowedTokens: Epic = createEpic(
  actions.liquidityPool.allowedTokens,
  async (poolAddr, params, state$: StateObservable<AppState>) => {
    const api = apiSelector(state$.value);
    return api.getAllowedTokens(poolAddr);
  },
);
