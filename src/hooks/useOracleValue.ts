import { createSelector } from 'reselect';

import { useOracleSelector, OracleState } from '../store/useOracle';
import { TokenId } from '../services';

export const createOracleValueSelector = (tokenId: TokenId) => {
  return createSelector(
    (state: OracleState) => state.data,
    data => {
      if (!tokenId) return null;
      const info = data.find(item => item.tokenId === tokenId);
      return info || null;
    },
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (tokenId: TokenId) => useOracleSelector(createOracleValueSelector(tokenId), [tokenId]);
