import { createSelector } from 'reselect';
import { AppState, useAppSelector } from '../store/useApp';
import { TokenInfo } from '../services/Api';
import { useMemo, useCallback } from 'react';

export const getTokenInfoSelector = createSelector(
  (state: AppState) => state.tokens,
  tokens => {
    return (filter?: string | ((a: TokenInfo) => boolean)) => {
      if (!filter) return;
      if (typeof filter === 'string') {
        return tokens.find(({ id }) => id === filter);
      } else if (typeof filter === 'function') {
        return tokens.find(filter);
      }
      return;
    };
  },
);

export const useGetTokenInfo = () => useAppSelector(getTokenInfoSelector);

export const useTokenInfo = (filter?: string | ((a: TokenInfo) => boolean)) => {
  const getTokenInfo = useGetTokenInfo();

  return useMemo(() => getTokenInfo(filter), [filter, getTokenInfo]);
};

export const useBaseTokenInfo = () => useTokenInfo(useCallback(tokenInfo => tokenInfo.isBaseToken, []));
