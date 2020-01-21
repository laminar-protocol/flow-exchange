import _ from 'lodash';
import { createSelector } from 'reselect';
import { AppState } from 'reducers';

export const pools = createSelector<AppState, any, any>(
  state => state.liquidityPool.pools,
  pools => {
    if (!pools) return [];
    return Object.values(pools.byId);
  },
);

export const liquidity = (address: string) =>
  createSelector<AppState, any, { loading: boolean; value: string }>(
    state => state.liquidityPool.liquidity,
    liquidity => _.get(liquidity, `states.${address}`),
  );

export const allowedTokens = (address: string) =>
  createSelector<AppState, any, { loading: boolean; value: string[] }>(
    state => state.liquidityPool.allowedTokens,
    allowedTokens => _.get(allowedTokens, `states.${address}`),
  );
