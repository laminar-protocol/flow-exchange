import { createSelector } from 'reselect';

import { useAppSelector, AppState } from '../store/useApp';

export const currentAccountSelector = createSelector(
  (state: AppState) => state.currentAccount,
  account => {
    if (!account) throw new Error('unexpected error');
    return account;
  },
);

export default () => useAppSelector(currentAccountSelector);
