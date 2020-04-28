import { createSelector } from 'reselect';

import { useOracleSelector, OracleState } from '../store/useOracle';
import { TokenId } from '../services';

export const createOracleValueSelector = (tokenId: TokenId) => {
  return createSelector(
    (state: OracleState) => state.data,
    data => {
      if (!tokenId) return null;
      const info = data.find(item => item.tokenId.toLowerCase() === tokenId.toLowerCase());
      return info || null;
    },
  );
};

export default (tokenId: TokenId) => useOracleSelector(createOracleValueSelector(tokenId), [tokenId]);
