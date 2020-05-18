import { createSelector } from 'reselect';

import { useMarginPoolsSelector, MarginPoolsState } from '../store/useMarginPools';
import { getMarginPoolInfoSelector } from './useGetMarginPoolInfo';
import { useMemo } from 'react';

export const tradingPairIdMapSelector = createSelector(
  (state: MarginPoolsState) => state.poolEntities,
  poolEntities => {
    let allOptions: MarginPoolsState['poolEntities']['byId']['id']['options'][number][] = [];
    for (const poolId of Object.keys(poolEntities.byId)) {
      const poolInfo = poolEntities.byId[poolId];
      allOptions = allOptions.concat(poolInfo.options);
    }

    return allOptions.reduce((result, curr) => {
      result[curr.pairId] = curr.pair;
      return result;
    }, {} as Record<string, typeof allOptions[number]['pair']>);
  },
);

export const getTradingPairSelector = createSelector(getMarginPoolInfoSelector, getMarginPoolInfo => {
  return (poolId: string, pairId: string) => {
    const poolInfo = getMarginPoolInfo(poolId);
    if (!poolInfo) return;
    return poolInfo.options.find(({ pairId: _pairId }) => {
      return _pairId === pairId;
    });
  };
});

export const useGetTradingPair = () => useMarginPoolsSelector(getTradingPairSelector);

export const useTradingPair = (poolId: string, pairId: string) => {
  const getTradingPair = useGetTradingPair();

  return useMemo(() => {
    return getTradingPair(poolId, pairId);
  }, [getTradingPair, poolId, pairId]);
};
