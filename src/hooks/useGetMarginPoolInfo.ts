import { createSelector } from 'reselect';

import { useMarginPoolsSelector, MarginPoolsState } from '../store/useMarginPools';
import { useMemo } from 'react';

export const getMarginPoolInfoSelector = createSelector(
  (state: MarginPoolsState) => state.poolEntities,
  poolEntities => {
    return (poolId?: string): typeof poolEntities.byId['id'] | undefined => {
      if (!poolId) return;
      return poolEntities.byId[poolId];
    };
  },
);

export const useGetMarginPoolInfo = () => useMarginPoolsSelector(getMarginPoolInfoSelector);

export const useMarginPoolInfo = (poolId?: string) => {
  const getMarginPoolInfo = useGetMarginPoolInfo();

  return useMemo(() => {
    return getMarginPoolInfo(poolId);
  }, [getMarginPoolInfo, poolId]);
};
