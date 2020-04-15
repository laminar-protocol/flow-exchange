import { createSelector } from 'reselect';

import { useAppSelector, AppState } from '../hooks/useApp';

export const accountSelector = createSelector(
  (state: AppState) => state.currentAccount,
  account => {
    if (!account) throw new Error('unexpected error');
    return account;
  },
);

export default () => useAppSelector(accountSelector);
