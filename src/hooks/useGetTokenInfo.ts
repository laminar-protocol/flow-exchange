import { createSelector } from 'reselect';
import { AppState, useAppSelector } from '../store/useApp';
import { TokenInfo } from '../services/Api';

export const getTokenInfoSelector = createSelector(
  (state: AppState) => state.tokens,
  tokens => {
    return (filter?: string | ((a: TokenInfo) => boolean)) => {
      if (!filter) return null;
      if (typeof filter === 'string') {
        return tokens.find(({ id }) => id === filter) || null;
      } else if (typeof filter === 'function') {
        return tokens.find(filter) || null;
      }
      return null;
    };
  },
);

export default () => useAppSelector(getTokenInfoSelector);
