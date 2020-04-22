import { createSelector } from 'reselect';

import { useAppSelector, AppState } from '../store/useApp';

export const createTradingPairSelector = (poolId: string, pairId: string) => {
  return createSelector(
    (state: AppState) => state.margin.poolInfo,
    poolInfo => {
      return poolInfo?.[poolId]?.options.find(({ pairId: _pairId }) => _pairId === pairId) || null;
    },
  );
};

export default (poolId: string, pairId: string) =>
  useAppSelector(createTradingPairSelector(poolId, pairId), [poolId, pairId]);
