import { createSelector } from 'reselect';

import { useCurrentAccount, AccountState } from '../store/useAccount';
import { TokenId } from '../services';

export const createAccountBalanceSelector = (tokenId: TokenId) => {
  return createSelector(
    (state: AccountState) => state.data,
    data => {
      const info = data.find(item => item.tokenId === tokenId);
      return info || null;
    },
  );
};

export default (tokenId: TokenId) => useCurrentAccount(createAccountBalanceSelector(tokenId), [tokenId]);
