import { createSelector } from 'reselect';

import { useMarginPoolsSelector, MarginPoolsState } from '../store/useMarginPools';
import { useMemo } from 'react';
import { useCurrentAccount } from '../hooks';

export const getTraderInfoSelector = createSelector(
  (state: MarginPoolsState) => state.traderEntities,
  traderEntities => {
    return (address: string, poolId?: string): typeof traderEntities.byId['id'] | undefined => {
      if (!poolId) return;
      const id = `${address}/${poolId}`;
      return traderEntities.byId[id];
    };
  },
);

export const useGetTraderInfo = () => useMarginPoolsSelector(getTraderInfoSelector);

export const useTraderInfo = (poolId?: string) => {
  const getTraderInfo = useGetTraderInfo();
  const { address } = useCurrentAccount();

  return useMemo(() => {
    return getTraderInfo(address, poolId);
  }, [getTraderInfo, address, poolId]);
};
