import { createSelector } from 'reselect';

import { useAppSelector, AppState } from '../store/useApp';

export const getSyntheticPoolInfoSelector = createSelector(
  (state: AppState) => state.margin.poolInfo,
  poolInfo => {
    return (poolId: string): typeof poolInfo['string'] | null => {
      return poolInfo[poolId] || null;
    };
  },
);

export default () => useAppSelector(getSyntheticPoolInfoSelector);
