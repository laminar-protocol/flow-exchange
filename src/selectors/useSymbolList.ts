import { createSelector } from 'reselect';

import { AppState, useAppSelector } from '../store/useApp';

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

export default (key: string) => useAppSelector(createMarginSymbolListSelector(key), [key]);
