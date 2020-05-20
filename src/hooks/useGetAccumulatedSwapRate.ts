import { createSelector } from 'reselect';

import { useMarginPoolsSelector, MarginPoolsState } from '../store/useMarginPools';
import { useMemo } from 'react';

export const getAccumulatedSwapRateSelector = createSelector(
  (state: MarginPoolsState) => state.accumulatedSwapRates,
  accumulatedSwapRates => {
    return (poolId?: string, pairId?: string): typeof accumulatedSwapRates[number] | undefined => {
      if (!poolId || !pairId) return;

      return accumulatedSwapRates.find(item => {
        if (item.pairId === pairId && item.poolId === poolId) {
          return true;
        }
        return false;
      });
    };
  },
);

export const useGetAccumulatedSwapRate = () => useMarginPoolsSelector(getAccumulatedSwapRateSelector);

export const useAccumulatedSwapRateInfo = (poolId?: string, pairId?: string) => {
  const getAccumulatedSwapRate = useGetAccumulatedSwapRate();

  return useMemo(() => {
    return getAccumulatedSwapRate(poolId, pairId);
  }, [getAccumulatedSwapRate, poolId, pairId]);
};
