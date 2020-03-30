import { createSelector } from 'reselect';

import useApp, { AppState } from '../hooks/useApp';

import { AppEthereumApi, AppLaminarApi } from '../services/Api';

export const apiSelector = createSelector(
  (state: AppState) => state.api,
  api => {
    if (!api) throw new Error('unexpected error');
    if (api.chainType === 'ethereum') {
      return api as AppEthereumApi;
    } else if (api.chainType === 'laminar') {
      return api as AppLaminarApi;
    }
    throw new Error('unexpected chaintype');
  },
);

export default () => useApp(apiSelector);
