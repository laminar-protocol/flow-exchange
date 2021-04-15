import { createSelector } from 'reselect';

import { useMarginPoolsSelector, MarginPoolsState } from '../store/useMarginPools';
import { getMarginPoolInfoSelector } from './useGetMarginPoolInfo';

const createMarginSymbolListSelector = (key: string) => {
  return createSelector(
    (state: MarginPoolsState) => state.poolEntities,
    getMarginPoolInfoSelector,
    (poolEntities, getMarginPoolInfo) => {
      return poolEntities.allIds
        .filter(poolId => {
          if (!key) return true;
          return key === poolId;
        })
        .reduce((result, poolId) => {
          const poolInfo = getMarginPoolInfo(poolId);

          if (!poolInfo) return result;

          for (const item of poolInfo.options) {
            if (item.enabledTrades.length) {
              result.push({
                ...poolInfo,
                ...item,
              });
            }
          }

          return result;
        }, [] as (typeof poolEntities.byId['id'] & typeof poolEntities.byId['id']['options'][number])[]);
    },
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (key: string) => useMarginPoolsSelector(createMarginSymbolListSelector(key), [key]);
