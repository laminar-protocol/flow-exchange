import { createSelector } from 'reselect';

export const pools = createSelector<AppState, AppState['liquidityPool']['pools'], Pool[]>(
  state => state.liquidityPool.pools,
  pools => {
    if (!pools) return [];
    return Object.values(pools.byId);
  },
);

export const liquidity = (address: string) =>
  createSelector<AppState, AppState['liquidityPool']['liquidity'], ApiLoadableState<string>>(
    state => state.liquidityPool.liquidity,
    liquidity => liquidity.states[address],
  );

export const allowedTokens = (address: string) =>
  createSelector<AppState, AppState['liquidityPool']['allowedTokens'], ApiLoadableState<string[]>>(
    state => state.liquidityPool.allowedTokens,
    allowedTokens => allowedTokens.states[address],
  );

export const spread = (poolAddr: string, tokenAddr: string) =>
  createSelector<AppState, AppState['liquidityPool']['spread'], ApiLoadableState<{ ask: number; bid: number }>>(
    state => state.liquidityPool.spread,
    spread => spread.states[`${poolAddr},${tokenAddr}`],
  );
