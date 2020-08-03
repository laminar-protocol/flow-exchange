import { createSelector } from 'reselect';

import { useAppSelector, AppState } from '../store/useApp';

export const currentAccountSelector = createSelector(
  (state: AppState) => state.currentAccount,
  account => {
    if (!account) throw new Error('unexpected error');
    const devAccount = sessionStorage.getItem('DEV_ACCOUNT');
    if (devAccount) {
      return {
        address: devAccount,
      };
    } else {
      return account;
    }
  },
);

export default () => useAppSelector(currentAccountSelector);
