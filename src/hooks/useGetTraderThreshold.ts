import { useMemo } from 'react';
import { createSelector } from 'reselect';
import { MarginPoolsState, useMarginPoolsSelector } from '../store/useMarginPools';

export const getTraderThresholdSelector = createSelector(
  (state: MarginPoolsState) => state.traderThresholdEntities,
  traderThresholdEntities => {
    return (pairId?: string) => {
      if (!pairId) return;
      return traderThresholdEntities.byId[pairId];
    };
  },
);

export const useGetTraderThreshold = () => useMarginPoolsSelector(getTraderThresholdSelector);

export const useTraderThreshold = (pairId?: string) => {
  const getTraderThreshold = useGetTraderThreshold();

  return useMemo(() => {
    return getTraderThreshold(pairId);
  }, [getTraderThreshold, pairId]);
};
