import { createSelector } from 'reselect';

import { useMarginPoolsSelector, MarginPoolsState } from '../store/useMarginPools';

const createMarginSymbolListSelector = (key: string) => {
  return createSelector(
    (state: MarginPoolsState) => state.poolInfo,
    poolInfo => {
      return Object.keys(poolInfo)
        .filter(poolId => {
          if (!key) return true;
          return key === poolId;
        })
        .reduce((result, curr) => {
          for (const item of poolInfo[curr].options) {
            result.push({
              ...poolInfo[curr],
              ...item,
            });
          }

          return result;
        }, [] as (typeof poolInfo['string'] & typeof poolInfo['string']['options'][number])[]);
    },
  );
};

export default (key: string) => useMarginPoolsSelector(createMarginSymbolListSelector(key), [key]);
