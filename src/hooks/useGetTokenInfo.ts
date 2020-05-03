import { createSelector } from 'reselect';
import { AppState, useAppSelector } from '../store/useApp';

export const getTokenInfoSelector = createSelector(
  (state: AppState) => state.tokens,
  tokens => {
    return (tokenId?: string) => {
      if (!tokenId) return null;
      return tokens.find(({ id }) => id === tokenId) || null;
    };
  },
);

export default () => useAppSelector(getTokenInfoSelector);
