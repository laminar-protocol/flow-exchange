import { createSelector } from 'reselect';

import { AppState, useAppSelector } from '../hooks/useApp';

const createMarginSymbolListSelector = (key: string) => {
  return createSelector(
    (state: AppState) => state.margin.poolInfo,
    poolInfo => {
      return Object.keys(poolInfo)
        .filter(poolId => {
          if (!key) return true;
          return key === poolId;
        })
        .reduce((result, curr) => {
          for (const pairId of Object.keys(poolInfo[curr].options)) {
            result.push({
              ...poolInfo[curr],
              ...poolInfo[curr].options[pairId],
            });
          }

          return result;
        }, [] as (typeof poolInfo['string'] & typeof poolInfo['string']['options']['string'])[]);
    },
  );
};

export default (key: string) => useAppSelector(createMarginSymbolListSelector(key), [key]);
