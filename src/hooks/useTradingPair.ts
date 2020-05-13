import { createSelector } from 'reselect';

import { useMarginPoolsSelector, MarginPoolsState } from '../store/useMarginPools';

export const findTradingPair = createSelector(
  (poolInfo: MarginPoolsState['poolInfo'], poolId: string, pairId: string) => {
    return {
      poolInfo,
      poolId,
      pairId,
    };
  },
  ({ poolInfo, poolId, pairId }) => {
    return (
      poolInfo?.[poolId]?.options.find(({ pairId: _pairId }) => {
        return _pairId === pairId;
      }) || null
    );
  },
);

export const createTradingPairSelector = (poolId: string, pairId: string) => {
  return createSelector(
    (state: MarginPoolsState) => state.poolInfo,
    poolInfo => {
      return findTradingPair(poolInfo, poolId, pairId);
    },
  );
};

export default (poolId: string, pairId: string) =>
  useMarginPoolsSelector(createTradingPairSelector(poolId, pairId), [poolId, pairId]);
