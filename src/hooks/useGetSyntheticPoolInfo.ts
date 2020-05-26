import { createSelector } from 'reselect';

import { useSyntheticPoolsSelector, SyntheticPoolsState } from '../store/useSyntheticPools';
import { useMemo } from 'react';

export const getSyntheticPoolInfoSelector = createSelector(
  (state: SyntheticPoolsState) => state.poolEntities,
  poolEntities => {
    return (poolId?: string): typeof poolEntities.byId['id'] | undefined => {
      if (!poolId) return;
      return poolEntities.byId[poolId];
    };
  },
);

export const useGetSyntheticPoolInfo = () => useSyntheticPoolsSelector(getSyntheticPoolInfoSelector);

export const useSyntheticPoolInfo = (poolId?: string) => {
  const getSyntheticPoolInfo = useGetSyntheticPoolInfo();

  return useMemo(() => {
    return getSyntheticPoolInfo(poolId);
  }, [getSyntheticPoolInfo, poolId]);
};
