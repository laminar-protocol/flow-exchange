import { createSelector } from 'reselect';

import { useAppSelector, AppState } from '../store/useApp';

export const findTradingPair = createSelector(
  (poolInfo: AppState['margin']['poolInfo'], poolId: string, pairId: string) => {
    return {
      poolInfo,
      poolId,
      pairId,
    };
  },
  ({ poolInfo, poolId, pairId }) => {
    return poolInfo?.[poolId]?.options.find(({ pairId: _pairId }) => _pairId === pairId) || null;
  },
);

export const createTradingPairSelector = (poolId: string, pairId: string) => {
  return createSelector(
    (state: AppState) => state.margin.poolInfo,
    poolInfo => {
      return findTradingPair(poolInfo, poolId, pairId);
    },
  );
};

export default (poolId: string, pairId: string) =>
  useAppSelector(createTradingPairSelector(poolId, pairId), [poolId, pairId]);
