import { createSelector } from 'reselect';

import { useMarginPoolsSelector, MarginPoolsState } from '../store/useMarginPools';

export const getSyntheticPoolInfoSelector = createSelector(
  (state: MarginPoolsState) => state.poolInfo,
  poolInfo => {
    return (poolId: string): typeof poolInfo['string'] | null => {
      return poolInfo[poolId] || null;
    };
  },
);

export default () => useMarginPoolsSelector(getSyntheticPoolInfoSelector);
