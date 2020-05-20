import { createSelector } from 'reselect';

import { useMarginPoolsSelector, MarginPoolsState } from '../store/useMarginPools';
import { useMemo } from 'react';

export const getMarginPositionSelector = createSelector(
  (state: MarginPoolsState) => state.positionEntities,
  positionEntities => {
    return (positionId?: string): typeof positionEntities.byId['id'] | undefined => {
      if (!positionId) return;
      return positionEntities.byId[positionId];
    };
  },
);

export const useGetMarginPosition = () => useMarginPoolsSelector(getMarginPositionSelector);

export const useMarginPositionInfo = (positionId?: string) => {
  const getMarginPosition = useGetMarginPosition();

  return useMemo(() => {
    return getMarginPosition(positionId);
  }, [getMarginPosition, positionId]);
};
