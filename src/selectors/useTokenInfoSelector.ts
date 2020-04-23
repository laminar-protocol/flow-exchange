import { createSelector } from 'reselect';

import { useAppSelector, AppState } from '../store/useApp';

export const createTokenInfoSelector = (tokenId?: string) => {
  return createSelector(
    (state: AppState) => state.tokens,
    tokens => {
      return tokens.find(({ id }) => id === tokenId) || null;
    },
  );
};

export default (tokenId?: string) => useAppSelector(createTokenInfoSelector(tokenId), [tokenId]);
