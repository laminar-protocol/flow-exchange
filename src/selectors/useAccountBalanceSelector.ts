import { createSelector } from 'reselect';

import { useAccountSelector, AccountState } from '../store/useAccount';
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

export default (tokenId: TokenId) => useAccountSelector(createAccountBalanceSelector(tokenId), [tokenId]);
