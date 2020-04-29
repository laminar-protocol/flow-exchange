import { createSelector } from 'reselect';

import { useSyntheticPoolsSelector, SyntheticPoolsState } from '../store/useSyntheticPools';

export const getSyntheticPoolInfoSelector = createSelector(
  (state: SyntheticPoolsState) => state.poolInfo,
  poolInfo => {
    return (poolId: string): typeof poolInfo['string'] | null => {
      return poolInfo[poolId] || null;
    };
  },
);

export default () => useSyntheticPoolsSelector(getSyntheticPoolInfoSelector);
